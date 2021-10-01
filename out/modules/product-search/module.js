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
exports.ProductSearchModule = void 0;
const logger_1 = require("../../utils/logger");
const ejs_1 = __importDefault(require("ejs"));
const core_1 = require("../core");
const product_search_1 = require("../../config/product-search");
const dom_1 = require("../../utils/dom");
const common_1 = require("../../config/common");
const PARAMETER_NAME_FACETS = 'fq';
const PARAMETER_NAME_SIZE = 'size';
const PARAMETER_NAME_SORT = 'sort';
const PARAMETER_NAME_PAGE = 'page';
const PARAMETER_NAME_FILTERS_PANEL = 'filterpanel';
const MAX_COLOR_SWATCHES = 4;
const MAX_PAGINATION_NUMBER_BEFORE_CURRENT = 2;
const MAX_PAGINATION_NUMBER_AFTER_CURRENT = 2;
const DEFAULT_CURRENCY = '$';
let loadSwatch;
class ProductSearchModule {
    constructor(options) {
        this.infiniteSize = 0;
        this.priceRangeMaxValue = 0;
        this.priceRangeStep = 0;
        this.maxSlideRange = 0;
        this.checkedFacets = {};
        const logger = logger_1.Logger.buildConsoleLogger();
        this.data = Object.assign({ logger }, options);
        this.checkRequirements();
    }
    checkRequirements() {
        if (!this.data.template) {
            throw new Error('You must provide template string for Product Search module');
        }
        if (!this.data.searchResultsContainerElement) {
            throw new Error('You must provide search results container element for Product Search module');
        }
    }
    static load() {
        const config = product_search_1.ProductSearchConfig.build({ q: '' });
        if (!config.get('isSearchPage')) {
            return null;
        }
        const searchResultsContainerElement = document.querySelector(config.get('selector'));
        return new ProductSearchModule({
            searchResultsContainerElement,
            template: config.get('template') || ProductSearchModule.template
        }).init(config);
    }
    init(config) {
        // add listeners for sort selector, page size selector, facets
        var _a, _b;
        const urlParameters = new URLSearchParams(window.location.search);
        if (urlParameters.has(config.get('defaultSearchParameter'))) {
            this.initiateSearch(urlParameters, config);
            // Infinite scroll
            if ((common_1.mobileView.matches || config.get('infiniteScroll')) &&
                !document.querySelector('.blm-scroll-indicator')) {
                const indicatorElement = document.createElement('div');
                indicatorElement.classList.add('blm-scroll-indicator');
                const loaderElement = document.createElement('div');
                loaderElement.classList.add('blm-scroll-indicator__loading');
                indicatorElement.appendChild(loaderElement);
                (_b = (_a = this.data.searchResultsContainerElement) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(indicatorElement, this.data.searchResultsContainerElement.nextSibling);
                const scrollIndicator = document.querySelector('.blm-scroll-indicator');
                const intersectionObserver = new IntersectionObserver((entries) => {
                    if (entries[0].intersectionRatio <= 0) {
                        return;
                    }
                    this.initiateScroll(new URLSearchParams(window.location.search), config);
                });
                if (scrollIndicator) {
                    intersectionObserver.observe(scrollIndicator);
                }
            }
            /* subtree option may be needed if we have other types of content
            than the main template, like an error message eg. */
            const mutationObserverConfig = { childList: true, subtree: true };
            const callback = (mutationsList) => {
                const productListAdded = mutationsList.find((mutationRecord) => mutationRecord.type === 'childList' &&
                    Array.from(mutationRecord.addedNodes).find((node) => node.classList &&
                        node.classList.contains('blm-product-search')));
                if (productListAdded) {
                    const priceRangeLowerBoundaryInput = document.querySelector('.blm-price-range-input--lower');
                    const priceRangeUpperBoundaryInput = document.querySelector('.blm-price-range-input--upper');
                    const onPriceRangeChange = () => {
                        const urlParameters = new URLSearchParams(window.location.search);
                        if (urlParameters.has(PARAMETER_NAME_SIZE)) {
                            this.infiniteSize = Number.parseInt(urlParameters.get(PARAMETER_NAME_SIZE));
                        }
                        else {
                            this.infiniteSize = config.get('itemsPerPage');
                        }
                        dom_1.DomUtils.updateMultipleInstanceParametersInUrl(PARAMETER_NAME_FACETS, Object.assign(Object.assign({}, this.checkedFacets), this.buildPriceUrlParameterObject()));
                        this.initiateSearch(new URLSearchParams(window.location.search), config);
                    };
                    if (priceRangeLowerBoundaryInput && priceRangeUpperBoundaryInput) {
                        priceRangeLowerBoundaryInput.addEventListener('input', onPriceRangeChange);
                        priceRangeUpperBoundaryInput.addEventListener('input', onPriceRangeChange);
                    }
                    // ! Here we can be sure that the template is rendered into the DOM
                    // Add a class to show that the module's content has loaded
                    this.data.searchResultsContainerElement.classList.add('blm-has-loaded');
                    if (document.querySelector('.blm-product-search-sidebar')) {
                        const sidebarControlButtons = document.querySelectorAll('.blm-product-search-control-button--sidebar');
                        const sidebarControlButtonClickHandler = () => {
                            const sidebarContentElement = document.querySelector('.blm-product-search-sidebar-content');
                            if (sidebarContentElement === null || sidebarContentElement === void 0 ? void 0 : sidebarContentElement.classList.contains('blm-open')) {
                                sidebarContentElement === null || sidebarContentElement === void 0 ? void 0 : sidebarContentElement.classList.remove('blm-open');
                                document.body.classList.remove('blm-out-of-view');
                                dom_1.DomUtils.updateParameterInUrl(PARAMETER_NAME_FILTERS_PANEL, '');
                            }
                            else {
                                document.body.classList.add('blm-out-of-view');
                                sidebarContentElement === null || sidebarContentElement === void 0 ? void 0 : sidebarContentElement.classList.add('blm-open');
                                dom_1.DomUtils.updateParameterInUrl(PARAMETER_NAME_FILTERS_PANEL, 'on');
                            }
                        };
                        sidebarControlButtons.forEach((button) => {
                            if (!button.getAttribute('hasListener')) {
                                button.addEventListener('click', sidebarControlButtonClickHandler);
                                button.setAttribute('hasListener', 'true');
                            }
                        });
                        // Listen to facet value changes
                        const facetCheckboxes = document.querySelectorAll('.blm-product-search-filter-item__checkbox');
                        if (facetCheckboxes) {
                            facetCheckboxes.forEach((checkbox) => {
                                checkbox.addEventListener('change', () => {
                                    const urlParameters = new URLSearchParams(window.location.search);
                                    if (urlParameters.has(PARAMETER_NAME_SIZE)) {
                                        this.infiniteSize = Number.parseInt(urlParameters.get(PARAMETER_NAME_SIZE));
                                    }
                                    else {
                                        this.infiniteSize = config.get('itemsPerPage');
                                    }
                                    const scrollIndicator = document.querySelector('.blm-scroll-indicator');
                                    if (scrollIndicator) {
                                        scrollIndicator.innerHTML = '';
                                        const loaderElement = document.createElement('div');
                                        loaderElement.classList.add('blm-scroll-indicator__loading');
                                        scrollIndicator.appendChild(loaderElement);
                                    }
                                    const checkedCheckboxes = document.querySelectorAll('.blm-product-search-filter-item__checkbox:checked');
                                    this.checkedFacets = checkedCheckboxes
                                        ? Array.from(checkedCheckboxes).reduce((all, current) => {
                                            return Object.assign(Object.assign({}, all), { [current.name]: all[current.name]
                                                    ? [...all[current.name], current.value]
                                                    : [current.value] });
                                        }, {})
                                        : {};
                                    /*
                                      If the checkedFacets is
                                      { colors: ["gray", "black"], reviews: ["4.7", "5.0"] }
                  
                                      then we're setting these values in the URL in this format:
                                      &fq=colors%3Agray%2Cblack&fq=reviews%3A4.7%2C5.0
                  
                                      because it's easier to read it like when we're performing the search,
                                      as it would be if we'd storing it in the format how we're using them
                                      in the API call's URL parameter list
                                    */
                                    dom_1.DomUtils.updateMultipleInstanceParametersInUrl(PARAMETER_NAME_FACETS, Object.assign(Object.assign({}, this.checkedFacets), this.buildPriceUrlParameterObject()));
                                    dom_1.DomUtils.updateParameterInUrl(PARAMETER_NAME_PAGE, '1');
                                    this.initiateSearch(new URLSearchParams(window.location.search), config);
                                });
                            });
                        }
                    }
                    // When we're going back in history, we want to initiate the search again according to the actual URL state
                    window.onpopstate = () => {
                        this.initiateSearch(new URLSearchParams(window.location.search), config);
                    };
                    // Listen to page size select field changes
                    const sizeSelector = document.querySelector('#sort-size');
                    if (sizeSelector) {
                        sizeSelector.addEventListener('change', (event) => {
                            dom_1.DomUtils.updateParameterInUrl(PARAMETER_NAME_SIZE, event.target.value);
                            dom_1.DomUtils.updateParameterInUrl(PARAMETER_NAME_PAGE, '1');
                            const urlParameters = new URLSearchParams(window.location.search);
                            if (urlParameters.has(PARAMETER_NAME_SIZE)) {
                                this.infiniteSize = Number.parseInt(urlParameters.get(PARAMETER_NAME_SIZE));
                            }
                            else {
                                this.infiniteSize = config.get('itemsPerPage');
                            }
                            this.initiateSearch(new URLSearchParams(window.location.search), config);
                        });
                    }
                    // Listen to sorting select field changes
                    const sortSelector = document.querySelector('#sort-by');
                    if (sortSelector) {
                        sortSelector.addEventListener('change', (event) => {
                            dom_1.DomUtils.updateParameterInUrl(PARAMETER_NAME_SORT, event.target.value);
                            this.initiateSearch(new URLSearchParams(window.location.search), config);
                        });
                    }
                    // Listen to pagination events
                    const paginationContainer = document.querySelector('.blm-product-search-pagination__pages');
                    if (paginationContainer) {
                        paginationContainer.addEventListener('click', (event) => {
                            const clickedPaginationValue = event.target
                                .dataset.value;
                            if (clickedPaginationValue) {
                                switch (event.target.dataset.value) {
                                    case 'previous':
                                        dom_1.DomUtils.decrementParameterInUrl(PARAMETER_NAME_PAGE);
                                        break;
                                    case 'next':
                                        dom_1.DomUtils.incrementParameterInUrl(PARAMETER_NAME_PAGE);
                                        break;
                                    default:
                                        dom_1.DomUtils.updateParameterInUrl(PARAMETER_NAME_PAGE, clickedPaginationValue);
                                }
                                this.initiateSearch(new URLSearchParams(window.location.search), config);
                                window.scrollTo(0, this.data.searchResultsContainerElement.offsetTop);
                            }
                        });
                    }
                    // Facet
                    const loadMore = document.getElementsByClassName('blm-product-search-load-more');
                    const config = product_search_1.ProductSearchConfig.build({ q: '' });
                    const numberOfDisplayedFacets = config.get('initialNumberOfFacets');
                    const loadMoreFacetLinkElement = document.querySelector('.blm-load-more-facet');
                    const loadMoreFacet = () => {
                        let i = 0;
                        for (const item of document.querySelectorAll(`.blm-product-search-filter:not([style*="display: block"])`)) {
                            if (i < numberOfDisplayedFacets) {
                                item.setAttribute('style', 'display: block');
                            }
                            i++;
                        }
                        if (document.querySelectorAll(`.blm-product-search-filter:not([style*="display: block"])`).length === 0) {
                            loadMoreFacetLinkElement === null || loadMoreFacetLinkElement === void 0 ? void 0 : loadMoreFacetLinkElement.classList.add('blm-hide');
                        }
                    };
                    loadMoreFacetLinkElement === null || loadMoreFacetLinkElement === void 0 ? void 0 : loadMoreFacetLinkElement.addEventListener('click', loadMoreFacet);
                    // Show the initial number of facets on load
                    loadMoreFacet();
                    const initialNumberOfFacetValues = config.get('initialNumberOfFacetValues');
                    document
                        .querySelectorAll(`.blm-product-search-filter-item:nth-child(-n+${initialNumberOfFacetValues})`)
                        .forEach((item) => (item.style.display = 'block'));
                    const facetMoreLoader = function () {
                        let showFilterItems = initialNumberOfFacetValues;
                        const incrementFilterBy = initialNumberOfFacetValues;
                        return function (e) {
                            const itemIndex = e.target.getAttribute('data-item');
                            const facetBlock = document.getElementById('blm-facet-block-item-' + itemIndex);
                            const filterListItems = facetBlock.getElementsByTagName('li');
                            for (let i = showFilterItems; i < showFilterItems + incrementFilterBy; i++) {
                                if (filterListItems[i]) {
                                    filterListItems[i].style.display = 'block';
                                }
                            }
                            showFilterItems += incrementFilterBy;
                            if (showFilterItems >= filterListItems.length) {
                                e.target.style.display = 'none';
                            }
                        };
                    };
                    if (loadMore !== null) {
                        Array.prototype.forEach.call(loadMore, function (element) {
                            const initFacetBlock = facetMoreLoader();
                            element.addEventListener('click', (e) => {
                                initFacetBlock(e);
                            });
                        });
                    }
                    // Swatch
                    loadSwatch = function () {
                        document
                            .querySelectorAll('.blm-product-search-swatch-image:nth-child(-n+1)')
                            .forEach((item) => (item.style.display = 'block'));
                        document
                            .querySelectorAll('.blm-product-search-swatch-container__swatch:nth-child(-n+1)')
                            .forEach((item) => item.classList.add('active'));
                        const results = document.querySelectorAll('.blm-product-search__result');
                        results.forEach(function (result) {
                            const swatchContainer = result.querySelectorAll('.blm-product-search-swatch-container');
                            swatchContainer.forEach(function (swatchItems) {
                                const swatchItem = swatchItems.querySelectorAll('.blm-product-search-swatch-container__swatch');
                                swatchItem.forEach(function (swatch, indexSwatch) {
                                    swatch.addEventListener('mouseover', function () {
                                        swatchItem.forEach(function (itemSwatch) {
                                            itemSwatch.classList.remove('active');
                                        });
                                        swatch.classList.add('active');
                                        const imageContainer = result.querySelectorAll('.blm-product-search-image-container');
                                        imageContainer.forEach(function (imageItems) {
                                            const imageItem = imageItems.querySelectorAll('.blm-product-search-swatch-image');
                                            imageItem.forEach(function (image, i) {
                                                image.style.display = 'none';
                                                if (indexSwatch === i) {
                                                    image.style.display = 'block';
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    };
                    loadSwatch();
                }
            };
            const observer = new MutationObserver(callback);
            observer.observe(this.data.searchResultsContainerElement, mutationObserverConfig);
        }
        return this;
    }
    buildPriceUrlParameterObject() {
        const priceRangeLowerBoundaryInput = document.querySelector('.blm-price-range-input--lower');
        const priceRangeUpperBoundaryInput = document.querySelector('.blm-price-range-input--upper');
        let lowerBoundary = parseFloat(priceRangeLowerBoundaryInput.value);
        let upperBoundary = parseFloat(priceRangeUpperBoundaryInput.value);
        if (lowerBoundary === upperBoundary) {
            if (upperBoundary === this.priceRangeMaxValue + this.priceRangeStep) {
                lowerBoundary -= this.priceRangeStep;
            }
            else {
                upperBoundary += this.priceRangeStep;
            }
        }
        if (upperBoundary === this.priceRangeMaxValue + this.priceRangeStep &&
            Number(lowerBoundary) === 0) {
            return {};
        }
        return {
            price: `${lowerBoundary},${upperBoundary === this.priceRangeMaxValue + this.priceRangeStep
                ? '*'
                : upperBoundary}`
        };
    }
    initiateScroll(urlParameters, config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (urlParameters.has(config.get('defaultSearchParameter'))) {
                const parameters = {
                    q: urlParameters.get(config.get('defaultSearchParameter')),
                    start: this.infiniteSize
                };
                const facets = urlParameters
                    .getAll(PARAMETER_NAME_FACETS)
                    .reduce((all, current) => (Object.assign(Object.assign({}, all), { [current.split(':')[0]]: current.split(':')[1].split(',') })), {});
                if (Object.keys(facets).length) {
                    /*
                      And we're setting the 'fq' parameter value as:
                      'colors:"gray" OR "black"&fq=reviews:"4.7" OR "5.0"'
            
                      so we can use multiple parameter instances in the API call
                    */
                    parameters.fq = Object.keys(facets)
                        .map((facetName) => {
                        if (facetName === 'price') {
                            return `${facetName}:[${facets[facetName]
                                .map((value) => `${value}`)
                                .join(' TO ')}]`;
                        }
                        else {
                            return `${facetName}:${facets[facetName]
                                .map((value) => `"${value}"`)
                                .join(' OR ')}`;
                        }
                    })
                        .join('&fq=');
                }
                const allParameters = Object.assign({}, parameters);
                for (const [key, value] of urlParameters.entries()) {
                    if (!Object.keys(parameters).includes(key)) {
                        allParameters[key] = value;
                    }
                }
                const scrollResults = yield core_1.ApiCore.getProductSearchData(allParameters);
                const scrollLoader = document.querySelector('.blm-scroll-indicator__loading');
                if (scrollResults.number_of_results < config.get('itemsPerPage') &&
                    scrollLoader) {
                    scrollLoader.remove();
                }
                const scrollIndicator = document.querySelector('.blm-scroll-indicator');
                const startCount = parameters.start;
                if (scrollResults.number_of_results <= startCount) {
                    const areBothZero = scrollResults.number_of_results === 0 && startCount === 0;
                    scrollIndicator.innerHTML = areBothZero ? '' : 'No more results';
                    return;
                }
                const searchResults = document.querySelector('.blm-product-search__results');
                const infiniteScrollTemplate = config.get('productListTemplate') ||
                    ProductSearchModule.productListTemplate;
                if (scrollResults.start >= config.get('itemsPerPage')) {
                    scrollResults.defaultCurrency =
                        window.bloomreachDefaultCurrency || DEFAULT_CURRENCY;
                    scrollResults.defaultMaxColorSwatches = MAX_COLOR_SWATCHES;
                    scrollResults.mobileView = common_1.mobileView;
                    const displayResults = ejs_1.default.render(infiniteScrollTemplate, scrollResults);
                    searchResults === null || searchResults === void 0 ? void 0 : searchResults.insertAdjacentHTML('beforeend', displayResults);
                    loadSwatch();
                }
                this.infiniteSize += config.get('itemsPerPage');
            }
        });
    }
    initiateSearch(urlParameters, config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (urlParameters.has(config.get('defaultSearchParameter'))) {
                const parameters = {
                    q: urlParameters.get(config.get('defaultSearchParameter'))
                };
                /*
                  We're reading facet values from the URL in this easy-to-read format:
                  { colors: ["gray", "black"], reviews: ["4.7", "5.0"] }
          
                  so we can add this to the result set to be able to easily use it in the template
                */
                const facets = urlParameters
                    .getAll(PARAMETER_NAME_FACETS)
                    .reduce((all, current) => (Object.assign(Object.assign({}, all), { [current.split(':')[0]]: current.split(':')[1].split(',') })), {});
                if (Object.keys(facets).length) {
                    /*
                      And we're setting the 'fq' parameter value as:
                      'colors:"gray" OR "black"&fq=reviews:"4.7" OR "5.0"'
            
                      so we can use multiple parameter instances in the API call
                    */
                    parameters.fq = Object.keys(facets)
                        .map((facetName) => {
                        if (facetName === 'price') {
                            return `${facetName}:[${facets[facetName]
                                .map((value) => `${value}`)
                                .join(' TO ')}]`;
                        }
                        else {
                            return `${facetName}:${facets[facetName]
                                .map((value) => `"${value}"`)
                                .join(' OR ')}`;
                        }
                    })
                        .join('&fq=');
                }
                if (urlParameters.has(PARAMETER_NAME_SIZE)) {
                    parameters.rows = Number.parseInt(urlParameters.get(PARAMETER_NAME_SIZE));
                }
                else {
                    parameters.rows = config.get('itemsPerPage');
                }
                if (urlParameters.has(PARAMETER_NAME_SORT)) {
                    parameters.sort = urlParameters.get(PARAMETER_NAME_SORT);
                }
                if (urlParameters.has(PARAMETER_NAME_PAGE)) {
                    parameters.start =
                        (Number.parseInt(urlParameters.get(PARAMETER_NAME_PAGE)) -
                            1) *
                            parameters.rows;
                }
                if (!urlParameters.get(config.get('defaultSearchParameter'))) {
                    return;
                }
                const allParameters = Object.assign({}, parameters);
                for (const [key, value] of urlParameters.entries()) {
                    if (!Object.keys(parameters).includes(key)) {
                        allParameters[key] = value;
                    }
                }
                const results = yield core_1.ApiCore.getProductSearchData(allParameters);
                const scrollLoader = document.querySelector('.blm-scroll-indicator__loading');
                if (results.number_of_results < config.get('itemsPerPage') &&
                    scrollLoader) {
                    scrollLoader.remove();
                }
                // Resetting these parameters for the template so the fields can keep up with them
                if (urlParameters.has(PARAMETER_NAME_SORT)) {
                    results.sort = urlParameters.get(PARAMETER_NAME_SORT);
                }
                if (urlParameters.has(PARAMETER_NAME_SIZE)) {
                    results.size = Number.parseInt(urlParameters.get(PARAMETER_NAME_SIZE));
                }
                else {
                    results.size = Number.parseInt(config.get('itemsPerPage').toString());
                }
                if (urlParameters.has(PARAMETER_NAME_PAGE)) {
                    results.page = Number.parseInt(urlParameters.get(PARAMETER_NAME_PAGE));
                }
                results.checkedFacets = facets;
                if (results.priceRanges) {
                    this.priceRangeMaxValue = Number(results.priceRanges.slice(-1)[0].start);
                    const startValue = Number(results.priceRanges[0].start === '*'
                        ? 0
                        : results.priceRanges[0].start);
                    this.priceRangeStep = Number(results.priceRanges[0].end) - startValue;
                    this.maxSlideRange = this.priceRangeMaxValue + this.priceRangeStep;
                    results.priceRangeFacet = {
                        start: startValue,
                        step: this.priceRangeStep,
                        end: this.maxSlideRange
                    };
                }
                results.paginationData = ProductSearchModule.buildPaginationDataForResults(results);
                results.originalQuery = urlParameters.get(config.get('defaultSearchParameter'));
                results.defaultCurrency =
                    window.bloomreachDefaultCurrency || DEFAULT_CURRENCY;
                results.isFiltersPanelOpened = urlParameters.has(PARAMETER_NAME_FILTERS_PANEL);
                results.defaultMaxColorSwatches = MAX_COLOR_SWATCHES;
                results.mobileView = common_1.mobileView;
                this.data.searchResultsContainerElement.innerHTML = ejs_1.default.render(this.data.template.replace('%%-PRODUCT_LIST_TEMPLATE-%%', config.get('productListTemplate') ||
                    ProductSearchModule.productListTemplate), results);
            }
        });
    }
    static buildPaginationDataForResults(results) {
        const pageSize = results.size || 1;
        if (results.number_of_results <= pageSize) {
            return [];
        }
        const page = Math.ceil((results.start + 1) / pageSize);
        const numberOfAllPages = Math.ceil(results.number_of_results / pageSize);
        const beforeNumbers = Array(page - 1)
            .fill(null)
            .map((_, index) => index + 1)
            .slice(-MAX_PAGINATION_NUMBER_BEFORE_CURRENT);
        const afterNumbers = Array(numberOfAllPages - page)
            .fill(null)
            .map((_, index) => index + (page + 1))
            .slice(0, MAX_PAGINATION_NUMBER_AFTER_CURRENT);
        return [
            ...(page > 1 ? [{ value: 'previous', label: '&larr;' }] : []),
            ...(page - 1 > MAX_PAGINATION_NUMBER_BEFORE_CURRENT
                ? [
                    {
                        label: '&hellip;',
                        value: (page -
                            MAX_PAGINATION_NUMBER_BEFORE_CURRENT -
                            1).toString()
                    }
                ]
                : []),
            ...beforeNumbers.map((number) => ({ value: number.toString() })),
            { value: page.toString(), disabled: true, active: true },
            ...afterNumbers.map((number) => ({ value: number.toString() })),
            ...(page + MAX_PAGINATION_NUMBER_AFTER_CURRENT < numberOfAllPages
                ? [
                    {
                        label: '&hellip;',
                        value: (page + MAX_PAGINATION_NUMBER_AFTER_CURRENT + 1).toString()
                    }
                ]
                : []),
            ...(page < numberOfAllPages ? [{ value: 'next', label: '&rarr;' }] : [])
        ];
    }
}
exports.ProductSearchModule = ProductSearchModule;
ProductSearchModule.template = `
    <% if (did_you_mean.length) { %>
      <div class="blm-product-search-header">
        <div class="blm-product-search-header-container">
          <h1 class="blm-product-search-header-container__title">Results for 
            <% if (locals.keywordRedirect && keywordRedirect.redirected_url) { %>
              <i><%- keywordRedirect.redirected_url %></i>
            <% } else { %> 
              <i><%- did_you_mean[0] %></i>
            <% } %> 
             instead of <i class="blm-product-search-header-container__title__searched-word"><%- originalQuery %></i></h1>
          <div class="blm-did-you-mean-suggestion">
            <label class="blm-did-you-mean-suggestion__label">Did you mean:</label> 
            <% did_you_mean.forEach(function(word) { %>
            <a href="<%= config.get('searchPageUrl') %>?<%= config.get('defaultSearchParameter') %>=<%= word %>" class="blm-did-you-mean-suggestion__link"><%- word %></a>
            <% }); %>
          </div>
          <% if (locals.keywordRedirect && keywordRedirect.redirected_query) { %>
          <div class="blm-redirected-keyword">Redirected from <i>"<%- keywordRedirect.redirected_query %>"</i>.</div>
          <% } %> 
        </div>
      </div>
    <% } %> 
    <% if (locals.keywordRedirect && keywordRedirect.redirected_url && did_you_mean.length === 0) { %>
      <div class="blm-product-search-header">
        <div class="blm-product-search-header-container">
          <h1 class="blm-product-search-header-container__title">Results for <i><%- keywordRedirect.redirected_url %></i> </h1>
          <div class="blm-redirected-keyword">Redirected from <i>"<%- keywordRedirect.redirected_query %>"</i> </div>
        </div>
      </div>
    <% } %> 
    <div class="blm-product-search <% if (config.get('areFacetsIncluded')) { %>with-facets<% } %>">
        <% if (config.get('areFacetsIncluded') && facets.length) { %>
        <aside class="blm-product-search-sidebar">    

          <button class="blm-product-search-control-button blm-product-search-control-button--sidebar">
            Filter
            <svg viewBox="0 0 14.8 14.8" class="blm-product-search-control-button__icon" focusable="false"><path d="M1.6 14.8V0m6 14.8V1.6m5.6 13.2V0" fill="none" stroke="#000" stroke-miterlimit="10"></path><circle cx="1.6" cy="7.4" r="1.6"></circle><circle cx="13.2" cy="10.4" r="1.6"></circle><circle cx="7.6" cy="1.6" r="1.6"></circle></svg>
          </button>

          <div class="blm-product-search-sidebar-content <% if (locals.isFiltersPanelOpened && isFiltersPanelOpened) { %>blm-open<% } %>">

            <button class="blm-product-search-control-button blm-product-search-control-button--sidebar blm-product-search-control-button--active">
              Done
              <svg viewBox="0 0 14.8 14.8" class="blm-product-search-control-button__icon" focusable="false"><path class="blm-product-search-control-button__icon-path" d="M1.6 14.8V0m6 14.8V1.6m5.6 13.2V0" fill="none" stroke="#000" stroke-miterlimit="10"></path><circle cx="1.6" cy="7.4" r="1.6"></circle><circle cx="13.2" cy="10.4" r="1.6"></circle><circle cx="7.6" cy="1.6" r="1.6"></circle></svg>
            </button>

            <div class="blm-product-search-filter">
              <h4 class="blm-product-search-filter-title">Price</h4>
              <div class="blm-price-range-container">
                <div class="blm-range-slider">
                  <input 
                    value="<%= checkedFacets.price ? checkedFacets.price[0] : priceRangeFacet.start %>" 
                    min="<%- priceRangeFacet.start %>" 
                    max="<%- priceRangeFacet.end %>"
                    step="<%- priceRangeFacet.step %>"
                    type="range" 
                    class="blm-price-range-input blm-price-range-input--lower"
                  >
                  <span class="blm-price-range-slider-rail"></span>
                  <input
                    value="<%= checkedFacets.price ? (checkedFacets.price[1] === '*' ? priceRangeFacet.end : checkedFacets.price[1]) : priceRangeFacet.end %>"
                    min="<%- priceRangeFacet.start %>"
                    max="<%- priceRangeFacet.end %>"
                    step="<%- priceRangeFacet.step %>" 
                    type="range" 
                    class="blm-price-range-input blm-price-range-input--upper"
                  >
                </div>
                <div class="blm-range-slider__values">
                  <span class="blm-range-slider__values--min">
                    <% if (config.get('formatMoney')) { %>
                      <%= checkedFacets.price ? config.get('formatMoney')(checkedFacets.price[0] * 100) : config.get('formatMoney')(priceRangeFacet.start * 100) %>
                    <% } else { %>
                      <%= defaultCurrency %><%= checkedFacets.price ? checkedFacets.price[0] : priceRangeFacet.start %>
                    <% } %>
                  </span>
                  <% if (checkedFacets.price) { %>
                    <span class="blm-range-slider__values--max">
                      <% if (config.get('formatMoney')) { %>
                        <%= checkedFacets.price ? (checkedFacets.price[1] === '*' ? config.get('formatMoney')((priceRangeFacet.end - priceRangeFacet.step) * 100) + '+' : config.get('formatMoney')(checkedFacets.price[1] * 100)) : config.get('formatMoney')(priceRangeFacet.start * 100) %>
                      <% } else { %>
                        <%= defaultCurrency %><%= checkedFacets.price ? (checkedFacets.price[1] === '*' ? (priceRangeFacet.end - priceRangeFacet.step) + '+' : checkedFacets.price[1]) : priceRangeFacet.start %>
                      <% } %>
                    </span>
                  <% } else { %>
                    <span class="blm-range-slider__values--max">
                      <% if (config.get('formatMoney')) { %>
                        <%= config.get('formatMoney')((priceRangeFacet.end - priceRangeFacet.step) * 100) + '+' %>
                      <% } else { %>
                        <%= defaultCurrency %><%= (priceRangeFacet.end - priceRangeFacet.step) + '+' %>
                      <% } %>
                    </span>
                  <% } %>
                </div>
              </div>
            </div>

            <% facets.forEach(function(facet, facetIndex) { %>
              <% if (facet.section.length > 0) { %>
              <div class="blm-product-search-filter" id="blm-facet-block-item-<%= facetIndex %>">
                <h4 class="blm-product-search-filter-title"><%- facet.title %></h4>
                <ul class="blm-product-search-filter-items">
                  <% facet.section.forEach(function(item) { %>
                  <li class="blm-product-search-filter-item">
                    <input
                      type="checkbox"
                      <% if (facet.original_title in checkedFacets && checkedFacets[facet.original_title].includes(item.id)) { %>checked<% } %>
                      name="<%- facet.original_title %>"
                      value="<%- item.id %>"
                      id="<%- facet.original_title + '[' + item.name + ']' %>"
                      class="blm-product-search-filter-item__checkbox"
                    />
                    <label class="blm-product-search-filter-item__name" for="<%- facet.original_title + '[' + item.name + ']' %>"><%- item.name %></label>
                    <% if (!config.get('displayVariants')) { %>
                    <span class="blm-product-search-filter-item__badge"><%- item.count %></span>
                    <% } %>
                  </li>
                  <% }); %>
                </ul>
                <% if (facet.section.length > config.get('initialNumberOfFacetValues')) { %>
                <div class="blm-product-search-load-more" data-item="<%= facetIndex %>">+ More</div>
                <% } %>
              </div>
              <% } %>
            <% }); %>

            <% if (facets[0].section.length) { %>
            <div class="blm-load-more-facet">+ More </div>
            <% } %> 

          </div>
        </aside>
        <% } %>
        <section class="blm-product-search-main">
          <div class="blm-product-search-toolbar">
            <% if (locals.number_of_results && number_of_results > 0) { %>
            <h2 class="blm-product-search-toolbar__title">
              Showing <%- start + 1 %> - <%- Math.min(start + products.length, number_of_results) %> of <%- number_of_results %> products
            </h2>
            <div class="blm-product-search-toolbar-options">
              <span class="blm-product-search-toolbar-options blm-product-search-toolbar-options--page-size">
                <label for="sort-size" class="blm-product-search-toolbar-options__label">Size: </label>
                <select
                  name="sort-size"
                  id="sort-size"
                  class="blm-product-search-toolbar-options__select"
                >
                  <% for (let i = 16; i <= 48; i += 4) { %>
                    <option value="<%- i %>" <% if (locals.size && size === i) { %>selected<% } %>><%- i %></option>
                  <% } %>
                </select>
              </span>
              <span class="blm-product-search-toolbar-options blm-product-search-toolbar-options--sort-by">
                <label for="sort-by" class="blm-product-search-toolbar-options__label">Sort By: </label>
                <select
                  name="sort-by"
                  id="sort-by"
                  class="blm-product-search-toolbar-options__select"
                >
                  <% config.get('sortingOptions').forEach(function(option) { %>
                    <option value="<%- option.value %>" <% if (locals.sort && sort === option.value) { %>selected<% } %>><%- option.label %></option>
                  <% }) %>
                </select>
              </span>
            </div>
            <% } else { %>
            <h2 class="blm-product-search-toolbar__title">
              No results found
            </h2>
            <% } %>
            
          </div>
          <% if (products.length) { %>
          <div class="blm-product-search__results">
            %%-PRODUCT_LIST_TEMPLATE-%%
          </div>
          <% } %>
          
          <% if (!locals.mobileView || !mobileView.matches) { %>
              <% if (!config.get('infiniteScroll') && paginationData.length > 0) { %>
              <div class="blm-product-search-pagination">
                <ul class="blm-product-search-pagination__pages">
                  <% paginationData.forEach(paginationNode => { %>
                    <li class="blm-product-search-pagination__page">
                      <button <% if (paginationNode.disabled) { %>disabled<% } %> class="blm-product-search-pagination__page-link <% if (paginationNode.active) { %>blm-product-search-pagination__page-link--active<% } %>" data-value="<%- paginationNode.value %>"
                        ><%- paginationNode.label ?? paginationNode.value %></button
                      >
                    </li>
                  <% }) %>
                </ul>
              </div>
              <% } %>
          <% } %>
        </section>
      </div>
  `;
ProductSearchModule.productListTemplate = `
    <% products.forEach(function(product) { %>
      <div class="blm-product-search__result" <% if (product.variant_name) { %>title="<%- product.variant_name %>"<% } %>>
        <div class="blm-product-search-image-container">
          <% if (product.variants && product.variants.length > 1) { %>
            <% product.variants.forEach(function(variant) { %>
            <div class="blm-product-search-swatch-image fade">
              <img
                class="blm-product-search-image-container__image"
                alt="title"
                src="<%= variant.image %>"
              />
            </div>
            <% }); %>
          <% } else { %>
            <div class="blm-product-search-swatch-image fade">
              <img
                class="blm-product-search-image-container__image"
                alt="title"
                src="<%= product.image %>"
              />
            </div>
          <% } %>
        </div>
        <div class="blm-product-search-details-container">
          <div class="blm-product-search-details-title-container">
            <a href="<%= product.link %>" class="blm-product-search-details-container__title"
              ><%- product.title %></a
            >
          </div>
          
          <p class="blm-product-search-details-container__price">
            <% if (product.final_price) { %>
              <% if (config.get('formatMoney')) { %>
                <%= config.get('formatMoney')(product.final_price.toFixed() * 100) %>
              <% } else { %>
                <%= defaultCurrency %><%= product.final_price.toFixed() %>
              <% } %>
            <% } %>
            <span <% if (product.final_price) { %>class="blm-product-search-details-container__price--strike-through"<% } %>>
              <% if (config.get('formatMoney')) { %>
                <%= config.get('formatMoney')(product.price.toFixed() * 100) %>
              <% } else { %>
                <%= defaultCurrency %><%= product.price.toFixed() %>
              <% } %>
            </span>
          </p>
          
        </div>

        <% if (product.variants && product.variants.length > 1) { %>
          <ul class="blm-product-search-swatch-container">
          <% product.variants.slice(0, defaultMaxColorSwatches || 0).forEach(function(variant) { %>
            <li
              class="blm-product-search-swatch-container__swatch"
              style="background-image: url('<%= variant.image %>')"
            ></li>
          <% }); %>
          </ul>

          <% if (product.variants.length > defaultMaxColorSwatches || 0) { %>
          <small class="blm-product-search-swatch-colors">(Colors) <%- product.variants.length %></small>
          <% } %>
        <% } %>
      </div>
    <% }); %>
  `;
