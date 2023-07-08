import {Router} from "express";
import prisma from "../../prisma/connect";
import {check, validationResult} from "express-validator";
const internshipsRouter = Router();


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
 * @api {post} /v1/internships/ Получение списка стажировок
 */
internshipsRouter.post('/v1/internships/', async (req, res) => {

    let extended = req.body.extended || false;

    let where = await getQueryDate(req.body.where);

    try {
        let internships:any = await prisma.internships.findMany({
            take: Number(req.body.take) || 10,
            skip: Number(req.body.skip) || 0,
            orderBy: req.body.orderBy || {
                id: 'desc'
            },
            where: where
        })

        return res.status(200).json(internships);
    } catch (e){
        console.log(e);
        return res.status(500).json(e);
    }
})

internshipsRouter.post('/v1/internships/count', async (req, res) => {

        let where = await getQueryDate(req.body.where);

        try {
            let count = await prisma.internships.count({
                where: where
            })
            return res.status(200).json(count);
        } catch (e){
            return res.status(500).json(e);
        }
});

internshipsRouter.post('/v1/internships/:id', async (req, res) => {
    let id = Number(req.params.id);

    try {
        let internship = await prisma.internships.findUnique({
            where: {
                id: id
            }
        })

        return res.status(200).json(internship);
    } catch (e) {
        return res.status(500).json(e);
    }

});

internshipsRouter.delete('/v1/internships', async (req, res) => {
    let id = Number(req.query.id) || req.body.id;

    try {
        let internship = await prisma.internships.delete({
            where: {
                id: id
            }
        })
        return res.status(200).json(internship);
    } catch (e) {
        return res.status(500).json(e);
    }
})

internshipsRouter.patch('/v1/internships', async (req, res) => {
    let id = Number(req.query.id) || req.body.id;


    let data = await getQueryDate(req.body.data);

    try {
        let internship = await prisma.internships.update({
            where: {
                id: id,
            },
            data: data
        })
        return res.status(200).json(internship);
    } catch (e){
        return res.status(500).json(e);
    }
})

export default internshipsRouter;