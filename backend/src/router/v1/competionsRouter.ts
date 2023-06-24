import {Router} from "express";
import prisma from "../../prisma/connect";
import {check, validationResult} from "express-validator";
const competitionsRouter = Router();


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

competitionsRouter.post('/v1/competitions/', async (req, res) => {


    let extended = req.body.extended || false;

    let where = await getQueryDate(req.body.where);

    try {
        let competitions:any = await prisma.competitions.findMany({
            take: Number(req.body.take) || 10,
            skip: Number(req.body.skip) || 0,
            orderBy: req.body.orderBy || {
                id: 'desc'
            },
            where: where
        })
        if (!extended) {
            competitions = competitions.map((competition:any) => {
                let obj = Object.assign({}, competition);

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

        return res.status(200).json(competitions);
    } catch (e){
        console.log(e);
        return res.status(500).json(e);
    }
})

competitionsRouter.post('/v1/competitions/count', async (req, res) => {

        let where = await getQueryDate(req.body.where);

        try {
            let count = await prisma.competitions.count({
                where: where
            })
            return res.status(200).json(count);
        } catch (e){
            return res.status(500).json(e);
        }
});

competitionsRouter.post('/v1/competitions/:id', async (req, res) => {
    let id = Number(req.params.id);

    try {
        let competition = await prisma.competitions.findUnique({
            where: {
                id: id
            }
        })

        return res.status(200).json(competition);
    } catch (e) {
        return res.status(500).json(e);
    }

});

competitionsRouter.delete('/v1/competitions', async (req, res) => {
    let id = Number(req.query.id) || req.body.id;

    try {
        let competition = await prisma.competitions.delete({
            where: {
                id: id
            }
        })
        return res.status(200).json(competition);
    } catch (e) {
        return res.status(500).json(e);
    }
})

competitionsRouter.patch('/v1/competitions', async (req, res) => {
    let id = Number(req.query.id) || req.body.id;


    let data = await getQueryDate(req.body.data);

    try {
        let competition = await prisma.competitions.update({
            where: {
                id: id,
            },
            data: data
        })
        return res.status(200).json(competition);
    } catch (e){
        return res.status(500).json(e);
    }

})

export default competitionsRouter;