import {
  AutosuggestConfig,
  CategoryConfig,
  ProductSearchConfig,
  WidgetConfig
} from '../config'
import {
  AutosuggestConfigParameters,
  CategoryConfigParameters,
  ProductSearchConfigParameters
} from '../config/interfaces'
import {AutosuggestApiResponseV2} from '../utils/object-mappers/autosuggest/interfaces/api-response-v2'
import {AutosuggestData} from '../utils/object-mappers/autosuggest/interfaces/autosuggest-data'
import {AutosuggestMapper} from '../utils/object-mappers/autosuggest/mapper'
import {CategoryApiResponseV2} from '../utils/object-mappers/category/interfaces/api-response-v2'
import {CategoryData} from '../utils/object-mappers/category/interfaces/category-data'
import {CategoryMapper} from '../utils/object-mappers/category/mapper'
import {PathwaysAndRecommendationsApiResponseV2} from '../utils/object-mappers/pathways-and-recommendations/interfaces/api-response-v2'
import {PathwaysAndRecommendationsData} from '../utils/object-mappers/pathways-and-recommendations/interfaces/pathways-and-recommendations-data'
import {PathwaysAndRecommendationsMapper} from '../utils/object-mappers/pathways-and-recommendations/mapper'
import {ProductSearchApiResponseV2} from '../utils/object-mappers/product-search/interfaces/api-response-v2'
import {ProductSearchData} from '../utils/object-mappers/product-search/interfaces/product-search-data'
import {ProductSearchMapper} from '../utils/object-mappers/product-search/mapper'

type ApiConfig =
  | AutosuggestConfig
  | CategoryConfig
  | WidgetConfig
  | ProductSearchConfig

type ApiResponse<ConfigType> = ConfigType extends AutosuggestConfig
  ? AutosuggestApiResponseV2
  : ConfigType extends CategoryConfig
  ? CategoryApiResponseV2
  : ConfigType extends WidgetConfig
  ? PathwaysAndRecommendationsApiResponseV2
  : ConfigType extends ProductSearchConfig
  ? ProductSearchApiResponseV2
  : never

export class ApiCore {
  static async fetch<Config extends ApiConfig>(
    apiConfig: Config
  ): Promise<ApiResponse<Config>> {
    const rawResults = await fetch(
      `${(apiConfig as any).get('endpoint')}${apiConfig.buildQueryParameters()}`
    )
    return await rawResults.json()
  }

  static async getAutosuggestData(
    parameters: AutosuggestConfigParameters
  ): Promise<AutosuggestData> {
    const autoSuggestConfig = AutosuggestConfig.build(parameters)
    const apiResponse = await ApiCore.fetch(autoSuggestConfig)
    return AutosuggestMapper.buildFromV2Response(apiResponse, autoSuggestConfig)
  }

  static async getProductSearchData(
    parameters: ProductSearchConfigParameters
  ): Promise<ProductSearchData> {
    const productSearchConfig = ProductSearchConfig.build(parameters)
    const apiResponse = await ApiCore.fetch(productSearchConfig)
    return ProductSearchMapper.buildFromV2Response(
      apiResponse,
      productSearchConfig
    )
  }

  static async getCategoryData(
    parameters: CategoryConfigParameters
  ): Promise<CategoryData> {
    const categoryConfig = CategoryConfig.build(parameters)
    const apiResponse = await ApiCore.fetch(categoryConfig)
    return CategoryMapper.buildFromV2Response(apiResponse, categoryConfig)
  }

  static async getWidgetData(
    widgetConfig: WidgetConfig
  ): Promise<PathwaysAndRecommendationsData> {
    const apiResponse = await ApiCore.fetch(widgetConfig)
    return PathwaysAndRecommendationsMapper.buildFromV2Response(
      apiResponse,
      widgetConfig
    )
  }
}
