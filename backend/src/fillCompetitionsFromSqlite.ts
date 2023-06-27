import * as path from "path";
import prisma from "./prisma/connect";
import {get3DirectionsByText} from "./helpers/getDirectionByText/getDirectionByText";

//  ts-node src/fillGrantsFromSqlite.ts

(async function init(){
    const db = require('better-sqlite3')(path.join(__dirname, 'parser.db'));

    const competitions = db.prepare('SELECT * FROM competitions').all();

    let i = 0;
    for (const competition of competitions) {
        i++;
        console.log(i);
        let data:any = {
            namePost: competition.namePost,
            organization: competition.organization,
            summary: competition.summary,
            directionForSpent: competition.directionForSpent,
            fullText: competition.fullText,
            link: competition.link,
        }
        const dateCreationPost = new Date(competition.dateCreationPost);
        if (dateCreationPost.toString() !== 'Invalid Date')
            data['dateCreationPost'] = dateCreationPost;

        const deadline = new Date(competition.deadline);
        if (deadline.toString() !== 'Invalid Date')
            data['deadline'] = deadline;

        data['directions'] = get3DirectionsByText(competition.fullText)

        data['directions'] = JSON.stringify(data['directions'])

        const timeOfParse = new Date(competition.timeOfParse);
        if (timeOfParse.toString() !== 'Invalid Date')
            data['timeOfParse'] = timeOfParse;
        try {
            await prisma.competitions.create({
                data
            })
        } catch (e) {
            console.log(e);
        }
    }
})()