"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./autosuggest/module");
window.BloomreachModules = Object.assign(Object.assign({}, (window.BloomreachModules ? window.BloomreachModules : {})), { autosuggest: module_1.AutosuggestModule });
module_1.AutosuggestModule.load();
