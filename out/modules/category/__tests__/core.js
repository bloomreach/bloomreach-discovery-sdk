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
require("../../../../test/matchmedia-mock");
const core_1 = require("../../core");
const utils_1 = require("ts-jest/utils");
const config_1 = require("../../../config");
const mapper_1 = require("../../../utils/object-mappers/category/mapper");
beforeEach(() => {
    jest.resetAllMocks();
});
test('API core prepares category data correctly', () => __awaiter(void 0, void 0, void 0, function* () {
    const exampleConfigParameters = {
        example: 'parameters'
    };
    const exampleConfig = { example: 'config' };
    const exampleApiResponse = 'example API response';
    jest.spyOn(config_1.CategoryConfig, 'build');
    utils_1.mocked(config_1.CategoryConfig.build).mockReturnValue(exampleConfig);
    jest.spyOn(core_1.ApiCore, 'fetch');
    utils_1.mocked(core_1.ApiCore.fetch).mockResolvedValue(exampleApiResponse);
    jest.spyOn(mapper_1.CategoryMapper, 'buildFromV2Response');
    utils_1.mocked(mapper_1.CategoryMapper.buildFromV2Response).mockImplementation(() => ({}));
    yield core_1.ApiCore.getCategoryData(exampleConfigParameters);
    expect(config_1.CategoryConfig.build).toHaveBeenCalledTimes(1);
    expect(config_1.CategoryConfig.build).toHaveBeenCalledWith(exampleConfigParameters);
    expect(core_1.ApiCore.fetch).toHaveBeenCalledTimes(1);
    expect(core_1.ApiCore.fetch).toHaveBeenCalledWith(exampleConfig);
    expect(mapper_1.CategoryMapper.buildFromV2Response).toHaveBeenCalledTimes(1);
    expect(mapper_1.CategoryMapper.buildFromV2Response).toHaveBeenCalledWith(exampleApiResponse, exampleConfig);
}));
