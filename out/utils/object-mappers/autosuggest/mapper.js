"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutosuggestMapper = void 0;
class AutosuggestMapper {
    static buildFromV2Response(responseData, config) {
        return Object.assign(Object.assign({}, (responseData.response.q
            ? { originalQuery: responseData.response.q }
            : {})), { terms: [
                ...(responseData.response.suggestions
                    ? responseData.response.suggestions.map((term) => (Object.assign(Object.assign(Object.assign({}, term), { text: term.q, displayText: term.dq, link: `${config.get('searchPageUrl')}?${config.get('defaultSearchParameter')}=${encodeURIComponent(term.q)}` }), (term.filters
                        ? {
                            categories: term.filters
                                .map((category) => (Object.assign(Object.assign({}, category), { name: category.name, value: category.value, type: category.key })))
                                .slice(0, config.get('numberOfCollections'))
                        }
                        : {}))))
                    : [])
            ].slice(0, config.get('numberOfTerms')), productSuggestions: [
                ...(responseData.response.products
                    ? responseData.response.products.map((product) => (Object.assign(Object.assign(Object.assign({}, product), { id: product.pid, image: product.thumb_image, title: product.title, link: product.url, final_price: (!Number.isNaN(product.sale_price)
                            ? product.sale_price
                            : !Number.isNaN(product.price)
                                ? product.price
                                : '0') }), ('price' in product && 'sale_price' in product
                        ? { original_price: product.price }
                        : {}))))
                    : [])
            ].slice(0, config.get('numberOfProducts')), config });
    }
}
exports.AutosuggestMapper = AutosuggestMapper;
