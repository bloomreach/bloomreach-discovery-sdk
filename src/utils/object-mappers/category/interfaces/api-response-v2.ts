export interface CategoryApiResponseV2 {
  response: Response
  facet_counts: FacetCounts
  category_map: {[key: string]: string}
}

export interface FacetCounts {
  facet_ranges: FacetRange
  facet_fields: FacetFields
  facet_queries: Facet
}

export interface FacetFields {
  category: Category[]
  sizes: OnlineOnly[]
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

export interface Response {
  numFound: number
  start: number
  docs: Doc[]
}

export interface Doc {
  sale_price: number
  price: number
  title: string
  brand: string
  sizes: string[]
  pid: string
  url: string
  thumb_image: string
  colors?: string[]
  sale_price_range: number[]
  price_range: number[]
  variants: Variant[]
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
