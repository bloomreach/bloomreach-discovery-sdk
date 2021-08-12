import {Logger} from '../../utils/logger'
import ejs from 'ejs'
import {ApiCore} from '../core'
import {
  AutosuggestData,
  Term
} from '../../utils/object-mappers/autosuggest/interfaces/autosuggest-data'
import {AutosuggestConfig} from '../../config/autosuggest'
import {DomUtils} from '../../utils/dom'
import {AutosuggestConfigParameters} from '../../config/interfaces'

const DEFAULT_CURRENCY = '$'

declare const window: any

type SearchPixelData = {
  q: string
  catalogs: Array<{name: string}>
}

type SuggestionPixelData = {
  q: string
  aq: string
  catalogs: Array<{name: string}>
}

export interface AutosuggestDependencies {
  typedQueryTemplate: string
  template: string
  searchInputElement: HTMLInputElement
  searchResultsContainerElement: HTMLElement
  logger?: Logger
}

const MINIMUM_QUERY_LENGTH = 2

export class AutosuggestModule {
  private data: AutosuggestDependencies
  private cachedResponse: AutosuggestData | null = null

  constructor(options: AutosuggestDependencies) {
    const logger = Logger.buildConsoleLogger()

    this.data = {
      logger,
      ...options
    }

    this.checkRequirements()
  }

  private checkRequirements(): void {
    if (!this.data.typedQueryTemplate) {
      throw new Error(
        'You must provide typed query template string for Autosuggest module'
      )
    }
    if (!this.data.template) {
      throw new Error('You must provide template string for Autosuggest module')
    }
    if (!this.data.searchResultsContainerElement) {
      throw new Error(
        'You must provide search results container element for Autosuggest module'
      )
    }
    if (!this.data.searchInputElement) {
      throw new Error(
        'You must provide search input element for Autosuggest module'
      )
    }
  }

  private static injectResultsContainerStylesFor(
    searchInputElement: HTMLElement
  ): void {
    const searchResultsContainerStyles = document.createElement('style')
    searchResultsContainerStyles.innerHTML = `.blm-autosuggest-search-results {
      width: 100%;
      position: absolute;
      z-index: 100;
      left: 0;
      transform: translateY(${searchInputElement.offsetHeight}px);
    }`
    document.head.appendChild(searchResultsContainerStyles)
  }

  private static injectResultsContainerFor(
    searchInputElement: HTMLElement
  ): HTMLElement {
    const searchResultsContainerElement = document.createElement('div')
    searchResultsContainerElement.classList.add(
      'blm-autosuggest-search-results'
    )
    searchInputElement.parentElement?.appendChild(searchResultsContainerElement)
    return searchResultsContainerElement
  }

  static load(): AutosuggestModule | null {
    const config = AutosuggestConfig.build({q: ''})
    if (!config.get('isEnabled')) {
      return null
    }

    const searchInputElement = document.querySelectorAll(
      config.get('selector')
    )[0] as HTMLInputElement

    AutosuggestModule.injectResultsContainerStylesFor(searchInputElement)

    const searchResultsContainerElement = AutosuggestModule.injectResultsContainerFor(
      searchInputElement
    )

    return new AutosuggestModule({
      searchInputElement,
      searchResultsContainerElement,
      template: config.get('template') || AutosuggestModule.template,
      typedQueryTemplate: /*html*/ `<span class="blm-autosuggest__suggestion-term-link--typed-query"><%= query %></span>`
    }).init()
  }

