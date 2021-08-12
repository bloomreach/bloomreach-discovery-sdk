import {SortByOptions} from '../../../../config/interfaces'
import {CategoryConfig} from '../../../../config/category'

export interface PaginationNode {
  value: string
  label?: string
  disabled?: boolean
  active?: boolean
}
export interface CategoryData {
  facets: Facet[]
  products: Product[]
  number_of_results: number
  start: number
  config: CategoryConfig
  page?: number
  sort?: SortByOptions
  size?: number
  paginationData?: Array<PaginationNode>
  originalQuery?: string
  checkedFacets?: {[key: string]: Array<string>}
  priceRanges?: PriceRange[]
  priceRangeFacet?: {start: number; end: number; step: number}
  defaultCurrency?: string
  isFiltersPanelOpened?: boolean
  mobileView?: {matches: boolean}
  defaultMaxColorSwatches?: number
}

export interface Product {
  title: string
  image: string
  link: string
  id: string
  price: number
  final_price: number
  variants?: Variant[]
  variant_name?: string
}

export interface Facet {
  title: string
  section: Section[]
}

export interface Section {
  count: number
  name: string
  id: string
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
