"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCompetitionPost = exports.isInternshipPost = exports.isVacancyPost = exports.isGrantPost = exports.isTParserResult = exports.isTPostType = exports.isTPost = void 0;
const parser_1 = require("./serial/parser");
const isTPost = (post) => (0, exports.isTPostType)(post.postType) && typeof post.postDescription === 'object';
exports.isTPost = isTPost;
const isTPostType = (postType) => Object.values(parser_1.TPostType).includes(postType);
exports.isTPostType = isTPostType;
const isTParserResult = (parserResult) => {
    if (parserResult.length === 0)
        return true;
    return (0, exports.isTPost)(parserResult[0]);
};
exports.isTParserResult = isTParserResult;
const isGrantPost = (post) => post.postType === parser_1.TPostType.grant;
exports.isGrantPost = isGrantPost;
const isVacancyPost = (post) => post.postType === parser_1.TPostType.vacancy;
exports.isVacancyPost = isVacancyPost;
const isInternshipPost = (post) => post.postType === parser_1.TPostType.internship;
exports.isInternshipPost = isInternshipPost;
const isCompetitionPost = (post) => post.postType === parser_1.TPostType.competition;
exports.isCompetitionPost = isCompetitionPost;
