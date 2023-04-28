import {Router} from 'express';
import prisma from "../../prisma/connect";

const grantsRouter = Router();

grantsRouter.get('/v1/grants', async (req, res) => {


    const grant = await prisma.grant.create({
        data: {
            namePost: 'namePost',
            dateCreationPost: 'dateCreationPost',
            direction: 'direction',
            organization: 'organization',
            deadline: 'deadline',
            summary: 'summary',
            directionForSpent: 'directionForSpent',
            fullText: 'fullText',
            link: 'link',
            linkPDF: 'linkPDF',
            timeOfParse: new Date(),
            sourceLink: 'sourceLink'
        }
    })


    console.log(grant);
    return res.json(grant)
})

export default grantsRouter;