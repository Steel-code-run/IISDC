import natural from "natural";

import trainingData from "./trainingData";
import directions from "./config";

const porterStemmer = natural.PorterStemmerRu,
    classifier = new natural.BayesClassifier(porterStemmer);




//@ts-ignore
trainingData.forEach(el=>{
    if (el.fullText && el.direction) {
        classifier.addDocument(el.fullText,el.direction)
    }
})

classifier.train()


const classify = (str:string) =>{
    if (str.length < 10) {
        return directions["Не определено"]
    } else
        return classifier.classify(str)
}
export default classify