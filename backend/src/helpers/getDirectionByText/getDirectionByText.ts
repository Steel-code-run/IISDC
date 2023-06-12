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
import economy from "./directions/Economy";


const porterStemmer = natural.PorterStemmerRu,
    classifier = new natural.BayesClassifier(porterStemmer);

classifier.addDocument(Design.props, Design.name);
classifier.addDocument(Biotech.props, Biotech.name);
classifier.addDocument(Chemistry.props, Chemistry.name);
classifier.addDocument(Drones.props, Drones.name);
classifier.addDocument(Geography.props, Geography.name);
classifier.addDocument(IT.props, IT.name);
classifier.addDocument(Journalism.props, Journalism.name);
classifier.addDocument(libraryScience.props, libraryScience.name);
classifier.addDocument(Medicine.props, Medicine.name);
classifier.addDocument(Pedagogy.props, Pedagogy.name);
classifier.addDocument(SocialWork.props, SocialWork.name);
classifier.addDocument(Tourism.props, Tourism.name);
classifier.addDocument(pedagogy.props, pedagogy.name);


classifier.train();

export const get3DirectionsByText = (text: string) => {
    let directions = [];
    let classifications = classifier.getClassifications(text)
    let classificationsValuesSum = classifications.reduce((acc, el) => acc += el.value, 0)

    let myClassifications = classifications.map((el)=>
        Object.assign({label:el.label},{proc:el.value / classificationsValuesSum}))
    // console.log(myClassifications)
    // console.log(classificationsValuesSum)

    directions.push(classifications[0].label)
    if (myClassifications?.[1]?.proc > 0.000001)
        directions.push(classifications[1].label)
    if (myClassifications?.[2]?.proc > 0.000001)
        directions.push(classifications[2].label)
    return directions

};