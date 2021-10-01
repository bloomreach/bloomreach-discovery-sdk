import {AutosuggestApiResponseV2} from './interfaces/api-response-v2'
import {AutosuggestData} from './interfaces/autosuggest-data'
import {AutosuggestConfig} from '../../../config/autosuggest'

export class AutosuggestMapper {
  static buildFromV2Response(
    responseData: AutosuggestApiResponseV2,
    config: AutosuggestConfig
  ): AutosuggestData {
    return {
      ...(responseData.response.q
        ? {originalQuery: responseData.response.q}
        : {}),
      terms: [
        ...(responseData.response.suggestions
          ? responseData.response.suggestions.map((term) => ({
              ...term,
              text: term.q,
              displayText: term.dq,
              link: `${config.get('searchPageUrl')}?${config.get(
                'defaultSearchParameter'
              )}=${encodeURIComponent(term.q)}`,
              ...(term.filters
                ? {
                    categories: term.filters
                      .map((category) => ({
                        ...category,
                        name: category.name,
                        value: category.value,
                        type: category.key
                      }))
                      .slice(0, config.get('numberOfCollections'))
                  }
                : {})
            }))
          : [])
      ].slice(0, config.get('numberOfTerms')),
      productSuggestions: [
        ...(responseData.response.products
          ? responseData.response.products.map((product) => ({
              ...product,
              id: product.pid,
              image: product.thumb_image,
              title: product.title,
              link: product.url,
              final_price: (!Number.isNaN(product.sale_price)
                ? product.sale_price
                : !Number.isNaN(product.price)
                ? product.price
                : '0') as number,
              ...('price' in product && 'sale_price' in product
                ? {original_price: product.price}
                : {})
            }))
          : [])
      ].slice(0, config.get('numberOfProducts')),
      config
    }
  }
}
