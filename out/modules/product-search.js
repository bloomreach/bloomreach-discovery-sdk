"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./product-search/module");
window.BloomreachModules = Object.assign(Object.assign({}, (window.BloomreachModules ? window.BloomreachModules : {})), { search: module_1.ProductSearchModule });
module_1.ProductSearchModule.load();
