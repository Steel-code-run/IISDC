import {recurrent} from "brain.js"
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
import * as fs from "fs";

const dataFile = __dirname + '/data.json'
const iterations = 10
const max_loops = 100

const net = new recurrent.LSTM();

let data:any = []
IT.props.forEach((el) => data.push({input: el, output: IT.name}))
Design.props.forEach((el) => data.push({input: el, output: Design.name}))
Biotech.props.forEach((el) => data.push({input: el, output: Biotech.name}))
Chemistry.props.forEach((el) => data.push({input: el, output: Chemistry.name}))
Drones.props.forEach((el) => data.push({input: el, output: Drones.name}))
Geography.props.forEach((el) => data.push({input: el, output: Geography.name}))
Journalism.props.forEach((el) => data.push({input: el, output: Journalism.name}))
libraryScience.props.forEach((el) => data.push({input: el, output: libraryScience.name}))
Medicine.props.forEach((el) => data.push({input: el, output: Medicine.name}))
pedagogy.props.forEach((el) => data.push({input: el, output: pedagogy.name}))
SocialWork.props.forEach((el) => data.push({input: el, output: SocialWork.name}))
Tourism.props.forEach((el) => data.push({input: el, output: Tourism.name}))
Economy.props.forEach((el) => data.push({input: el, output: Economy.name}))



// train every 10 iterations with save
try {
    net.fromJSON(JSON.parse(fs.readFileSync(dataFile).toString()))
} catch (e) {
    console.log(e)
}


for (let i = 0; i < max_loops; i++) {
    const date = new Date()
    net.train(data, {
        log: true,
        logPeriod:1,
        iterations: iterations,
        learningRate: 0.005,
    })
    let out = net.toJSON()
    fs.writeFileSync(dataFile, JSON.stringify(out))
    const date_end = new Date()
    console.log(`loop ${i}/${max_loops} iterations ${iterations} took ${date_end.getTime() - date.getTime()}ms`)
}