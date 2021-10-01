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
test('Category module builds and renders results from URL parameters', () => __awaiter(void 0, void 0, void 0, function* () {
    const module = new module_1.CategoryModule({
        template: 'the template',
        resultsContainerElement: {}
    });
    const exampleResults = {
        a: 'b',
        start: 0,
        number_of_results: 14
    };
    jest.spyOn(core_1.ApiCore, 'getCategoryData');
    utils_1.mocked(core_1.ApiCore.getCategoryData).mockResolvedValue(exampleResults);
    const config = {
        get: jest.fn().mockImplementation((key) => {
            switch (key) {
                case 'defaultSearchParameter':
                    return '_sq';
                case 'itemsPerPage':
                    return 5;
                case 'urlParameters':
                    return { q: '' };
            }
        })
    };
    const urlParams = new URLSearchParams('_sq=chaix&page=3&size=3');
    yield module.initiateSearch(urlParams, config);
    expect(core_1.ApiCore.getCategoryData).toHaveBeenCalledTimes(1);
    expect(core_1.ApiCore.getCategoryData).toHaveBeenCalledWith({
        q: 'chaix',
        rows: 3,
        start: 6 /* This is the index where the 3. page is beginning */,
        _sq: 'chaix',
        page: '3',
        size: '3'
    });
    expect(ejs_1.default.render).toHaveBeenCalledTimes(1);
    expect(ejs_1.default.render).toHaveBeenCalledWith('the template', exampleResults);
}));
