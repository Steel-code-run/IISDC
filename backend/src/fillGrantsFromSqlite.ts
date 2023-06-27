import * as path from "path";
import prisma from "./prisma/connect";
import {get3DirectionsByText} from "./helpers/getDirectionByText/getDirectionByText";

//  ts-node src/fillGrantsFromSqlite.ts

(async function init(){
    const db = require('better-sqlite3')(path.join(__dirname, 'parser.db'));

    const grants = db.prepare('SELECT * FROM grants').all();

    let i = 0;
    for (const grant of grants) {
        i++;
        console.log(i);
        let data:any = {
            namePost: grant.namePost,
            organization: grant.organization,
            summary: grant.summary,
            directionForSpent: grant.directionForSpent,
            fullText: grant.fullText,
            link: grant.link,
        }
        const dateCreationPost = new Date(grant.dateCreationPost);
        if (dateCreationPost.toString() !== 'Invalid Date')
            data['dateCreationPost'] = dateCreationPost;

        const deadline = new Date(grant.deadline);
        if (deadline.toString() !== 'Invalid Date')
            data['deadline'] = deadline;

        data['directions'] = get3DirectionsByText(grant.fullText)

        data['directions'] = JSON.stringify(data['directions'])

        const timeOfParse = new Date(grant.timeOfParse);
        if (timeOfParse.toString() !== 'Invalid Date')
            data['timeOfParse'] = timeOfParse;
        try {
            await prisma.grants.create({
                data
            })
        } catch (e) {
            console.log(e);
        }
    }
})()