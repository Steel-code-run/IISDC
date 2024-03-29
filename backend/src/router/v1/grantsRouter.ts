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


/**
 * @api {post} /v1/grants/ Получение списка грантов
 */
grantsRouter.post('/v1/grants/', async (req, res) => {


    let extended = req.body.extended || false;

    let where = await getQueryDate(req.body.where);

    try {
        let grants:any = await prisma.grants.findMany({
            take: Number(req.body.take) || 10,
            skip: Number(req.body.skip) || 0,
            orderBy: req.body.orderBy || {
              id: 'desc'
            },
            where: where
        })

        let count = await prisma.grants.count({
            where: where
        })

        return res.status(200).json({
            grants: grants,
            count: count
        });
    } catch (e){
        console.log(e);
        return res.status(500).json(e);
    }
})

/**
 * Отдает кол-во постов по фильтру
 */
grantsRouter.post('/v1/grants/count', async (req, res) => {

        let where = await getQueryDate(req.body.where);

        try {
            let count = await prisma.grants.count({
                where: where,
                orderBy: req.body.orderBy || {
                    id: 'desc'
                },
            })
            return res.status(200).json(count);
        } catch (e){
            return res.status(500).json(e);
        }
});
/**
 * Отдает пост по id
 */
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
/**
 * Удаляет пост по id
 */
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

/**
 * Обновляет пост по id
 */
grantsRouter.patch('/v1/grants', async (req, res) => {
    let id = Number(req.query.id) || req.body.id;


    let data = await getQueryDate(req.body.data);

    try {
        let grant = await prisma.grants.update({
            where: {
                id: id,
            },
            data: data
        })
        return res.status(200).json(grant);
    } catch (e){
        return res.status(500).json(e);
    }
})

export default grantsRouter;