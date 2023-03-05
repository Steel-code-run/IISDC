"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const natural_1 = __importDefault(require("natural"));
const Design_1 = __importDefault(require("./directions/Design"));
const InnovationActivity_1 = __importDefault(require("./directions/InnovationActivity"));
const IT_1 = __importDefault(require("./directions/IT"));
const Journalism_1 = __importDefault(require("./directions/Journalism"));
const Linguistics_1 = __importDefault(require("./directions/Linguistics"));
const Medicine_1 = __importDefault(require("./directions/Medicine"));
const Pedagogy_1 = __importDefault(require("./directions/Pedagogy"));
const SocialWork_1 = __importDefault(require("./directions/SocialWork"));
const types_1 = require("@iisdc/types");
const porterStemmer = natural_1.default.PorterStemmerRu, classifier = new natural_1.default.BayesClassifier(porterStemmer);
const trainingObjects = [
    Design_1.default,
    InnovationActivity_1.default,
    IT_1.default,
    Journalism_1.default,
    Linguistics_1.default,
    Medicine_1.default,
    Pedagogy_1.default,
    SocialWork_1.default
];
let trainingData = [];
trainingObjects.forEach(obj => {
    obj.props.forEach(text => {
        trainingData.push({
            fullText: text,
            direction: obj.name
        });
    });
});
//@ts-ignore
trainingData.forEach(el => {
    if (el.fullText && el.direction) {
        classifier.addDocument(el.fullText, el.direction);
    }
});
classifier.train();
const classify = (str) => {
    if (str.length < 10) {
        return types_1.DirectionType.Unknown;
    }
    else
        return classifier.classify(str);
};
exports.default = classify;
