"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTParserResult = exports.isTPostType = exports.isTPost = void 0;
const parser_1 = require("./serial/parser");
const isTPost = (post) => (0, exports.isTPostType)(post.postType) && typeof post.postDescription === 'object';
exports.isTPost = isTPost;
const isTPostType = (postType) => Object.values(parser_1.TPostType).includes(postType);
exports.isTPostType = isTPostType;
const isTParserResult = (parserResult) => {
    return (0, exports.isTPost)(parserResult[0]);
};
exports.isTParserResult = isTParserResult;
