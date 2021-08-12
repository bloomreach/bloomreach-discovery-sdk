import {CategoryApiResponseV2, Doc} from './interfaces/api-response-v2'
import {Product, CategoryData, Variant} from './interfaces/category-data'
import {CategoryConfig} from '../../../config/category'

export class CategoryMapper {
  static buildFromV2Response(
    responseData: CategoryApiResponseV2,
    config: CategoryConfig
  ): CategoryData {
    return {
      facets: Object.entries(responseData.facet_counts.facet_fields).map(
        (fieldName) => {
          return {
            original_title: fieldName[0],
            title: fieldName[0]
              .replace('_', ' ')
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            section: fieldName[1].map((section: any) => {
              if (section.name === 'true') {
                section.name = 'Yes'
              } else if (section.name === 'false') {
                section.name = 'No'
              }
              return {
                count: section.count,
                name: section.cat_name || section.name,
                id: section.cat_id || section.name
              }
            })
          }
        }
      ),
      ...(responseData.facet_counts.facet_ranges.price
        ? {
            priceRanges: responseData.facet_counts.facet_ranges.price.map(
              (range) => ({
                count: range.count,
                start: range.start,
                end: range.end
              })
            )
          }
        : {}),
      products: responseData.response.docs.reduce(
        (allProducts, currentProduct) => {
          return [
            ...allProducts,
            ...((config.get('displayVariants')
              ? CategoryMapper.extractVariants(currentProduct)
              : [
                  CategoryMapper.transformProductResponseToProductData(
                    currentProduct
                  )
                ]) as Product[])
          ]
        },
        [] as Product[]
      ),
      number_of_results: responseData.response.numFound,
      start: responseData.response.start,
      config
    }
  }

  private static extractVariants(productResponse: Doc): Product[] {
    if (!productResponse.variants || !productResponse.variants.length) {
      return [
        CategoryMapper.transformProductResponseToProductData(productResponse)
      ]
    }

    return (CategoryMapper.transformProductResponseToProductData(
      productResponse
    ).variants as Array<Variant>).map((variant) => ({
      ...CategoryMapper.transformProductResponseToProductData(productResponse),
      ...variant
    }))
  }

  private static transformProductResponseToProductData(
    productResponse: Doc
  ): Product {
    return {
      title: productResponse.title,
      image: productResponse.thumb_image,
      link: productResponse.url,
      id: productResponse.pid,
      price: productResponse.price,
      final_price: productResponse.sale_price,
      ...(productResponse.variants
        ? {
            variants: productResponse.variants.map((variant) => ({
              sku_color_group: variant.sku_color_group,
              sku_swatch_images: variant.sku_swatch_images,
              sku_thumb_images: variant.sku_thumb_images,
              image:
                variant.sku_thumb_images &&
                Array.isArray(variant.sku_thumb_images)
                  ? variant.sku_thumb_images[0]
                  : variant.sku_swatch_images[0],
              variant_name: variant.sku_color_group
            }))
          }
        : {})
    }
  }
}
