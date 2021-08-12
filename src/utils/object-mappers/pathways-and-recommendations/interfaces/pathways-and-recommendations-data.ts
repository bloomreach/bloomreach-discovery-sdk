import {WidgetConfig} from '../../../../config'
import {Widget} from './api-response-v2'

export interface PathwaysAndRecommendationsData {
  products: Product[]
  config: WidgetConfig
  widgetMetadata: Widget
  defaultCurrency?: string
}

export interface Product {
  title: string
  image: string
  link: string
  id: string
  price: number
  final_price: number
}
