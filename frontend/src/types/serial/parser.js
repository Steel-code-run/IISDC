"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TPostType = exports.TParserType = void 0;
var TParserType;
(function (TParserType) {
    TParserType["nodejs"] = "nodejs";
    TParserType["python"] = "python";
})(TParserType = exports.TParserType || (exports.TParserType = {}));
var TPostType;
(function (TPostType) {
    // грант
    TPostType["grant"] = "grant";
    // вакансия
    TPostType["vacancy"] = "vacancy";
    // стажировка
    TPostType["internship"] = "internship";
    // школьная олимпиада
    TPostType["competition"] = "competition";
})(TPostType = exports.TPostType || (exports.TPostType = {}));
