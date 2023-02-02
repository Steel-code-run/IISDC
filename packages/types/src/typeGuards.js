"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isParserResultType = void 0;
const parser_1 = require("./serial/parser");
const isParserResultType = (type) => Object.keys(parser_1.TParserResultType).includes(type);
exports.isParserResultType = isParserResultType;
//# sourceMappingURL=typeGuards.js.map