import {generateRequestId} from '../utils/general'
import {
  MandatoryAutosuggestConfigParameters,
  MandatoryCategoryConfigParameters,
  MandatoryPathwaysAndRecommendationsConfigParameters,
  MandatoryProductSearchConfigParameters,
  SortByOptions,
  WidgetTypes
} from './interfaces'

declare global {
  interface Window {
    bloomreachConnector: any
  }
}

const bloomreachConnector = window.bloomreachConnector

export enum breakpoints {
  small = '480px',
  medium = '680px',
  large = '750px',
  xlarge = '875px',
  xxlarge = '1000px',
  xxxlarge = '1200px'
}

export const EXAMPLE_COMMON_ACCOUNT_ID = '6511'
export const EXAMPLE_COMMON_URL = 'https://pacifichome.bloomreach.com'
export const EXAMPLE_COMMON_REF_URL = 'https://pacifichome.bloomreach.com'
export const EXAMPLE_COMMON_BLOOMREACH_UID =
  'uid%3D7797686432023%3Av%3D11.5%3Ats%3D1428617911187%3Ahc%3D55'
export const EXAMPLE_CATALOG_VIEWS = 'my_product_catalog:store1|recipe:daily'
export const EXAMPLE_AUTH_KEY = '3ggj32eqbeqaahsa'
export const FIELD_LIST_DEFAULT =
  'pid,title,brand,price,sale_price,thumb_image,sku_thumb_images,sku_swatch_images,sku_color_group,url,price_range,sale_price_range,description'
export const FIELD_LIST_WIDGETS = 'pid,price,sale_price,title,thumb_image,url'
export const DEFAULT_START = 0
export const EXAMPLE_ROWS_10 = 10
export const EXAMPLE_ROWS_20 = 20
export const REQUEST_TYPE_SEARCH = 'search'
export const REQUEST_TYPE_SUGGEST = 'suggest'
export const SEARCH_TYPE_CATEGORY = 'category'
export const SEARCH_TYPE_KEYWORD = 'keyword'
export const EXAMPLE_DOMAIN_KEY = 'sandbox_bornconnector'
export const PAGE_SIZE_DEFAULT = 16

const ENDPOINT_AUTOSUGGEST_API = 'https://suggest.dxpapi.com/api/v1/suggest/'
const ENDPOINT_PRODUCT_SEARCH_API = 'https://core.dxpapi.com/api/v1/core/'
const ENDPOINT_PRODUCT_CATEGORY_API = 'https://core.dxpapi.com/api/v1/core/'
const ENDPOINT_WIDGETS_API = 'https://pathways.dxpapi.com/api/v2/widgets/'

export const buildStaticAutosuggestConfigParameters = (): MandatoryAutosuggestConfigParameters => {
  if (!bloomreachConnector || !bloomreachConnector.config) {
    throw new Error('Bloomreach Connector config not found')
  }

  const trackingCookie =
    document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('_br_uid_2='))
      ?.replace('_br_uid_2=', '') || ''

  return {
    endpoint:
      bloomreachConnector.config.autosuggest.endpoint ||
      ENDPOINT_AUTOSUGGEST_API,
    isEnabled: bloomreachConnector.config.autosuggest.enabled,
    numberOfCollections:
      bloomreachConnector.config.autosuggest.number_of_collections,
    numberOfProducts: bloomreachConnector.config.autosuggest.number_of_products,
    numberOfTerms: bloomreachConnector.config.autosuggest.number_of_terms,
    selector: bloomreachConnector.config.autosuggest.selector,
    defaultSearchParameter: bloomreachConnector.config.default_search_parameter,
    urlParameters: {
      account_id: bloomreachConnector.config.account_id,
      domain_key: bloomreachConnector.config.domain_key,
      request_id: generateRequestId(),
      _br_uid_2: trackingCookie,
      ref_url: window.location.href,
      url: window.location.href,
      auth_key: bloomreachConnector.config.auth_key,
      request_type: REQUEST_TYPE_SUGGEST,
      q: ''
    },
    noEncodeParameters: ['_br_uid_2', 'sort'],
    template: bloomreachConnector.config.autosuggest.template,
    searchPageUrl: bloomreachConnector.config.search_page_url,
    formatMoney: bloomreachConnector.config.format_money
  }
}