  init(): AutosuggestModule {
    this.data.searchInputElement.addEventListener(
      'keyup',
      (event: KeyboardEvent) => {
        const query = (event.target as HTMLInputElement).value

        if (query.length >= MINIMUM_QUERY_LENGTH) {
          this.data.searchInputElement.dataset['originalQuery'] = query
          this.suggest(query)
        } else {
          this.data.searchResultsContainerElement.innerHTML = ''
          this.data.searchInputElement.dataset['originalQuery'] = ''
          this.cachedResponse = null
        }
      }
    )

    let mouseDownEventHappenedInsideSearchResultsContainer = false

    this.data.searchInputElement.addEventListener('blur', () => {
      if (mouseDownEventHappenedInsideSearchResultsContainer) {
        mouseDownEventHappenedInsideSearchResultsContainer = false
        return false
      }
      this.data.searchResultsContainerElement.innerHTML = ''
    })

    document.body.addEventListener('mousedown', (event: any) => {
      const clickHappenedOnInputOrResultsPanel = DomUtils.findUpElementWithClassName(
        event.target,
        'blm-autosuggest'
      )
      if (clickHappenedOnInputOrResultsPanel) {
        mouseDownEventHappenedInsideSearchResultsContainer = true
      } else {
        this.data.searchResultsContainerElement.innerHTML = ''
      }
    })

    this.data.searchInputElement.addEventListener('focus', () => {
      if (this.cachedResponse) {
        this.data.searchResultsContainerElement.innerHTML = ejs.render(
          this.data.template as string,
          this.cachedResponse
        )
      }
    })

    this.data.searchInputElement.setAttribute('autocomplete', 'off')

    const formElement = DomUtils.findUpElementByTagName(
      this.data.searchInputElement,
      'form'
    ) as HTMLFormElement
    formElement.addEventListener('submit', () => {
      const searchData: SearchPixelData = {
        q: this.data.searchInputElement.value,
        catalogs: [{name: 'example_en'}]
      }

      window.BrTrk.getTracker().logEvent(
        'suggest',
        'submit',
        searchData,
        {},
        true
      )
    })

    return this
  }

  async suggest(query: string): Promise<void> {
    const allParameters: {[key: string]: any} = {q: query}
    for (const [key, value] of new URLSearchParams(
      window.location.search
    ).entries()) {
      if (!Object.keys(allParameters).includes(key)) {
        allParameters[key] = value
      }
    }

    const results = await ApiCore.getAutosuggestData(
      (allParameters as unknown) as AutosuggestConfigParameters
    )
    const processedResults = this.processResults(results)

    processedResults.defaultCurrency =
      window.bloomreachDefaultCurrency || DEFAULT_CURRENCY

    this.cachedResponse = processedResults
    this.data.searchResultsContainerElement.innerHTML = ejs.render(
      this.data.template as string,
      processedResults
    )

    this.data.searchResultsContainerElement
      .querySelectorAll('.blm-autosuggest__suggestion-term-link--category')
      .forEach((categoryLinkElement: Node) => {
        categoryLinkElement.addEventListener('click', (event: Event) => {
          event.preventDefault()
          const clickedElement = event.target as HTMLAnchorElement
          const categoryId = clickedElement.dataset['categoryId'] as string

          if (window.BloomreachModules && window.BloomreachModules.category) {
            window.BloomreachModules.category.load(categoryId)
            this.data.searchInputElement.value = clickedElement.textContent as string
            this.data.searchResultsContainerElement.innerHTML = ''
            this.cachedResponse = null
          }
        })
      })

    this.data.searchResultsContainerElement
      .querySelectorAll('.blm-autosuggest__suggestion-term-link')
      .forEach((suggestionTermNode: Node) => {
        suggestionTermNode.addEventListener('click', () => {
          const {suggestionText} = (suggestionTermNode as HTMLElement).dataset
          const {originalQuery} = this.data.searchInputElement.dataset

          const suggestionData: SuggestionPixelData = {
            aq: originalQuery as string,
            q: suggestionText as string,
            catalogs: [{name: 'example_en'}]
          }

          window.BrTrk.getTracker().logEvent(
            'suggest',
            'click',
            suggestionData,
            {},
            true
          )
        })
      })
  }

  processResults(results: AutosuggestData): AutosuggestData {
    const processedResults = {...results}
    results.terms.forEach((term: Term, index: number) => {
      const typedQueryHtml = ejs
        .render(this.data.typedQueryTemplate as string, {
          query: results.originalQuery
        })
        .trim()
      processedResults.terms[index].processedText = term.text.replace(
        results.originalQuery as string,
        typedQueryHtml
      )
    })
    return processedResults
  }

  static template = /* html */ `
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
  `
}
