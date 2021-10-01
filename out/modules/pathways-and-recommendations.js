"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./pathways-and-recommendations/module");
window.BloomreachModules = Object.assign(Object.assign({}, (window.BloomreachModules ? window.BloomreachModules : {})), { pathwaysRecommendations: module_1.PathwaysAndRecommendationsModule });
module_1.PathwaysAndRecommendationsModule.load();
