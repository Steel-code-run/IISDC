import natural from "natural";
import Biotech from "./directions/Biotech";
import Chemistry from "./directions/Chemistry";
import Design from "./directions/Design";
import Drones from "./directions/Drones";
import Geography from "./directions/Geography";
import IT from "./directions/IT";
import Journalism from "./directions/Journalism";
import libraryScience from "./directions/libraryScience";
import Medicine from "./directions/Medicine";
import Pedagogy from "./directions/Pedagogy";
import SocialWork from "./directions/SocialWork";
import Tourism from "./directions/Tourism";
import pedagogy from "./directions/Pedagogy";
import Economy from "./directions/Economy";
import {recurrent} from "brain.js"

const porterStemmer = natural.PorterStemmerRu,
    classifier = new natural.BayesClassifier(porterStemmer);



// Design.props.forEach((el) => classifier.addDocument(el, Design.name));
// Biotech.props.forEach((el) => classifier.addDocument(el, Biotech.name));
// Chemistry.props.forEach((el) => classifier.addDocument(el, Chemistry.name));
// Drones.props.forEach((el) => classifier.addDocument(el, Drones.name));
// Geography.props.forEach((el) => classifier.addDocument(el, Geography.name));
// IT.props.forEach((el) => classifier.addDocument(el, IT.name));
// Journalism.props.forEach((el) => classifier.addDocument(el, Journalism.name));
// libraryScience.props.forEach((el) => classifier.addDocument(el, libraryScience.name));
// Medicine.props.forEach((el) => classifier.addDocument(el, Medicine.name));
// Pedagogy.props.forEach((el) => classifier.addDocument(el, Pedagogy.name));
// SocialWork.props.forEach((el) => classifier.addDocument(el, SocialWork.name));
// Tourism.props.forEach((el) => classifier.addDocument(el, Tourism.name));
// pedagogy.props.forEach((el) => classifier.addDocument(el, pedagogy.name));
// Economy.props.forEach((el) => classifier.addDocument(el, Economy.name));
//
// classifier.train()





// export const get3DirectionsByText = (text: string) => {
//     let directions = [];
//     let classifications = classifier.getClassifications(text)
//     let classificationsValuesSum = classifications.reduce((acc, el) => acc += el.value, 0)
//
//     let myClassifications = classifications.map((el)=>
//         Object.assign({label:el.label},{proc:el.value / classificationsValuesSum}))
//     console.log(myClassifications)
//     // console.log(classificationsValuesSum)
//
//     if (myClassifications?.[0]?.proc > myClassifications?.[1]?.proc)
//         directions.push(classifications[0].label)
//     if (myClassifications?.[1]?.proc > myClassifications?.[2]?.proc)
//         directions.push(classifications[1].label)
//     if (myClassifications?.[2]?.proc > myClassifications?.[3]?.proc)
//         directions.push(classifications[2].label)
//
//     return directions
//
// };

