"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRequestId = void 0;
const generateRequestId = () => Math.floor(Math.pow(10, 12) + Math.random() * Math.pow(10, 13));
exports.generateRequestId = generateRequestId;
