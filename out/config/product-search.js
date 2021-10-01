"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSearchConfig = void 0;
const base_config_1 = require("./base-config");
const common_1 = require("./common");
class ProductSearchConfig extends base_config_1.BaseConfig {
    constructor() {
        super(...arguments);
        this.getUrlParameter = (key) => {
            return this.data.urlParameters[key];
        };
    }
    static build(parameters) {
        const configParameters = common_1.buildStaticProductSearchConfigParameters();
        configParameters.urlParameters = Object.assign(Object.assign({}, configParameters.urlParameters), parameters);
        return new ProductSearchConfig(configParameters);
    }
}
exports.ProductSearchConfig = ProductSearchConfig;
