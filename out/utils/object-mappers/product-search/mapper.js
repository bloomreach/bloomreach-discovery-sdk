"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSearchMapper = void 0;
class ProductSearchMapper {
    static buildFromV2Response(responseData, config) {
        return Object.assign(Object.assign(Object.assign({ facets: Object.entries(responseData.facet_counts.facet_fields).map((fieldName) => {
                return {
                    original_title: fieldName[0],
                    title: fieldName[0]
                        .replace('_', ' ')
                        .replace(/\b\w/g, (l) => l.toUpperCase()),
                    section: fieldName[1].map((section) => {
                        if (section.name === 'true') {
                            section.name = 'Yes';
                        }
                        else if (section.name === 'false') {
                            section.name = 'No';
                        }
                        return {
                            count: section.count,
                            name: section.cat_name || section.name,
                            id: section.cat_id || section.name
                        };
                    })
                };
            }) }, (responseData.facet_counts.facet_ranges.price
            ? {
                priceRanges: responseData.facet_counts.facet_ranges.price.map((range) => ({
                    count: range.count,
                    start: range.start,
                    end: range.end
                }))
            }
            : {})), { products: responseData.response.docs.reduce((allProducts, currentProduct) => {
                return [
                    ...allProducts,
                    ...(config.get('displayVariants')
                        ? ProductSearchMapper.extractVariants(currentProduct)
                        : [
                            ProductSearchMapper.transformProductResponseToProductData(currentProduct)
                        ])
                ];
            }, []), did_you_mean: responseData.did_you_mean || [], number_of_results: responseData.response.numFound, start: responseData.response.start, config }), (responseData.keywordRedirect
            ? {
                keywordRedirect: {
                    redirected_query: responseData.keywordRedirect['redirected query'],
                    redirected_url: responseData.keywordRedirect['redirected url']
                }
            }
            : {}));
    }
    static extractVariants(productResponse) {
        if (!productResponse.variants || !productResponse.variants.length) {
            return [
                ProductSearchMapper.transformProductResponseToProductData(productResponse)
            ];
        }
        return ProductSearchMapper.transformProductResponseToProductData(productResponse).variants.map((variant) => (Object.assign(Object.assign({}, ProductSearchMapper.transformProductResponseToProductData(productResponse)), variant)));
    }
    static transformProductResponseToProductData(productResponse) {
        return Object.assign(Object.assign(Object.assign({}, productResponse), { title: productResponse.title, image: productResponse.thumb_image, link: productResponse.url, id: productResponse.pid, price: productResponse.price, final_price: productResponse.sale_price }), (productResponse.variants
            ? {
                variants: productResponse.variants.map((variant) => (Object.assign(Object.assign({}, variant), { sku_color_group: variant.sku_color_group, sku_swatch_images: variant.sku_swatch_images, sku_thumb_images: variant.sku_thumb_images, image: variant.sku_thumb_images &&
                        Array.isArray(variant.sku_thumb_images)
                        ? variant.sku_thumb_images[0]
                        : variant.sku_swatch_images[0], variant_name: variant.sku_color_group })))
            }
            : {}));
    }
}
exports.ProductSearchMapper = ProductSearchMapper;
