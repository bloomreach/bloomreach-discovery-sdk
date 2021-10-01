"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryConfig = void 0;
const base_config_1 = require("./base-config");
const common_1 = require("./common");
class CategoryConfig extends base_config_1.BaseConfig {
    constructor() {
        super(...arguments);
        this.getUrlParameter = (key) => {
            return this.data.urlParameters[key];
        };
    }
    static build(parameters) {
        const configParameters = common_1.buildStaticCategoryConfigParameters();
        configParameters.urlParameters = Object.assign(Object.assign({}, configParameters.urlParameters), parameters);
        return new CategoryConfig(configParameters);
    }
}
exports.CategoryConfig = CategoryConfig;
