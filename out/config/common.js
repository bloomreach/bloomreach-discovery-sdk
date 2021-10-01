"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabletView = exports.mobileView = exports.buildStaticWidgetConfigParameters = exports.buildStaticProductSearchConfigParameters = exports.buildStaticCategoryConfigParameters = exports.buildStaticAutosuggestConfigParameters = exports.PAGE_SIZE_DEFAULT = exports.EXAMPLE_DOMAIN_KEY = exports.SEARCH_TYPE_KEYWORD = exports.SEARCH_TYPE_CATEGORY = exports.REQUEST_TYPE_SUGGEST = exports.REQUEST_TYPE_SEARCH = exports.EXAMPLE_ROWS_20 = exports.EXAMPLE_ROWS_10 = exports.DEFAULT_START = exports.FIELD_LIST_WIDGETS = exports.FIELD_LIST_DEFAULT = exports.EXAMPLE_AUTH_KEY = exports.EXAMPLE_CATALOG_VIEWS = exports.EXAMPLE_COMMON_BLOOMREACH_UID = exports.EXAMPLE_COMMON_REF_URL = exports.EXAMPLE_COMMON_URL = exports.EXAMPLE_COMMON_ACCOUNT_ID = exports.breakpoints = void 0;
const api_1 = require("../utils/api");
const bloomreachConnector = window.bloomreachConnector;
var breakpoints;
(function (breakpoints) {
    breakpoints["small"] = "480px";
    breakpoints["medium"] = "680px";
    breakpoints["large"] = "750px";
    breakpoints["xlarge"] = "875px";
    breakpoints["xxlarge"] = "1000px";
    breakpoints["xxxlarge"] = "1200px";
})(breakpoints = exports.breakpoints || (exports.breakpoints = {}));
exports.EXAMPLE_COMMON_ACCOUNT_ID = '6511';
exports.EXAMPLE_COMMON_URL = 'https://pacifichome.bloomreach.com';
exports.EXAMPLE_COMMON_REF_URL = 'https://pacifichome.bloomreach.com';
exports.EXAMPLE_COMMON_BLOOMREACH_UID = 'uid%3D7797686432023%3Av%3D11.5%3Ats%3D1428617911187%3Ahc%3D55';
exports.EXAMPLE_CATALOG_VIEWS = 'my_product_catalog:store1|recipe:daily';
exports.EXAMPLE_AUTH_KEY = '3ggj32eqbeqaahsa';
exports.FIELD_LIST_DEFAULT = 'pid,title,brand,price,sale_price,thumb_image,sku_thumb_images,sku_swatch_images,sku_color_group,url,price_range,sale_price_range,description';
exports.FIELD_LIST_WIDGETS = 'pid,price,sale_price,title,thumb_image,url';
exports.DEFAULT_START = 0;
exports.EXAMPLE_ROWS_10 = 10;
exports.EXAMPLE_ROWS_20 = 20;
exports.REQUEST_TYPE_SEARCH = 'search';
exports.REQUEST_TYPE_SUGGEST = 'suggest';
exports.SEARCH_TYPE_CATEGORY = 'category';
exports.SEARCH_TYPE_KEYWORD = 'keyword';
exports.EXAMPLE_DOMAIN_KEY = 'sandbox_bornconnector';
exports.PAGE_SIZE_DEFAULT = 16;
const ENDPOINT_AUTOSUGGEST_API = 'https://suggest.dxpapi.com/api/v1/suggest/';
const ENDPOINT_PRODUCT_SEARCH_API = 'https://core.dxpapi.com/api/v1/core/';
const ENDPOINT_PRODUCT_CATEGORY_API = 'https://core.dxpapi.com/api/v1/core/';
const ENDPOINT_WIDGETS_API = 'https://pathways.dxpapi.com/api/v2/widgets/';
const buildStaticAutosuggestConfigParameters = () => {
    var _a;
    if (!bloomreachConnector || !bloomreachConnector.config) {
        throw new Error('Bloomreach Connector config not found');
    }
    const trackingCookie = ((_a = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('_br_uid_2='))) === null || _a === void 0 ? void 0 : _a.replace('_br_uid_2=', '')) || '';
    return {
        endpoint: bloomreachConnector.config.autosuggest.endpoint ||
            ENDPOINT_AUTOSUGGEST_API,
        isEnabled: bloomreachConnector.config.autosuggest.enabled,
        numberOfCollections: bloomreachConnector.config.autosuggest.number_of_collections,
        numberOfProducts: bloomreachConnector.config.autosuggest.number_of_products,
        numberOfTerms: bloomreachConnector.config.autosuggest.number_of_terms,
        selector: bloomreachConnector.config.autosuggest.selector,
        defaultSearchParameter: bloomreachConnector.config.default_search_parameter,
        urlParameters: {
            account_id: bloomreachConnector.config.account_id,
            domain_key: bloomreachConnector.config.domain_key,
            request_id: api_1.generateRequestId(),
            _br_uid_2: trackingCookie,
            ref_url: window.location.href,
            url: window.location.href,
            auth_key: bloomreachConnector.config.auth_key,
            request_type: exports.REQUEST_TYPE_SUGGEST,
            q: ''
        },
        noEncodeParameters: ['_br_uid_2', 'sort'],
        template: bloomreachConnector.config.autosuggest.template,
        searchPageUrl: bloomreachConnector.config.search_page_url,
        formatMoney: bloomreachConnector.config.format_money
    };
};
exports.buildStaticAutosuggestConfigParameters = buildStaticAutosuggestConfigParameters;
const buildStaticCategoryConfigParameters = () => {
    var _a;
    if (!bloomreachConnector || !bloomreachConnector.config) {
        throw new Error('Bloomreach Connector config not found');
    }
    const trackingCookie = ((_a = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('_br_uid_2='))) === null || _a === void 0 ? void 0 : _a.replace('_br_uid_2=', '')) || '';
    return {
        endpoint: bloomreachConnector.config.category.endpoint ||
            ENDPOINT_PRODUCT_CATEGORY_API,
        isEnabled: bloomreachConnector.config.category.enabled,
        areFacetsIncluded: bloomreachConnector.config.category.facets_included,
        infiniteScroll: bloomreachConnector.config.category.infinite_scroll,
        isCategoryPage: bloomreachConnector.config.category.is_category_page,
        itemsPerPage: bloomreachConnector.config.category.items_per_page,
        initialNumberOfFacetValues: bloomreachConnector.config.category.initial_number_of_facet_values,
        initialNumberOfFacets: bloomreachConnector.config.category.initial_number_of_facets,
        areVariantsDisplayed: bloomreachConnector.config.category.display_variants,
        selector: bloomreachConnector.config.category.selector,
        defaultSearchParameter: bloomreachConnector.config.default_search_parameter,
        sortingOptions: bloomreachConnector.config.category.sorting_options.sort((option1) => (option1.value === '' ? -1 : 1)),
        urlParameters: {
            account_id: bloomreachConnector.config.account_id,
            domain_key: bloomreachConnector.config.domain_key,
            request_id: api_1.generateRequestId(),
            _br_uid_2: trackingCookie,
            ref_url: window.location.href,
            url: window.location.href,
            auth_key: bloomreachConnector.config.auth_key,
            request_type: exports.REQUEST_TYPE_SEARCH,
            search_type: exports.SEARCH_TYPE_CATEGORY,
            fl: bloomreachConnector.config.category.fields || exports.FIELD_LIST_DEFAULT,
            rows: bloomreachConnector.config.category.items_per_page,
            start: exports.DEFAULT_START,
            q: '',
            'facet.range': 'price'
        },
        displayVariants: bloomreachConnector.config.category.display_variants,
        categoryId: bloomreachConnector.config.category.category_id,
        template: bloomreachConnector.config.category.template,
        productListTemplate: bloomreachConnector.config.category.product_list_template,
        noEncodeParameters: ['_br_uid_2', 'sort', 'fq'],
        formatMoney: bloomreachConnector.config.format_money
    };
};
exports.buildStaticCategoryConfigParameters = buildStaticCategoryConfigParameters;
const buildStaticProductSearchConfigParameters = () => {
    var _a;
    if (!bloomreachConnector || !bloomreachConnector.config) {
        throw new Error('Bloomreach Connector config not found');
    }
    const trackingCookie = ((_a = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('_br_uid_2='))) === null || _a === void 0 ? void 0 : _a.replace('_br_uid_2=', '')) || '';
    return {
        endpoint: bloomreachConnector.config.search.endpoint || ENDPOINT_PRODUCT_SEARCH_API,
        isEnabled: bloomreachConnector.config.search.enabled,
        areFacetsIncluded: bloomreachConnector.config.search.facets_included,
        infiniteScroll: bloomreachConnector.config.search.infinite_scroll,
        isSearchPage: bloomreachConnector.config.search.is_search_page,
        itemsPerPage: bloomreachConnector.config.search.items_per_page,
        initialNumberOfFacetValues: bloomreachConnector.config.search.initial_number_of_facet_values,
        initialNumberOfFacets: bloomreachConnector.config.search.initial_number_of_facets,
        areVariantsDisplayed: bloomreachConnector.config.search.display_variants,
        selector: bloomreachConnector.config.search.selector,
        defaultSearchParameter: bloomreachConnector.config.default_search_parameter,
        sortingOptions: bloomreachConnector.config.search.sorting_options.sort((option1) => (option1.value === '' ? -1 : 1)),
        urlParameters: {
            account_id: bloomreachConnector.config.account_id,
            domain_key: bloomreachConnector.config.domain_key,
            request_id: api_1.generateRequestId(),
            _br_uid_2: trackingCookie,
            ref_url: window.location.href,
            url: window.location.href,
            auth_key: bloomreachConnector.config.auth_key,
            request_type: exports.REQUEST_TYPE_SEARCH,
            search_type: exports.SEARCH_TYPE_KEYWORD,
            fl: bloomreachConnector.config.search.fields || exports.FIELD_LIST_DEFAULT,
            rows: bloomreachConnector.config.search.items_per_page,
            start: exports.DEFAULT_START,
            q: '',
            'facet.range': 'price'
        },
        displayVariants: bloomreachConnector.config.search.display_variants,
        noEncodeParameters: ['_br_uid_2', 'sort', 'fq'],
        template: bloomreachConnector.config.search.template,
        productListTemplate: bloomreachConnector.config.search.product_list_template,
        searchPageUrl: bloomreachConnector.config.search_page_url,
        formatMoney: bloomreachConnector.config.format_money
    };
};
exports.buildStaticProductSearchConfigParameters = buildStaticProductSearchConfigParameters;
const commonWidgetUrlParameters = () => {
    var _a;
    const trackingCookie = ((_a = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('_br_uid_2='))) === null || _a === void 0 ? void 0 : _a.replace('_br_uid_2=', '')) || '';
    return {
        account_id: bloomreachConnector.config.account_id,
        domain_key: bloomreachConnector.config.domain_key,
        request_id: api_1.generateRequestId(),
        _br_uid_2: trackingCookie,
        ref_url: window.location.href,
        url: window.location.href,
        rows: exports.PAGE_SIZE_DEFAULT,
        start: exports.DEFAULT_START,
        fields: bloomreachConnector.config.widget_fields || exports.FIELD_LIST_WIDGETS
    };
};
const buildStaticWidgetConfigParameters = (parameters) => {
    if (!bloomreachConnector || !bloomreachConnector.config) {
        throw new Error('Bloomreach Connector config not found');
    }
    const { type, id, numberOfItemsToShow } = parameters;
    return {
        endpoint: `${bloomreachConnector.config.widget_endpoint || ENDPOINT_WIDGETS_API}${type}/${id}`,
        type,
        id,
        numberOfItemsToShow,
        urlParameters: commonWidgetUrlParameters(),
        formatMoney: bloomreachConnector.config.format_money
    };
};
exports.buildStaticWidgetConfigParameters = buildStaticWidgetConfigParameters;
// COMMON
// Mobile/Tablet breakpoints
exports.mobileView = window.matchMedia(`(max-width: ${breakpoints.medium})`);
exports.tabletView = window.matchMedia(`(min-width:${breakpoints.medium}) and (max-width: ${breakpoints.xlarge})`);
