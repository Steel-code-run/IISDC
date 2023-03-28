import {DefaultOperation} from "../DefaultOperations";
import {Database} from "better-sqlite3";
import {createTableGrantsQuery} from "../configurateDataBase/createGrantTable";
import {consoleLog} from "../../../utils/consoleLog";
import {createInternshipsTable} from "../configurateDataBase/createInternshipsTable";
import {directionsConstTableName, directionsTableName} from "../config";
import {shieldIt} from "@iisdc/utils";
import {TInternship, TVacancy} from "@iisdc/types";
import {createVacanciesTable} from "../configurateDataBase/createVacanciesTable";

export interface IVacanciesOperations extends VacanciesOperations{}

export class VacanciesOperations extends DefaultOperation{

    constructor(db:Database,tableName:string) {
        super(db,tableName);
        this.createTable()
    }

    createTable(){
        let query = createVacanciesTable;
        try {

            return this.db.prepare(query).run()
        } catch (e) {
            consoleLog(`
            Ошибка в VacanciesOperations, createTable\n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }

    insert(post:TVacancy): number {
        const query = `
        INSERT INTO ${this.tableName}
        (
        namePost,
        dateCreationPost,
        organization,
        fullText,
        link,
        timeOfParse,
        sourceLink,
        salary,
        responsibilities,
        requirements,
        conditions,
        namePost_lowerCase
        )
        VALUES
        (?,?,?,?,?,?,?,?,?,?,?,?);
        `

        try {

            let postId = Number(this.db.prepare(query).run(
                post.namePost,
                post.dateCreationPost || '',
                post.organization || '',
                post.fullText || '',
                post.link || '',
                post.timeOfParse || '',
                post.sourceLink || '',
                post.salary || '',
                post.responsibilities || '',
                post.requirements || '',
                post.conditions || '',
                post.namePost.toLowerCase()
            ).lastInsertRowid)


            return postId
        } catch (e) {
            consoleLog(`
            Ошибка в VacanciesOperations, insertGrant ${JSON.stringify(post,null,2)} \n
            query ->\n
            ${query}\n
            ${e}            
            `);
            throw new Error(e);
        }
    }

    update(post:TInternship):void{
        const query = `
        UPDATE ${this.tableName} SET
        requirements = ?,
        responsibilities = ?,
        conditions = ?,
        salary = ?,
        fullText = ?,
        dateCreationPost = ?,
        organization = ?,
        link = ?
        
        WHERE id = ${post.id}
        `

        try {

            this.db.prepare(query).run(
                post.requirements,
                post.responsibilities,
                post.conditions,
                post.salary,
                post.fullText,
                post.dateCreationPost,
                post.organization,
                post.link
            )


        } catch (e) {
            consoleLog(`
            Ошибка в VacanciesOperations, insertGrant ${JSON.stringify(post,null,2)} \n
            query ->\n
            ${query}\n
            ${e}            
            `);
            throw new Error(e);
        }
    }

    get(id: number): TInternship | undefined{
        const query = `
        SELECT 
        id,
        requirements,
        responsibilities,
        conditions,
        salary,
        fullText,
        namePost,
        dateCreationPost,
        organization,
        link,
        timeOfParse,
        sourceLink,
        blackListed,
        namePost_lowerCase
        FROM ${this.tableName}
        WHERE
        id = ?;
        `
        try {
            let post = this.db.prepare(query).get(id);
            if (!post)
                return undefined

            return post
        } catch (e) {
            consoleLog(`
            Ошибка в VacanciesOperations, getGrant id = ${id} \n
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
            Ошибка в VacanciesOperations, setPostToBlackList id = ${id} \n
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
            Ошибка в VacanciesOperations, removeFromBlackList id = ${id} \n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }

    getPosts(props:{
        namePost?: string,
        blackListed?: number,
        limit?:number,
        from?:number,
        justCountIt?:boolean
    }={}):TInternship[]{
        if (props.namePost === undefined)
            props.namePost = ''


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
        query += `
        SELECT 
        ${this.tableName}.id
        FROM ${this.tableName} 
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

        query+= ` LIMIT ${props.from}, ${props.limit} `


        if (props.justCountIt)
            query+=" ) "

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
            Ошибка в VacanciesOperations, getPosts ${JSON.stringify(props)}, ${query}\n
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
            Ошибка в VacanciesOperations, deletePost ${id}, ${query}\n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }
}