export const buildStaticCategoryConfigParameters = (): MandatoryCategoryConfigParameters => {
  if (!bloomreachConnector || !bloomreachConnector.config) {
    throw new Error('Bloomreach Connector config not found')
  }

  const trackingCookie =
    document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('_br_uid_2='))
      ?.replace('_br_uid_2=', '') || ''

  return {
    endpoint:
      bloomreachConnector.config.category.endpoint ||
      ENDPOINT_PRODUCT_CATEGORY_API,
    isEnabled: bloomreachConnector.config.category.enabled,
    areFacetsIncluded: bloomreachConnector.config.category.facets_included,
    infiniteScroll: bloomreachConnector.config.category.infinite_scroll,
    isCategoryPage: bloomreachConnector.config.category.is_category_page,
    itemsPerPage: bloomreachConnector.config.category.items_per_page,
    initialNumberOfFacetValues:
      bloomreachConnector.config.category.initial_number_of_facet_values,
    initialNumberOfFacets:
      bloomreachConnector.config.category.initial_number_of_facets,
    areVariantsDisplayed: bloomreachConnector.config.category.display_variants,
    selector: bloomreachConnector.config.category.selector,
    defaultSearchParameter: bloomreachConnector.config.default_search_parameter,
    sortingOptions: bloomreachConnector.config.category.sorting_options.sort(
      (option1: {value: SortByOptions}) => (option1.value === '' ? -1 : 1)
    ),
    urlParameters: {
      account_id: bloomreachConnector.config.account_id,
      domain_key: bloomreachConnector.config.domain_key,
      request_id: generateRequestId(),
      _br_uid_2: trackingCookie,
      ref_url: window.location.href,
      url: window.location.href,
      auth_key: bloomreachConnector.config.auth_key,
      request_type: REQUEST_TYPE_SEARCH,
      search_type: SEARCH_TYPE_CATEGORY,
      fl: bloomreachConnector.config.category.fields || FIELD_LIST_DEFAULT,
      rows: bloomreachConnector.config.category.items_per_page,
      start: DEFAULT_START,
      q: '',
      'facet.range': 'price',
      'stats.field': 'price'
    },
    displayVariants: bloomreachConnector.config.category.display_variants,
    categoryId: bloomreachConnector.config.category.category_id,
    template: bloomreachConnector.config.category.template,
    productListTemplate:
      bloomreachConnector.config.category.product_list_template,
    noEncodeParameters: ['_br_uid_2', 'sort', 'fq'],
    formatMoney: bloomreachConnector.config.format_money
  }
}

export const buildStaticProductSearchConfigParameters = (): MandatoryProductSearchConfigParameters => {
  if (!bloomreachConnector || !bloomreachConnector.config) {
    throw new Error('Bloomreach Connector config not found')
  }

  const trackingCookie =
    document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('_br_uid_2='))
      ?.replace('_br_uid_2=', '') || ''

  return {
    endpoint:
      bloomreachConnector.config.search.endpoint || ENDPOINT_PRODUCT_SEARCH_API,
    isEnabled: bloomreachConnector.config.search.enabled,
    areFacetsIncluded: bloomreachConnector.config.search.facets_included,
    infiniteScroll: bloomreachConnector.config.search.infinite_scroll,
    isSearchPage: bloomreachConnector.config.search.is_search_page,
    itemsPerPage: bloomreachConnector.config.search.items_per_page,
    initialNumberOfFacetValues:
      bloomreachConnector.config.search.initial_number_of_facet_values,
    initialNumberOfFacets:
      bloomreachConnector.config.search.initial_number_of_facets,
    areVariantsDisplayed: bloomreachConnector.config.search.display_variants,
    selector: bloomreachConnector.config.search.selector,
    defaultSearchParameter: bloomreachConnector.config.default_search_parameter,
    sortingOptions: bloomreachConnector.config.search.sorting_options.sort(
      (option1: {value: SortByOptions}) => (option1.value === '' ? -1 : 1)
    ),
    urlParameters: {
      account_id: bloomreachConnector.config.account_id,
      domain_key: bloomreachConnector.config.domain_key,
      request_id: generateRequestId(),
      _br_uid_2: trackingCookie,
      ref_url: window.location.href,
      url: window.location.href,
      auth_key: bloomreachConnector.config.auth_key,
      request_type: REQUEST_TYPE_SEARCH,
      search_type: SEARCH_TYPE_KEYWORD,
      fl: bloomreachConnector.config.search.fields || FIELD_LIST_DEFAULT,
      rows: bloomreachConnector.config.search.items_per_page,
      start: DEFAULT_START,
      q: '',
      'facet.range': 'price',
      'stats.field': 'price'
    },
    displayVariants: bloomreachConnector.config.search.display_variants,
    noEncodeParameters: ['_br_uid_2', 'sort', 'fq'],
    template: bloomreachConnector.config.search.template,
    productListTemplate:
      bloomreachConnector.config.search.product_list_template,
    searchPageUrl: bloomreachConnector.config.search_page_url,
    formatMoney: bloomreachConnector.config.format_money
  }
}

const commonWidgetUrlParameters = () => {
  const trackingCookie =
    document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('_br_uid_2='))
      ?.replace('_br_uid_2=', '') || ''

  return {
    account_id: bloomreachConnector.config.account_id,
    domain_key: bloomreachConnector.config.domain_key,
    request_id: generateRequestId(),
    _br_uid_2: trackingCookie,
    ref_url: window.location.href,
    url: window.location.href,
    rows: PAGE_SIZE_DEFAULT,
    start: DEFAULT_START,
    fields: bloomreachConnector.config.widget_fields || FIELD_LIST_WIDGETS
  }
}

export const buildStaticWidgetConfigParameters = (parameters: {
  type: WidgetTypes
  id: string
  numberOfItemsToShow: number
}): MandatoryPathwaysAndRecommendationsConfigParameters => {
  if (!bloomreachConnector || !bloomreachConnector.config) {
    throw new Error('Bloomreach Connector config not found')
  }

  const {type, id, numberOfItemsToShow} = parameters

  return {
    endpoint: `${
      bloomreachConnector.config.widget_endpoint || ENDPOINT_WIDGETS_API
    }${type}/${id}`,
    type,
    id,
    numberOfItemsToShow,
    urlParameters: commonWidgetUrlParameters(),
    formatMoney: bloomreachConnector.config.format_money
  }
}

// COMMON
// Mobile/Tablet breakpoints
export const mobileView = window.matchMedia(
  `(max-width: ${breakpoints.medium})`
)
export const tabletView = window.matchMedia(
  `(min-width:${breakpoints.medium}) and (max-width: ${breakpoints.xlarge})`
)
