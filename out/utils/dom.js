"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomUtils = void 0;
class DomUtils {
    static updateUrl(urlParameters) {
        const historyStateObject = {};
        for (const pair of urlParameters.entries()) {
            historyStateObject[pair[0]] = pair[1];
        }
        window.history.pushState(historyStateObject, document.title, `?${urlParameters.toString()}`);
    }
    static updateMultipleInstanceParametersInUrl(parameterName, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parameters, userOptions) {
        const defaultOptions = {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            valueSerializer: (parameterValue) => parameterValue.toString(),
            nameValueSeparator: ':'
        };
        const options = Object.assign(Object.assign({}, defaultOptions), userOptions);
        const urlParameters = new URLSearchParams(window.location.search);
        urlParameters.delete(parameterName);
        if (Array.isArray(parameters)) {
            parameters.forEach((value) => {
                urlParameters.append(parameterName, options.valueSerializer(value));
            });
        }
        else {
            Object.keys(parameters).forEach((key) => {
                urlParameters.append(parameterName, `${key}${options.nameValueSeparator}${options.valueSerializer(parameters[key])}`);
            });
        }
        DomUtils.updateUrl(urlParameters);
    }
    static updateParameterInUrl(parameterName, newValue) {
        const urlParameters = new URLSearchParams(window.location.search);
        if (typeof newValue === 'function') {
            urlParameters.set(parameterName, newValue(urlParameters.get(parameterName)));
        }
        else {
            if (newValue === '') {
                urlParameters.delete(parameterName);
            }
            else {
                urlParameters.set(parameterName, newValue);
            }
        }
        DomUtils.updateUrl(urlParameters);
    }
    static incrementParameterInUrl(parameterName) {
        DomUtils.updateParameterInUrl(parameterName, (oldValue) => {
            if (!oldValue)
                return '2';
            let newValue = Number.parseInt(oldValue);
            return (++newValue).toString();
        });
    }
    static decrementParameterInUrl(parameterName) {
        DomUtils.updateParameterInUrl(parameterName, (oldValue) => {
            if (!oldValue)
                return '1';
            let newValue = Number.parseInt(oldValue);
            return (--newValue).toString();
        });
    }
    static findUpElementWithClassName(startElement, className) {
        var _a;
        let element = startElement;
        while (element && element.parentNode) {
            element = element.parentNode;
            if (element && ((_a = element.classList) === null || _a === void 0 ? void 0 : _a.contains(className))) {
                return element;
            }
        }
        return null;
    }
    static findUpElementByTagName(startElement, tagName) {
        let element = startElement;
        while (element && element.parentNode) {
            element = element.parentNode;
            if (element &&
                element.tagName.toLowerCase() === tagName.toLowerCase()) {
                return element;
            }
        }
        return null;
    }
}
exports.DomUtils = DomUtils;
