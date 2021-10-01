"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCore = void 0;
const config_1 = require("../config");
const mapper_1 = require("../utils/object-mappers/autosuggest/mapper");
const mapper_2 = require("../utils/object-mappers/category/mapper");
const mapper_3 = require("../utils/object-mappers/pathways-and-recommendations/mapper");
const mapper_4 = require("../utils/object-mappers/product-search/mapper");
class ApiCore {
    static fetch(apiConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawResults = yield fetch(`${apiConfig.get('endpoint')}${apiConfig.buildQueryParameters()}`);
            return yield rawResults.json();
        });
    }
    static getAutosuggestData(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const autoSuggestConfig = config_1.AutosuggestConfig.build(parameters);
            const apiResponse = yield ApiCore.fetch(autoSuggestConfig);
            return mapper_1.AutosuggestMapper.buildFromV2Response(apiResponse, autoSuggestConfig);
        });
    }
    static getProductSearchData(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const productSearchConfig = config_1.ProductSearchConfig.build(parameters);
            const apiResponse = yield ApiCore.fetch(productSearchConfig);
            return mapper_4.ProductSearchMapper.buildFromV2Response(apiResponse, productSearchConfig);
        });
    }
    static getCategoryData(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryConfig = config_1.CategoryConfig.build(parameters);
            const apiResponse = yield ApiCore.fetch(categoryConfig);
            return mapper_2.CategoryMapper.buildFromV2Response(apiResponse, categoryConfig);
        });
    }
    static getWidgetData(widgetConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiResponse = yield ApiCore.fetch(widgetConfig);
            return mapper_3.PathwaysAndRecommendationsMapper.buildFromV2Response(apiResponse, widgetConfig);
        });
    }
}
exports.ApiCore = ApiCore;
