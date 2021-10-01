"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConfig = void 0;
class BaseConfig {
    constructor(data) {
        this.get = (key) => {
            return this.data[key];
        };
        this.getUrlParameter = (key) => {
            return this.data.urlParameters[key];
        };
        this.getAll = () => {
            return this.data;
        };
        this.set = (newData) => {
            this.data = Object.assign(Object.assign({}, this.data), newData);
        };
        this.buildQueryParameters = () => `?${Object.keys(this.data.urlParameters)
            .reduce((queryParameters, parameterName) => {
            var _a;
            return [
                ...queryParameters,
                `${parameterName}=${((_a = this.data.noEncodeParameters) !== null && _a !== void 0 ? _a : []).includes(parameterName)
                    ? this.getUrlParameter(parameterName)
                    : encodeURIComponent(this.getUrlParameter(parameterName))}`
            ];
        }, [])
            .join('&')}`;
        this.data = data;
    }
}
exports.BaseConfig = BaseConfig;
