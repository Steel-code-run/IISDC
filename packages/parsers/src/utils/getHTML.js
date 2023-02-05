"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHTML = void 0;
const needle_1 = __importDefault(require("needle"));
const jsdom_1 = require("jsdom");
function getHTML(url) {
    return (0, needle_1.default)('get', url).then((res) => {
        return new jsdom_1.JSDOM(res.body);
    });
}
exports.getHTML = getHTML;
