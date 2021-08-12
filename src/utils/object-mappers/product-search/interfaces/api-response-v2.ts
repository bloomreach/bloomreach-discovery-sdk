export interface ProductSearchApiResponseV2 {
  response: Response
  facet_counts: FacetCounts
  category_map: {[key: string]: string}
  autoCorrectQuery?: string
  did_you_mean?: string[]
  keywordRedirect?: Keywords
  metadata?: Metadata
}

export interface Keywords {
  'redirected query': string
  'redirected url': string
}

export interface FacetCounts {
  facet_ranges: FacetRange
  facet_fields: FacetFields
  facet_queries: Facet
}

export interface FacetFields {
  category: Category[]
  sizes: string[]
  brand: any[]
  colors: OnlineOnly[]
  color_groups: OnlineOnly[]
}

export interface OnlineOnly {
  count: number
  name: string
}

export interface Category {
  count: number
  crumb: string
  cat_name: string
  parent: string
  cat_id: string
  tree_path: string
}

export interface Facet {} // eslint-disable-line @typescript-eslint/no-empty-interface

export interface Metadata {
  query: Query
}

export interface Query {
  modification: Modification
  didYouMean: string[]
}

export interface Modification {
  mode: string
  value: string
}

export interface Response {
  numFound: number
  start: number
  docs: Doc[]
}

export interface Doc {
  sale_price: number
  price: number
  description: string
  title: string
  url: string
  brand: string
  pid: string
  thumb_image: string
  sale_price_range: number[]
  price_range: number[]
  variants: Variant[]
  promotions?: string[]
}

export interface Variant {
  sku_color_group: string
  sku_swatch_images: string[]
  sku_thumb_images: string[]
}

export interface FacetRange {
  price?: PriceRange[]
}

export interface PriceRange {
  count: number
  start: string
  end: string
}
