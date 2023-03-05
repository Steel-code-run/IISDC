import natural from "natural";
import Design from "./directions/Design";
import InnovationActivity from "./directions/InnovationActivity";
import IT from "./directions/IT";
import Journalism from "./directions/Journalism";
import Linguistics from "./directions/Linguistics";
import Medicine from "./directions/Medicine";
import Pedagogy from "./directions/Pedagogy";
import SocialWork from "./directions/SocialWork";
import {DirectionType} from "@iisdc/types";


const porterStemmer = natural.PorterStemmerRu,
    classifier = new natural.BayesClassifier(porterStemmer);


const trainingObjects = [
    Design,
    InnovationActivity,
    IT,
    Journalism,
    Linguistics,
    Medicine,
    Pedagogy,
    SocialWork
]

let trainingData:any[] =[];
trainingObjects.forEach(obj=>{
    obj.props.forEach(text=> {
        trainingData.push({
            fullText: text,
            direction: obj.name
        })
    })
})


//@ts-ignore
trainingData.forEach(el=>{
    if (el.fullText && el.direction) {
        classifier.addDocument(el.fullText,el.direction)
    }
})

classifier.train()

const classify = (str:string) =>{
    if (str.length < 10) {
        return DirectionType.Unknown
    } else
        return classifier.classify(str)
}
export default classify