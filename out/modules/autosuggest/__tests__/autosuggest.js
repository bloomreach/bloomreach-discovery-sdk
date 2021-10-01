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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = __importDefault(require("ejs"));
require("../../../../test/matchmedia-mock");
const core_1 = require("../../core");
const module_1 = require("../module");
const utils_1 = require("ts-jest/utils");
jest.mock('ejs');
beforeEach(() => {
    jest.resetAllMocks();
});
test('Autosuggest module builds and renders suggestions from query', () => __awaiter(void 0, void 0, void 0, function* () {
    const module = new module_1.AutosuggestModule({
        typedQueryTemplate: 'the typedQueryTemplate',
        template: 'the template',
        searchInputElement: {},
        searchResultsContainerElement: {
            querySelectorAll: () => []
        }
    });
    const exampleResults = { a: 'b' };
    const exampleProcessedResults = { c: 'd' };
    jest.spyOn(core_1.ApiCore, 'getAutosuggestData');
    utils_1.mocked(core_1.ApiCore.getAutosuggestData).mockResolvedValue(exampleResults);
    jest.spyOn(module, 'processResults');
    utils_1.mocked(module.processResults).mockReturnValue(exampleProcessedResults);
    yield module.suggest('example query string');
    expect(core_1.ApiCore.getAutosuggestData).toHaveBeenCalledTimes(1);
    expect(core_1.ApiCore.getAutosuggestData).toHaveBeenCalledWith({
        q: 'example query string'
    });
    expect(module.processResults).toHaveBeenCalledTimes(1);
    expect(module.processResults).toHaveBeenCalledWith(exampleResults);
    expect(ejs_1.default.render).toHaveBeenCalledTimes(1);
    expect(ejs_1.default.render).toHaveBeenCalledWith('the template', exampleProcessedResults);
}));
