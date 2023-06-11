import {Router} from "express";
import prisma from "../../prisma/connect";
import {check, validationResult} from "express-validator";
const grantsRouter = Router();

// model grants {
//   id                Int                @id @unique @default(autoincrement())
//   namePost          String             @db.LongText()
//   dateCreationPost  String?
//   directions        grants_direction[]
//   organization      String?
//   deadline          DateTime?
//   summary           String?
//   directionForSpent String?
//   fullText          String?            @db.LongText()
//   link              String?
//   linkPDF           String?
//   sourceLink        String?
//   timeOfParse       DateTime
//   blackListed       Int                @default(0)
//   // События редактирования
//   editActions       users_actions[]
//   parser            parsers?           @relation(fields: [parser_id], references: [id])
//   parser_id         Int?
// }


// Отдает правильное время в формате ISO
async function getQueryDate(data:any) {
    let where:any = Object.assign({}, data)

    if (data?.timeOfParse){
        where["timeOfParse"] = new Date(data.timeOfParse);
    }
    if (data?.timeOfParse?.gte){
        where["timeOfParse"] = {
            gte: new Date(data.timeOfParse.gte)
        }
    }
    if (data?.timeOfParse?.lte){
        where["timeOfParse"] = Object.assign(where["timeOfParse"] || {}, {
            lte: new Date(data.timeOfParse.lte)
        })
    }

    if (data?.deadline){
        where["deadline"] = new Date(data.deadline);
    }
    if (data?.deadline?.gte){
        where["deadline"] = {
            gte: new Date(data.deadline.gte)
        }
    }
    if (data?.deadline?.lte){
        where["deadline"] = Object.assign(where["deadline"] || {}, {
            lte: new Date(data.deadline.lte)
        })
    }

    if (data?.dateCreationPost){
        where["dateCreationPost"] = new Date(data.dateCreationPost);
    }
    if (data?.dateCreationPost?.gte){
        where["dateCreationPost"] = {
            gte: new Date(data.dateCreationPost.gte)
        }
    }
    if (data?.dateCreationPost?.lte){
        where["dateCreationPost"] = Object.assign(where["dateCreationPost"] || {}, {
            lte: new Date(data.dateCreationPost.lte)
        })
    }


    return where;
}

grantsRouter.post('/v1/grants/', async (req, res) => {


    let extended = req.body.extended || false;

    let where = await getQueryDate(req.body.where);

    try {
        let grants:any = await prisma.grants.findMany({
            take: Number(req.query.take) || 10,
            skip: Number(req.query.skip) || 0,
            where: where
        })
        if (!extended) {
            grants = grants.map((grant:any) => {
                let obj = Object.assign({}, grant);

                delete obj.fullText;
                delete obj.linkPDF;
                delete obj.sourceLink;
                delete obj.parser_id;
                delete obj.dateCreationPost;
                delete obj.blackListed;
                delete obj.link;
                delete obj.editActions;

                return obj;
            })
        }

        return res.status(200).json(grants);
    } catch (e){
        console.log(e);
        return res.status(500).json(e);
    }
})

grantsRouter.post('/v1/grants/count', async (req, res) => {

        let where = await getQueryDate(req.body.where);

        try {
            let count = await prisma.grants.count({
                where: where
            })
            return res.status(200).json(count);
        } catch (e){
            return res.status(500).json(e);
        }
});

grantsRouter.post('/v1/grants/:id', async (req, res) => {
    let id = Number(req.params.id);

    try {
        let grant = await prisma.grants.findUnique({
            where: {
                id: id
            }
        })

        return res.status(200).json(grant);
    } catch (e) {
        return res.status(500).json(e);
    }

});

grantsRouter.delete('/v1/grants', async (req, res) => {
    let id = Number(req.query.id) || req.body.id;

    try {
        let grant = await prisma.grants.delete({
            where: {
                id: id
            }
        })
        return res.status(200).json(grant);
    } catch (e) {
        return res.status(500).json(e);
    }
})

grantsRouter.patch('/v1/grants', async (req, res) => {
    let id = Number(req.query.id) || req.body.id;


    let data = await getQueryDate(req.body.data);

    try {
        let grant = await prisma.grants.update({
            where: {
                id: id
            },
            data: data
        })
        return res.status(200).json(grant);
    } catch (e){
        return res.status(500).json(e);
    }

})

export default grantsRouter;