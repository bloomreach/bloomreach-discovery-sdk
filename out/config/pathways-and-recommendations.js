"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalWidgetConfig = exports.PersonalizedWidgetConfig = exports.CategoryWidgetConfig = exports.KeywordWidgetConfig = exports.ItemWidgetConfig = exports.PathwaysAndRecommendationsConfigFactory = void 0;
const base_config_1 = require("./base-config");
const common_1 = require("./common");
class PathwaysAndRecommendationsConfigFactory extends base_config_1.BaseConfig {
    static build(widgetAttributes) {
        switch (widgetAttributes.type) {
            case 'keyword':
                return KeywordWidgetConfig.build(widgetAttributes);
            case 'category':
                return CategoryWidgetConfig.build(widgetAttributes);
            case 'item':
                return ItemWidgetConfig.build(widgetAttributes);
            case 'personalized':
                return PersonalizedWidgetConfig.build(widgetAttributes);
            case 'global':
                return GlobalWidgetConfig.build(widgetAttributes);
            default:
                throw new Error(`Invalid widget type: "${widgetAttributes.type}"`);
        }
    }
}
exports.PathwaysAndRecommendationsConfigFactory = PathwaysAndRecommendationsConfigFactory;
class ItemWidgetConfig extends base_config_1.BaseConfig {
    static build(parameters) {
        const configParameters = Object.assign({}, common_1.buildStaticWidgetConfigParameters(parameters));
        configParameters.urlParameters = Object.assign(Object.assign({}, configParameters.urlParameters), { rows: parameters.numberOfItemsToFetch, item_ids: parameters.itemIds });
        return new ItemWidgetConfig(configParameters);
    }
}
exports.ItemWidgetConfig = ItemWidgetConfig;
class KeywordWidgetConfig extends base_config_1.BaseConfig {
    static build(parameters) {
        const configParameters = Object.assign({}, common_1.buildStaticWidgetConfigParameters(parameters));
        configParameters.urlParameters = Object.assign(Object.assign({}, configParameters.urlParameters), { rows: parameters.numberOfItemsToFetch, query: parameters.query });
        return new KeywordWidgetConfig(configParameters);
    }
}
exports.KeywordWidgetConfig = KeywordWidgetConfig;
class CategoryWidgetConfig extends base_config_1.BaseConfig {
    static build(parameters) {
        const configParameters = Object.assign({}, common_1.buildStaticWidgetConfigParameters(parameters));
        configParameters.urlParameters = Object.assign(Object.assign({}, configParameters.urlParameters), { rows: parameters.numberOfItemsToFetch, cat_id: parameters.categoryId });
        return new CategoryWidgetConfig(configParameters);
    }
}
exports.CategoryWidgetConfig = CategoryWidgetConfig;
class PersonalizedWidgetConfig extends base_config_1.BaseConfig {
    static build(parameters) {
        const configParameters = Object.assign({}, common_1.buildStaticWidgetConfigParameters(parameters));
        configParameters.urlParameters = Object.assign(Object.assign({}, configParameters.urlParameters), { rows: parameters.numberOfItemsToFetch, user_id: parameters.userId });
        return new PersonalizedWidgetConfig(configParameters);
    }
}
exports.PersonalizedWidgetConfig = PersonalizedWidgetConfig;
class GlobalWidgetConfig extends base_config_1.BaseConfig {
    static build(parameters) {
        const configParameters = Object.assign({}, common_1.buildStaticWidgetConfigParameters(parameters));
        configParameters.urlParameters = Object.assign(Object.assign({}, configParameters.urlParameters), { rows: parameters.numberOfItemsToFetch });
        return new GlobalWidgetConfig(configParameters);
    }
}
exports.GlobalWidgetConfig = GlobalWidgetConfig;
