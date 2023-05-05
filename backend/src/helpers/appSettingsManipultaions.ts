import * as fs from "fs";

type appSettings= {
    parsersWorkTimeStart:number,
    parsersWorkTimeEnd:number,
    parsingEnabled:number,
    parsingInterval:number
}

export const getAppSettings = ():appSettings=>{
    let content = fs.readFileSync(__dirname + "/../../appSettings.json")
    return JSON.parse(content.toString())
}

export const updateAppSettings =(data:appSettings)=>{
    fs.writeFileSync(__dirname + "/../../appSettings.json",JSON.stringify(data))
    return
}