import {PrismaClient} from "@prisma/client";
import md5 from "md5";

(async function(){

    const prisma = new PrismaClient()

    try{
        await prisma.$connect()
        console.log('Connected to database')
    } catch (e) {
        console.log(e);
        return
    }


    try{
        await prisma.whitelist.create({
            data:{
                origin:"localhost"
            }
        })
    }
    catch (e) {
        console.log(e);
    }
    console.log('Created default whitelist')
    let role = null
    try{
        role = await prisma.users_role.create({
            data:{
                name:"admin"
            }
        })
    }
    catch (e) {
        console.log(e);
    }

    console.log('Created default admin role')

    try{
        const user = await prisma.users.create({
            data:{
                name:"admin",
                email:"",
                password:md5("rootroot"),
                role:{
                    connect:{
                        name:"admin"
                    }
                }
            }
        })
    }
    catch (e) {
        console.log(e);
    }

    console.log('Created default admin user')


    const paths = [
        "/v1/resources/addRoleAccess",
        "/v1/users/add",
        "/v1/users/get",
        "/v1/users/delete",
        "/v1/users/update",
        "/v1/grants/add",
        "/v1/grants/get",
        "/v1/grants/delete",
        "/v1/grants/update",
        "/v1/roles/add",
        "/v1/roles/get",
        "/v1/roles/delete",
    ]

    try{
        for (const path of paths) {
            await prisma.resources_access.create({
                data:{
                    path:path,
                    role: {
                        connect:{
                            id:role?.id
                        }
                    }
                }
            })
        }
    }
    catch (e) {
        console.log(e);
    }
    console.log('Created default resources access')


    const parsersParams = [
        {
            name:"fasie",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: "guap.ru",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name:"integraciya",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name:"RSCI",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name:"minobrnauki",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: "rb.ru",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: "rcfoundation",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: "sowa-ru",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: "tvoyhod",
            pagesToParse: 1,
            isEnabled: true
        },
        // {
        //     name: "cptgrantov",
        //      pagesToParse: 1,
        // isEnabled: true
        // },
        {
            name: "fadm.gov",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: "oreluniver",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: "rsv",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: "vsekonkursy",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: "eee-science",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'фонд_культ._иниц',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'президентские_гранты',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'docs.edu.gov',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'skyconf',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'sdtech',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'itonecup',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'konkurs.rcfoundation',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'премия.мывместе',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'moyastrana',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'world-it-planet',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'chemeco',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'basis-foundation',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'case-in',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'generation-startup',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'gnesin-academy',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'iclrc',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'steel2real',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'prlib',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'imoscow',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'bfsistema',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'inno-media',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'project.lanbook',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'rscf',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'ruseasons',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'sberstudent',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'start.kontur',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'smallhomeland',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'tyvigre',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'fondpotanin',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: "komissarov-foundation",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: "get-investor",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: "тымолод",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: "allfest",
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'welcomecup',
            pagesToParse: 1,
            isEnabled: true
        },
        {
            name: 'digitalwind',
            pagesToParse: 1,
            isEnabled: true
        }
    ]

    try {
        await prisma.parsers.createMany({
            data:parsersParams
        })
    } catch (e) {
        console.log(e);
    }

    console.log("created parsers");
    try {
        await prisma.appSettings.create({
            data: {
                id: 1,
                parsingEnabled: false,
                parsingInterval: new Date(1 * 3600 * 1000),
                parsersWorkTimeStart : new Date(10 * 3600 * 1000),
                parsersWorkTimeEnd : new Date(20 * 3600 * 1000),

            }
        })
    } catch (e) {
        console.log(e);
    }
    console.log("created appSettings");
})()

