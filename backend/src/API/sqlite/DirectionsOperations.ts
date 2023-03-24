import {DefaultOperation} from "./DefaultOperations";
import {consoleLog} from "../../utils/consoleLog";
import {createDirectionsTable} from "./configurateDataBase/createDirectionsTable";
import {Database} from "better-sqlite3";
import {IDirectionsConstOperations} from "./DirectionsConstOperations";
import {directionsConstTableName} from "./config";

export interface IDirectionsOperations {
    insertDirection(props:{
        direction: string,
        parentID: number,
        tableNamePost: string,
    }):number,
    getDirections(parentId:number, tableNamePost:string):string[];
}


export class DirectionsOperations extends DefaultOperation implements IDirectionsOperations{

    private directionsConstOperations:IDirectionsConstOperations
    /**
     * @param db
     * - бд обычно parserDb
     * @param tableName
     * - обычно directionsTableName
     * @param directionsConstOperations
     */
    constructor(db:Database,tableName:string,directionsConstOperations:IDirectionsConstOperations) {
        super(db,tableName);
        this.createTable();
        this.directionsConstOperations = directionsConstOperations
    }

    /**
     *
     * @param props
     */
    insertDirection(props:{
                        direction: string,
                        parentID: number,
                        tableNamePost: string,
                    }
    ): number {
        let query = `
        INSERT INTO ${this.tableName}(
        ${props.tableNamePost}_id,
        ${directionsConstTableName}_id
        )
        VALUES (?,?)
        `
        let direction_id = this.directionsConstOperations.getIdByName(props.direction)

        if (!direction_id)
            throw new Error("direction_id is undefined")

        try {
            return Number(this.db.prepare(query).run(props.parentID,direction_id).lastInsertRowid)
        } catch (e) {
            consoleLog(`
            Ошибка в DirectionsOperations, insertDirection ${props.direction}, ${direction_id}, ${props.parentID}, ${props.tableNamePost} \n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }

    getDirections(parentId: number, tableNamePost:string): string[] {
        let query = `
        SELECT directionName FROM ${this.tableName}, ${tableNamePost}
        WHERE ${tableNamePost}.id = ${this.tableName}.${tableNamePost}_id = ${parentId}
        `
        try {
            return this.db.prepare(query).all()
        } catch (e) {
            consoleLog(`
            Ошибка в DirectionsOperations, getDirections ${parentId}, ${tableNamePost} \n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }


    createTable(){
        let query = createDirectionsTable;
        try {
            return this.db.prepare(query).run()
        } catch (e) {
            consoleLog(`
            Ошибка в GrantsDirectionsOperations, createTable\n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }
}
