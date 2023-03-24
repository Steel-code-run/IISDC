import {DefaultOperation} from "./DefaultOperations";
import {Database} from "better-sqlite3";
import {consoleLog} from "../../utils/consoleLog";
import {createDirectionsConstTable, createDirectionsTable} from "./configurateDataBase/createDirectionsTable";

export interface IDirectionsConstOperations {
    insertConst(directionName:string):number;
    removeConst(directionName:string):number;
    getAll():string[];
    getIdByName(directionName:string):number;
}

export class DirectionsConstOperations extends DefaultOperation implements IDirectionsConstOperations{

    constructor(db:Database,tableName:string) {
        super(db,tableName);
        this.createTable();
    }

    createTable(){
        let query = createDirectionsConstTable;
        try {
            return this.db.prepare(query).run()
        } catch (e) {
            // consoleLog(`
            // Ошибка в DirectionsConstOperations, createTable\n
            // query ->\n
            // ${query}\n
            // ${e}
            // `);
            throw new Error(e);
        }
    }
    insertConst(directionName:string){
        let query = `
        INSERT INTO ${this.tableName}
        (directionName)
        VALUES (
        ?
        )
        `
        try {
            return Number(this.db.prepare(query).run(directionName).lastInsertRowid);
        } catch (e) {
            // consoleLog(`
            // Ошибка в DirectionsConstOperations, insertConst ${directionName} \n
            // query ->\n
            // ${query}\n
            // ${e}
            // `);
            throw new Error(e);
        }
    }

    removeConst(directionName:string){
        let query = `
        DELETE FROM ${this.tableName}
        WHERE directionName = ?
        `
        try {
            return Number(this.db.prepare(query).run(directionName).lastInsertRowid);
        } catch (e) {
            // consoleLog(`
            // Ошибка в DirectionsConstOperations, removeConst ${directionName} \n
            // query ->\n
            // ${query}\n
            // ${e}
            // `);
            throw new Error(e);
        }
    }

    getAll(){
        let query = `
        SELECT directionName FROM ${this.tableName}
        `
        try {
            let arr = this.db.prepare(query).all();
            return arr.map(el=>el.directionName)
        } catch (e) {
            // consoleLog(`
            // Ошибка в DirectionsConstOperations, getAll \n
            // query ->\n
            // ${query}\n
            // ${e}
            // `);
            throw new Error(e);
        }
    }

    getIdByName(directionName:string):number{
        let query = `
        SELECT id FROM ${this.tableName}
        WHERE directionName = ?
        `
        try {
            return this.db.prepare(query).get(directionName).id;
        } catch (e) {
            // consoleLog(`
            // Ошибка в DirectionsConstOperations, getIdByName ${directionName} \n
            // query ->\n
            // ${query}\n
            // ${e}
            // `);
            throw new Error(e);
        }
    }
}