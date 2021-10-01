"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathwaysAndRecommendationsMapper = void 0;
class PathwaysAndRecommendationsMapper {
    static buildFromV2Response(responseData, config) {
        return {
            config,
            products: [
                ...(responseData.response.docs
                    ? responseData.response.docs.map((product) => (Object.assign(Object.assign({}, product), { id: product.pid, image: product.thumb_image, title: product.title, link: product.url, final_price: product.sale_price, price: product.price })))
                    : [])
            ],
            widgetMetadata: responseData.metadata.widget
        };
    }
}
exports.PathwaysAndRecommendationsMapper = PathwaysAndRecommendationsMapper;
