import {AutosuggestConfig} from '../../../../config'

export interface AutosuggestData {
  originalQuery?: string
  terms: Term[]
  productSuggestions: ProductSuggestion[]
  config?: AutosuggestConfig
  defaultCurrency?: string
}

export interface ProductSuggestion {
  id: string
  image: string
  title: string
  link: string
  final_price: number
  original_price?: number
}

export interface Term {
  text: string
  displayText: string
  categories?: Category[]
  processedText?: string
}

export interface Category {
  name: string
  value: string
  type: string
}
