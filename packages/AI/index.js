"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const natural_1 = __importDefault(require("natural"));
const trainingData_1 = __importDefault(require("./trainingData"));
const config_1 = __importDefault(require("./config"));
const porterStemmer = natural_1.default.PorterStemmerRu, classifier = new natural_1.default.BayesClassifier(porterStemmer);
//@ts-ignore
trainingData_1.default.forEach(el => {
    if (el.fullText && el.direction) {
        classifier.addDocument(el.fullText, el.direction);
    }
});
classifier.train();
const classify = (str) => {
    if (str.length < 10) {
        return config_1.default["Не определено"];
    }
    else
        return classifier.classify(str);
};
exports.default = classify;
