//@ts-ignore
import {DefaultOperation, IDefaultOperations} from "../DefaultOperations";
import {Database} from "better-sqlite3";
import {consoleLog} from "../../../utils/consoleLog";
import {createCompetitionsTable} from "../configurateDataBase/createCompetitionsTable";
import {directionsConstTableName, directionsTableName} from "../config";
import {shieldIt} from "@iisdc/utils";
import {TCompetition} from "@iisdc/types";
import {IDirectionsOperations} from "../DirectionsOperations";
//@ts-ignore

export interface ICompetitionOperations extends CompetitionOperations{

}

export class CompetitionOperations extends DefaultOperation {

    private directionsOperations: IDirectionsOperations;
    constructor(db:Database,tableName:string, directionsOperations: IDirectionsOperations) {
        super(db,tableName);
        this.createTable()
        this.directionsOperations = directionsOperations
    }

    createTable(){
        let query = createCompetitionsTable;
        try {
            return this.db.prepare(query).run()
        } catch (e) {
            consoleLog(`
            Ошибка в GrantOperations, createTable\n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }

    insert(post:TCompetition): number {
        const query = `
        INSERT INTO ${this.tableName}
        (
        namePost,
        dateCreationPost,
        organization,
        deadline,
        fullText,
        link,
        linkPDF,
        timeOfParse,
        sourceLink,
        namePost_lowerCase
        )
        VALUES
        (?,?,?,?,?,?,?,?,?,?);
        `

        try {

            let postId = Number(this.db.prepare(query).run(
                post.namePost,
                post.dateCreationPost || '',
                post.organization || '',
                post.deadline || '',
                post.fullText || '',
                post.link || '',
                post.linkPDF || '',
                post.timeOfParse || '',
                post.sourceLink || '',
                post.namePost.toLowerCase()
            ).lastInsertRowid)

            if (Array.isArray(post.direction)){
                post.direction.forEach(direction=>{
                    this.directionsOperations.insertDirection({
                        direction: direction,
                        parentID: postId,
                        tableNamePost: this.tableName
                    })
                })
            }

            return postId
        } catch (e) {
            consoleLog(`
            Ошибка в CompetitionOperations, insertGrant ${JSON.stringify(post,null,2)} \n
            query ->\n
            ${query}\n
            ${e}            
            `);
            throw new Error(e);
        }
    }

    update(post:TCompetition):void{
        const query = `
        UPDATE ${this.tableName} SET
        dateCreationPost = ?,
        organization = ?,
        deadline = ?,
        fullText = ?,
        link = ?,
        linkPDF = ?
        WHERE id = ${post.id}
        `

        try {

            this.db.prepare(query).run(
                post.dateCreationPost,
                post.organization,
                post.deadline,
                post.fullText,
                post.link,
                post.linkPDF,
            )

            if (post.id === undefined)
                throw new Error("post.id undefined")
            this.directionsOperations.deleteDirections(post.id, this.tableName)

            if (Array.isArray(post.direction)){
                post.direction.forEach(direction=>{
                    this.directionsOperations.insertDirection({
                        direction: direction,
                        parentID: post.id!,
                        tableNamePost: this.tableName
                    })
                })
            }

        } catch (e) {
            consoleLog(`
            Ошибка в CompetitionOperations, insertGrant ${JSON.stringify(post,null,2)} \n
            query ->\n
            ${query}\n
            ${e}            
            `);
            throw new Error(e);
        }
    }

    get(id: number): TCompetition | undefined{
        const query = `
        SELECT 
        id,
        namePost,
        dateCreationPost,
        organization,
        deadline,
        fullText,
        link,
        linkPDF,
        timeOfParse,
        blackListed,
        sourceLink,
        namePost_lowerCase
        FROM ${this.tableName}
        WHERE
        id = ?;
        `
        try {
            let grant = this.db.prepare(query).get(id);
            if (!grant)
                return undefined
            grant.direction = this.getPostDirectionsByGrantId(grant.id)
            return grant
        } catch (e) {
            consoleLog(`
            Ошибка в CompetitionOperations, getGrant id = ${id} \n
            query ->\n
            ${query}\n
            ${e}            
            `);
            throw new Error(e);
        }
    }

    getPostDirectionsByGrantId(id:number):string[]{
        let query = `
            SELECT 
            ${directionsConstTableName}.directionName,
            ${this.tableName}.id
            FROM ${directionsConstTableName}, ${directionsTableName}, ${this.tableName}
            WHERE 
            (${directionsTableName}.${this.tableName}_id = ${this.tableName}.id) AND
            (${directionsConstTableName}.id = ${directionsTableName}.${directionsConstTableName}_id) AND
            (${this.tableName}.id = ${id})
        `
        try {
            return this.db.prepare(query).all().map(el=>el.directionName)
        } catch (e) {
            consoleLog(`
            Ошибка в CompetitionOperations, getPostDirectionsByGrantId id = ${id} \n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }

    }

    setPostToBlackList(id:number){
        const query  = `
        UPDATE ${this.tableName}
        SET blackListed = 1
        WHERE id = ${id}
        `
        try {
            this.db.prepare(query).run();
        } catch (e) {
            consoleLog(`
            Ошибка в CompetitionOperations, setPostToBlackList id = ${id} \n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }

    removeFromBlackList(id:number){
        const query  = `
        UPDATE ${this.tableName}
        SET blackListed = 0
        WHERE id = ${id}
        `
        try {
            this.db.prepare(query).run();
        } catch (e) {
            consoleLog(`
            Ошибка в CompetitionOperations, removeFromBlackList id = ${id} \n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }

    getPosts(props:{
        namePost?: string,
        directions?: string[],
        blackListed?: number,
        limit?:number,
        from?:number,
        justCountIt?:boolean
    }={}):TCompetition[]{
        if (props.namePost === undefined)
            props.namePost = ''



        if (props.directions === undefined)
            props.directions = []

        if (props.limit === undefined)
            props.limit = 10

        if (props.from === undefined)
            props.from = 0

        let whereInQuery = false
        let query = "";

        if (props.justCountIt)
            query +=`
            SELECT 
            COUNT (*)
            FROM
            (
            `

        if (props.directions.length > 0)
            query+= `
            SELECT
            *
            FROM (
            `

        query += `
        SELECT 
        ${this.tableName}.id,
        directions_const.directionName,
        count(*) as count
        FROM ${this.tableName}, ${directionsTableName}, ${directionsConstTableName}
        `

        if (typeof props.blackListed === "number") {
            if (!whereInQuery){
                whereInQuery = true
                query+=" WHERE "
            }
            else
                query+= " AND "

            query+= ` (${this.tableName}.blackListed = ${props.blackListed}) `
        }
        if (props.directions.length > 0){
            if (!whereInQuery){
                whereInQuery = true
                query+=" WHERE "
            }
            else
                query+= " AND "


            // query+=`
            // (${directionsConstTableName}.directionName = '') AND
            // (${directionsTableName}.${this.tableName}_id = ${this.tableName}.id) AND
            // (${directionsTableName}.${directionsConstTableName}_id = ${directionsConstTableName}.id)
            // `

            query+="("
            props.directions.forEach(el=>{
                query+= ` (${directionsConstTableName}.directionName = '${el}') OR `
            })
            query=query.slice(0,-3)
            query+=" ) AND"

            query+=`
            (${directionsTableName}.${this.tableName}_id = ${this.tableName}.id) AND
            (${directionsTableName}.${directionsConstTableName}_id = ${directionsConstTableName}.id)
            `
        }


        if (props.namePost.length>0) {
            if (!whereInQuery){
                whereInQuery = true
                query+=" WHERE "
            }
            else
                query+= " AND "
            query+=`
            (${this.tableName}.namePost_lowerCase like '%${shieldIt(props.namePost.toLowerCase())}%')
            `
        }
        query+= ` GROUP BY ${this.tableName}.id `

        query+= ` ORDER BY ${this.tableName}.id DESC `

        if (props.directions.length > 0)
            query+= ` ) `

        if (props.justCountIt)
            query+=" ) "

        query+= ` LIMIT ${props.from}, ${props.limit} `

        try {
            if (props.justCountIt)
                return this.db.prepare(query).all()[0]["COUNT (*)"]

            let grants = this.db.prepare(query).all()
            grants = grants.map((grant)=>{
                return this.get(grant.id)
            })
            return grants
        } catch (e) {
            consoleLog(`
            Ошибка в GrantOperations, getGrants ${JSON.stringify(props)}, ${query}\n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }
    deletePost(id:number){
        const query = `
            DELETE FROM ${this.tableName} 
            WHERE 
            (id = ${id})
        `
        try {
            this.db.prepare(query).run()
        } catch (e) {
            consoleLog(`
            Ошибка в CompetitionOperations, deletePost ${id}, ${query}\n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }

}