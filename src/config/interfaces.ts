export interface CommonUrlParameters {
  account_id: string
  domain_key: string
  request_id: number
  _br_uid_2: string
  ref_url: string
  url: string
  sort?: SortByOptions
}

export interface UrlParametersToNotEncode {
  _br_uid_2: string
  fq: string
  sort?: SortByOptions
}

export interface CommonConfigParameters {
  endpoint: string
  urlParameters: CommonUrlParameters
  noEncodeParameters?: Array<keyof UrlParametersToNotEncode>
  formatMoney?: (priceInCents: number) => string
}

export type SortByOptions =
  | ''
  | 'price+asc'
  | 'price+desc'
  | 'sale_price+asc'
  | 'sale_price+desc'
  | 'title+asc'
  | 'title+desc'

export type WidgetTypes =
  | 'category'
  | 'keyword'
  | 'item'
  | 'personalized'
  | 'global'

export interface MandatoryAutosuggestUrlParameters extends CommonUrlParameters {
  auth_key: string
  q: string
  request_type: string
}

export interface MandatoryAutosuggestConfigParameters
  extends CommonConfigParameters {
  isEnabled: boolean
  numberOfTerms: number
  numberOfProducts: number
  numberOfCollections: number
  selector: string
  urlParameters: MandatoryAutosuggestUrlParameters
  searchPageUrl: string
  defaultSearchParameter: string
  template?: string
}

export interface AutosuggestConfigParameters {
  q: string
}

export interface MandatoryCategoryUrlParameters extends CommonUrlParameters {
  auth_key: string
  request_type: string
  search_type: string
  q: string
  fl: string
  rows: number
  start: number
  sort?: SortByOptions
  fq?: string
  'facet.range'?: string
  'stats.field'?: string
  brSeg?: string
  segment?: string
}

export interface MandatoryCategoryConfigParameters
  extends CommonConfigParameters {
  isEnabled: boolean
  itemsPerPage: number
  areFacetsIncluded: boolean
  infiniteScroll: boolean
  initialNumberOfFacets: number
  initialNumberOfFacetValues: number
  selector: string
  isCategoryPage: boolean
  defaultSearchParameter: string
  sortingOptions: Array<{label: string; value: SortByOptions}>
  areVariantsDisplayed: boolean
  urlParameters: MandatoryCategoryUrlParameters
  displayVariants: boolean
  categoryId?: string
  template?: string
  productListTemplate?: string
}

export interface CategoryConfigParameters {
  q: string
  rows?: number
  start?: number
  fq?: string
  sort?: SortByOptions
  brSeg?: string
  segment?: string
}

export interface MandatoryProductSearchUrlParameters
  extends CommonUrlParameters {
  auth_key: string
  request_type: string
  search_type: string
  q: string
  fl: string
  rows: number
  start: number
  sort?: SortByOptions
  fq?: string
  'facet.range'?: string
  'stats.field'?: string
  brSeg?: string
  segment?: string
}

export interface MandatoryProductSearchConfigParameters
  extends CommonConfigParameters {
  isEnabled: boolean
  itemsPerPage: number
  areFacetsIncluded: boolean
  infiniteScroll: boolean
  initialNumberOfFacets: number
  initialNumberOfFacetValues: number
  selector: string
  isSearchPage: boolean
  areVariantsDisplayed: boolean
  defaultSearchParameter: string
  sortingOptions: Array<{label: string; value: SortByOptions}>
  urlParameters: MandatoryProductSearchUrlParameters
  displayVariants: boolean
  searchPageUrl: string
  template?: string
  productListTemplate?: string
}

export interface ProductSearchConfigParameters {
  q: string
  rows?: number
  start?: number
  sort?: SortByOptions
  fq?: string
  brSeg?: string
  segment?: string
}

export interface MandatoryPathwaysAndRecommendationsUrlParameters
  extends CommonUrlParameters {
  fields: string
  rows: number
  start: number
  brSeg?: string
}

export interface MandatoryCategoryWidgetUrlParameters
  extends MandatoryPathwaysAndRecommendationsUrlParameters {
  cat_id: string
}

export interface MandatoryKeywordWidgetUrlParameters
  extends MandatoryPathwaysAndRecommendationsUrlParameters {
  query: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MandatoryGlobalWidgetUrlParameters
  extends MandatoryPathwaysAndRecommendationsUrlParameters {}

export interface MandatoryPersonalizedWidgetUrlParameters
  extends MandatoryPathwaysAndRecommendationsUrlParameters {
  user_id: string
}

export interface MandatoryItemWidgetUrlParameters
  extends MandatoryPathwaysAndRecommendationsUrlParameters {
  item_ids: string[]
}

export type MandatoryPathwaysAndRecommendationsConfigParameters =
  | MandatoryCategoryWidgetConfigParameters
  | MandatoryKeywordWidgetConfigParameters
  | MandatoryGlobalWidgetConfigParameters
  | MandatoryPersonalizedWidgetConfigParameters
  | MandatoryItemWidgetConfigParameters

export interface MandatoryCategoryWidgetConfigParameters
  extends CommonConfigParameters {
  type: WidgetTypes
  id: string
  numberOfItemsToShow: number
  urlParameters: MandatoryCategoryWidgetUrlParameters
}

export interface MandatoryKeywordWidgetConfigParameters
  extends CommonConfigParameters {
  type: WidgetTypes
  id: string
  numberOfItemsToShow: number
  urlParameters: MandatoryKeywordWidgetUrlParameters
}

export interface MandatoryGlobalWidgetConfigParameters
  extends CommonConfigParameters {
  type: WidgetTypes
  id: string
  numberOfItemsToShow: number
  urlParameters: MandatoryGlobalWidgetUrlParameters
}

export interface MandatoryPersonalizedWidgetConfigParameters
  extends CommonConfigParameters {
  type: WidgetTypes
  id: string
  numberOfItemsToShow: number
  urlParameters: MandatoryPersonalizedWidgetUrlParameters
}

export interface MandatoryItemWidgetConfigParameters
  extends CommonConfigParameters {
  type: WidgetTypes
  id: string
  numberOfItemsToShow: number
  urlParameters: MandatoryItemWidgetUrlParameters
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CategoryWidgetConfigParameters {
  numberOfItemsToFetch: number
  type: WidgetTypes
  id: string
  numberOfItemsToShow: number
  categoryId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface KeywordWidgetConfigParameters {
  numberOfItemsToFetch: number
  type: WidgetTypes
  id: string
  numberOfItemsToShow: number
  query: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GlobalWidgetConfigParameters {
  numberOfItemsToFetch: number
  type: WidgetTypes
  id: string
  numberOfItemsToShow: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PersonalizedWidgetConfigParameters {
  numberOfItemsToFetch: number
  type: WidgetTypes
  id: string
  numberOfItemsToShow: number
  userId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ItemWidgetConfigParameters {
  numberOfItemsToFetch: number
  type: WidgetTypes
  id: string
  numberOfItemsToShow: number
  itemIds: string[]
}
