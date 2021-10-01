"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutosuggestConfig = void 0;
const base_config_1 = require("./base-config");
const common_1 = require("./common");
class AutosuggestConfig extends base_config_1.BaseConfig {
    static build(parameters) {
        const configParameters = common_1.buildStaticAutosuggestConfigParameters();
        configParameters.urlParameters = Object.assign(Object.assign({}, configParameters.urlParameters), parameters);
        return new AutosuggestConfig(configParameters);
    }
}
exports.AutosuggestConfig = AutosuggestConfig;
