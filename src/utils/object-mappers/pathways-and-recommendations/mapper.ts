import {WidgetConfig} from '../../../config'
import {PathwaysAndRecommendationsApiResponseV2} from './interfaces/api-response-v2'
import {PathwaysAndRecommendationsData} from './interfaces/pathways-and-recommendations-data'

export class PathwaysAndRecommendationsMapper {
  static buildFromV2Response(
    responseData: PathwaysAndRecommendationsApiResponseV2,
    config: WidgetConfig
  ): PathwaysAndRecommendationsData {
    return {
      config,
      products: [
        ...(responseData.response.docs
          ? responseData.response.docs.map((product) => ({
              ...product,
              id: product.pid,
              image: product.thumb_image,
              title: product.title,
              link: product.url,
              final_price: product.sale_price,
              price: product.price
            }))
          : [])
      ],
      widgetMetadata: responseData.metadata.widget
    }
  }
}
