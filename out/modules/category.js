"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./category/module");
window.BloomreachModules = Object.assign(Object.assign({}, (window.BloomreachModules ? window.BloomreachModules : {})), { category: module_1.CategoryModule });
module_1.CategoryModule.load();
