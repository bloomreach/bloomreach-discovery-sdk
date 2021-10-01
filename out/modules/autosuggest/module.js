"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutosuggestModule = void 0;
const logger_1 = require("../../utils/logger");
const ejs_1 = __importDefault(require("ejs"));
const core_1 = require("../core");
const autosuggest_1 = require("../../config/autosuggest");
const dom_1 = require("../../utils/dom");
const DEFAULT_CURRENCY = '$';
const MINIMUM_QUERY_LENGTH = 2;
class AutosuggestModule {
    constructor(options) {
        this.cachedResponse = null;
        const logger = logger_1.Logger.buildConsoleLogger();
        this.data = Object.assign({ logger }, options);
        this.checkRequirements();
    }
    checkRequirements() {
        if (!this.data.typedQueryTemplate) {
            throw new Error('You must provide typed query template string for Autosuggest module');
        }
        if (!this.data.template) {
            throw new Error('You must provide template string for Autosuggest module');
        }
        if (!this.data.searchResultsContainerElement) {
            throw new Error('You must provide search results container element for Autosuggest module');
        }
        if (!this.data.searchInputElement) {
            throw new Error('You must provide search input element for Autosuggest module');
        }
    }
    static injectResultsContainerStylesFor(searchInputElement) {
        const searchResultsContainerStyles = document.createElement('style');
        searchResultsContainerStyles.innerHTML = `.blm-autosuggest-search-results {
      width: 100%;
      position: absolute;
      z-index: 100;
      left: 0;
      transform: translateY(${searchInputElement.offsetHeight}px);
    }`;
        document.head.appendChild(searchResultsContainerStyles);
    }
    static injectResultsContainerFor(searchInputElement) {
        var _a;
        const searchResultsContainerElement = document.createElement('div');
        searchResultsContainerElement.classList.add('blm-autosuggest-search-results');
        (_a = searchInputElement.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(searchResultsContainerElement);
        return searchResultsContainerElement;
    }
    static load() {
        const config = autosuggest_1.AutosuggestConfig.build({ q: '' });
        if (!config.get('isEnabled')) {
            return null;
        }
        const searchInputElement = document.querySelectorAll(config.get('selector'))[0];
        AutosuggestModule.injectResultsContainerStylesFor(searchInputElement);
        const searchResultsContainerElement = AutosuggestModule.injectResultsContainerFor(searchInputElement);
        return new AutosuggestModule({
            searchInputElement,
            searchResultsContainerElement,
            template: config.get('template') || AutosuggestModule.template,
            typedQueryTemplate: /*html*/ `<span class="blm-autosuggest__suggestion-term-link--typed-query"><%= query %></span>`
        }).init();
    }
    init() {
        this.data.searchInputElement.addEventListener('keyup', (event) => {
            const query = event.target.value;
            if (query.length >= MINIMUM_QUERY_LENGTH) {
                this.data.searchInputElement.dataset['originalQuery'] = query;
                this.suggest(query);
            }
            else {
                this.data.searchResultsContainerElement.innerHTML = '';
                this.data.searchInputElement.dataset['originalQuery'] = '';
                this.cachedResponse = null;
            }
        });
        let mouseDownEventHappenedInsideSearchResultsContainer = false;
        this.data.searchInputElement.addEventListener('blur', () => {
            if (mouseDownEventHappenedInsideSearchResultsContainer) {
                mouseDownEventHappenedInsideSearchResultsContainer = false;
                return false;
            }
            this.data.searchResultsContainerElement.innerHTML = '';
        });
        document.body.addEventListener('mousedown', (event) => {
            const clickHappenedOnInputOrResultsPanel = dom_1.DomUtils.findUpElementWithClassName(event.target, 'blm-autosuggest');
            if (clickHappenedOnInputOrResultsPanel) {
                mouseDownEventHappenedInsideSearchResultsContainer = true;
            }
            else {
                this.data.searchResultsContainerElement.innerHTML = '';
            }
        });
        this.data.searchInputElement.addEventListener('focus', () => {
            if (this.cachedResponse) {
                this.data.searchResultsContainerElement.innerHTML = ejs_1.default.render(this.data.template, this.cachedResponse);
            }
        });
        this.data.searchInputElement.setAttribute('autocomplete', 'off');
        const formElement = dom_1.DomUtils.findUpElementByTagName(this.data.searchInputElement, 'form');
        formElement.addEventListener('submit', () => {
            const searchData = {
                q: this.data.searchInputElement.value,
                catalogs: [{ name: 'example_en' }]
            };
            window.BrTrk.getTracker().logEvent('suggest', 'submit', searchData, {}, true);
        });
        return this;
    }
    suggest(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParameters = { q: query };
            for (const [key, value] of new URLSearchParams(window.location.search).entries()) {
                if (!Object.keys(allParameters).includes(key)) {
                    allParameters[key] = value;
                }
            }
            const results = yield core_1.ApiCore.getAutosuggestData(allParameters);
            const processedResults = this.processResults(results);
            processedResults.defaultCurrency =
                window.bloomreachDefaultCurrency || DEFAULT_CURRENCY;
            this.cachedResponse = processedResults;
            this.data.searchResultsContainerElement.innerHTML = ejs_1.default.render(this.data.template, processedResults);
            this.data.searchResultsContainerElement
                .querySelectorAll('.blm-autosuggest__suggestion-term-link--category')
                .forEach((categoryLinkElement) => {
                categoryLinkElement.addEventListener('click', (event) => {
                    event.preventDefault();
                    const clickedElement = event.target;
                    const categoryId = clickedElement.dataset['categoryId'];
                    if (window.BloomreachModules && window.BloomreachModules.category) {
                        window.BloomreachModules.category.load(categoryId);
                        this.data.searchInputElement.value = clickedElement.textContent;
                        this.data.searchResultsContainerElement.innerHTML = '';
                        this.cachedResponse = null;
                    }
                });
            });
            this.data.searchResultsContainerElement
                .querySelectorAll('.blm-autosuggest__suggestion-term-link')
                .forEach((suggestionTermNode) => {
                suggestionTermNode.addEventListener('click', () => {
                    const { suggestionText } = suggestionTermNode.dataset;
                    const { originalQuery } = this.data.searchInputElement.dataset;
                    const suggestionData = {
                        aq: originalQuery,
                        q: suggestionText,
                        catalogs: [{ name: 'example_en' }]
                    };
                    window.BrTrk.getTracker().logEvent('suggest', 'click', suggestionData, {}, true);
                });
            });
        });
    }
    processResults(results) {
        const processedResults = Object.assign({}, results);
        results.terms.forEach((term, index) => {
            const typedQueryHtml = ejs_1.default
                .render(this.data.typedQueryTemplate, {
                query: results.originalQuery
            })
                .trim();
            processedResults.terms[index].processedText = term.text.replace(results.originalQuery, typedQueryHtml);
        });
        return processedResults;
    }
}
exports.AutosuggestModule = AutosuggestModule;
AutosuggestModule.template = `
    <% if (terms.length || productSuggestions.length) { %>
    <div class="blm-autosuggest">
      <div class="blm-autosuggest__suggestion-terms-container">
        <ul class="blm-autosuggest__suggestion-terms">
          <% terms.forEach(function(term) { %>
            <li class="blm-autosuggest__suggestion-term">
              <a href="<%- term.link %>" class="blm-autosuggest__suggestion-term-link" data-suggestion-text="<%- term.text %>"
                ><%- term.processedText %></a
              >
              <% if (term.categories) { %>
                <ul class="blm-autosuggest__category-results">
                  <% term.categories.forEach(function(category) { %>
                  <li class="blm-autosuggest__suggestion-term">
                    <a href="#"
                       data-category-id="<%- category.value %>"
                       data-suggestion-text="<%- category.name %>"
                       class="blm-autosuggest__suggestion-term-link blm-autosuggest__suggestion-term-link--category"
                      ><%- category.name %></a
                    >
                  </li>
                  <% }); %>
                </ul>
              <% } %>
            </li>
          <% }); %>
        </ul>
      </div>

      <div class="blm-autosuggest__results-container">
        <div class="blm-autosuggest__results">
          <% productSuggestions.forEach(function(suggestion) { %>
            <div class="blm-autosuggest__result">
              <div class="blm-autosuggest-result-image">
                <a
                  title="<%= suggestion.title %>"
                  aria-hidden="true"
                  tabindex="-1"
                  href="<%= suggestion.link %>"
                  class="blm-autosuggest-result-image__link"
                  ><img
                    class="blm-autosuggest-result-image__image"
                    src="<%= suggestion.image %>"
                /></a>
              </div>
              <div class="blm-autosuggest-result-details">
                <a class="blm-autosuggest-result-details__title" href="<%= suggestion.link %>"
                  ><%= suggestion.title %></a
                >
                <div class="blm-autosuggest-result-details__price blm-autosuggest-result-details__price--final">
                  <% if (config.get('formatMoney')) { %>
                    <%= config.get('formatMoney')(suggestion.final_price.toFixed(2) * 100) %>
                  <% } else { %>
                    <%= defaultCurrency %><%= suggestion.final_price.toFixed(2) %>
                  <% } %>
                  <% if (suggestion.original_price) { %>
                    <span
                    class="blm-autosuggest-result-details__price blm-autosuggest-result-details__price--original"
                    >
                     <% if (config.get('formatMoney')) { %>
                       <%= config.get('formatMoney')(suggestion.original_price.toFixed(2) * 100) %>
                     <% } else { %>
                       <%= defaultCurrency %><%= suggestion.original_price.toFixed(2) %>
                     <% } %>
                    </span
                  >
                  <% } %>
                </div>
              </div>
            </div>
          <% }); %>
        </div>
      </div>

    </div>
    <% } %>
  `;
