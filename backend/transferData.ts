import {GrantsOperations} from "./src/API/sqlite/parser/GrantsOperations";
import {
    competitionsTableName,
    directionsConstTableName,
    directionsTableName,
    grantsTableName, internshipsTableName, vacanciesTableName
} from "./src/API/sqlite/config";
import {DirectionsOperations} from "./src/API/sqlite/DirectionsOperations";
import {DirectionsConstOperations} from "./src/API/sqlite/DirectionsConstOperations";
import {DirectionType, TGrant} from "@iisdc/types";
import {CompetitionOperations} from "./src/API/sqlite/parser/CompetitionsOperation";
import {InternshipOperations} from "./src/API/sqlite/parser/InternshipsOperations";
import {VacanciesOperations} from "./src/API/sqlite/parser/VacanciesOperations";

const dbFrom = require("better-sqlite3")("./parserFrom.db")
const dbTo= require("better-sqlite3")("./parser.db")


let grantsFromOldDb:any[] = dbFrom.prepare(`
SELECT 
* 
FROM grants;
`).all()

let competitionsFromOldDb:any[] = dbFrom.prepare(`
SELECT 
* 
FROM competitions;
`).all()

let internshipsFromOldDb:any[] = dbFrom.prepare(`
SELECT 
* 
FROM internships;
`).all()

let vacanciesFromOldDb:any[] = dbFrom.prepare(`
SELECT 
* 
FROM vacancies;
`).all()

let directionsConstOperations = new DirectionsConstOperations(dbTo, directionsConstTableName)
let directionsOperations = new DirectionsOperations(dbTo,directionsTableName, directionsConstOperations)
let grantsOperations = new GrantsOperations(dbTo,grantsTableName, directionsOperations)
let competitionsOperations = new CompetitionOperations(dbTo, competitionsTableName, directionsOperations)
let internshipOperations = new InternshipOperations(dbTo, internshipsTableName)
let vacanciesOperations = new VacanciesOperations(dbTo, vacanciesTableName)

directionsConstOperations.insertConst(DirectionType.Unknown)
directionsConstOperations.insertConst(DirectionType.drones)
directionsConstOperations.insertConst(DirectionType.Biotech)
directionsConstOperations.insertConst(DirectionType.IT)
directionsConstOperations.insertConst(DirectionType.Pedagogy)
directionsConstOperations.insertConst(DirectionType.Philology)
directionsConstOperations.insertConst(DirectionType.Journalism)
directionsConstOperations.insertConst(DirectionType.Design)
directionsConstOperations.insertConst(DirectionType.Chemistry)
directionsConstOperations.insertConst(DirectionType.Economy)
directionsConstOperations.insertConst(DirectionType.Geography)
directionsConstOperations.insertConst(DirectionType.libraryScience)
directionsConstOperations.insertConst(DirectionType.Medicine)
directionsConstOperations.insertConst(DirectionType.Physiology)
directionsConstOperations.insertConst(DirectionType.SocialWork)
directionsConstOperations.insertConst(DirectionType.Tourism)

grantsFromOldDb.forEach((el)=>{
    try {
        el.direction = JSON.parse(el.direction.replaceAll("&quot;",'"'))
    } catch (e) {

    }
    console.log(el);

    grantsOperations.insertGrant(el)
})

competitionsFromOldDb.forEach((el)=>{
    try {
        el.direction = JSON.parse(el.direction.replaceAll("&quot;",'"'))
    } catch (e) {

    }
    console.log(el);

    delete el.salary
    competitionsOperations.insert(el)
})

internshipsFromOldDb.forEach((el)=>{
    try {
        el.direction = JSON.parse(el.direction.replaceAll("&quot;",'"'))
    } catch (e) {

    }
    console.log(el);

    internshipOperations.insert(el)
})

vacanciesFromOldDb.forEach((el)=>{
    try {
        el.direction = JSON.parse(el.direction.replaceAll("&quot;",'"'))
    } catch (e) {

    }

    console.log(el);

    vacanciesOperations.insert(el)
})