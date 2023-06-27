import * as path from "path";
import prisma from "./prisma/connect";
import {get3DirectionsByText} from "./helpers/getDirectionByText/getDirectionByText";

//  ts-node src/fillGrantsFromSqlite.ts

(async function init(){
    const db = require('better-sqlite3')(path.join(__dirname, 'parser.db'));

    const internships = db.prepare('SELECT * FROM internships').all();

    let i = 0;
    for (const internship of internships) {
        i++;
        console.log(i);
        let data:any = {
            namePost: internship.namePost,
            organization: internship.organization,
            summary: internship.summary,
            directionForSpent: internship.directionForSpent,
            fullText: internship.fullText,
            link: internship.link,
            responsibilities: internship.responsibilities,
        }
        const dateCreationPost = new Date(internship.dateCreationPost);
        if (dateCreationPost.toString() !== 'Invalid Date')
            data['dateCreationPost'] = dateCreationPost;

        const deadline = new Date(internship.deadline);
        if (deadline.toString() !== 'Invalid Date')
            data['deadline'] = deadline;

        data['directions'] = get3DirectionsByText(internship.fullText)

        data['directions'] = JSON.stringify(data['directions'])

        const timeOfParse = new Date(internship.timeOfParse);
        if (timeOfParse.toString() !== 'Invalid Date')
            data['timeOfParse'] = timeOfParse;
        try {
            await prisma.internships.create({
                data
            })
        } catch (e) {
            console.log(e);
        }
    }
})()