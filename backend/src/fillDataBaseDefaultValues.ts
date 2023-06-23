import {PrismaClient} from "@prisma/client";
import md5 from "md5";

const set_resources_access = async (prisma:PrismaClient)=>{
    const paths = [
        "/v1/resources/addRoleAccess",
        "/v1/resources/removeRoleAccess",
        "/v1/users/login",
        "/v1/users",
        "/v1/users/get",
        "/v1/users/count",
        "/v1/grants/add",
        "/v1/grants/get",
        "/v1/grants/delete",
        "/v1/grants/update",
        "/v1/grants/count",
        "/v1/competitions/add",
        "/v1/competitions/get",
        "/v1/competitions/delete",
        "/v1/competitions/update",
        "/v1/competitions/count",
        "/v1/users/get",
        "/v1/users/count",
        "/v1/internships/add",
        "/v1/internships/get",
        "/v1/internships/delete",
        "/v1/internships/update",
        "/v1/internships/count",
        "/v1/roles/add",
        "/v1/roles/get",
        "/v1/roles/delete",
        "/v1/parsers",
        "/v1/parsers/count",
        "/v1/settings",
        "/v1/settings/update",
        "/v1/telegram/login",
        "/v1/accessing-logs",
        "/v1/resources/get",
        "/v1/resources/add",
        "/v1/resources/delete",
    ]

    try{
        for (const path of paths) {
            await prisma.resources_access.create({
                data:{
                    path:path,
                }
            })
        }
    }
    catch (e) {
        console.log(e);
    }
}

const set_whitelist = async (prisma:PrismaClient)=>{
    const origins = [
        "localhost",
        "0.0.0.0",
        "127.0.0.1"
    ]

    for (const origin of origins) {
        try{
            await prisma.whitelist.create({
                data:{
                    origin:origin
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    }
}

const set_roles = async (prisma:PrismaClient)=>{
    const roles = [
        'admin',
        'user'
    ]

    for (const role of roles) {
        try{
            await prisma.users_role.create({
                data:{
                    name:role
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    }
}

const set_users = async (prisma:PrismaClient)=>{
    const users = [
        {
            name:"admin",
            email:"VeryCoolAdminEmail@cool.ru",
            password:md5("rootroot"),
            role:{
                connect:{
                    name:"admin"
                }
            }
        },
        {
            name:"user",
            email:"VeryCoolUserEmail@cool.ru",
            password:md5("rootroot"),
            role:{
                connect:{
                    name:"user"
                }
            }
        }
    ]

    for (const user of users) {
        try{
            await prisma.users.create({
                data:user
            })
        }
        catch (e) {
            console.log(e);
        }
    }
}

const set_parsers = async (prisma:PrismaClient)=>{
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
        // {
        //     name: "fadm.gov",
        //     pagesToParse: 1,
        //     isEnabled: true
        // },
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
        // {
        //     name: 'фонд_культ._иниц',
        //     pagesToParse: 1,
        //     isEnabled: true
        // },
        {
            name: 'президентские_гранты',
            pagesToParse: 1,
            isEnabled: true
        },
        // {
        //     name: 'docs.edu.gov',
        //     pagesToParse: 1,
        //     isEnabled: true
        // },
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
        // {
        //     name: 'konkurs.rcfoundation',
        //     pagesToParse: 1,
        //     isEnabled: true
        // },
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
        // {
        //     name: 'project.lanbook',
        //     pagesToParse: 1,
        //     isEnabled: true
        // },
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
        // {
        //     name: 'start.kontur',
        //     pagesToParse: 1,
        //     isEnabled: true
        // },
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

}

const set_settings = async (prisma:PrismaClient) => {
    try {
        await prisma.appSettings.create({
            data: {
                parsersWorkTimeStart : new Date(10 * 3600 * 1000),
                parsersWorkTimeEnd : new Date(20 * 3600 * 1000),
            }
        })
    } catch (e) {
        console.log(e);
    }
}

(async function(){
    const prisma = new PrismaClient()


    try{
        await prisma.$connect()
        console.log('Connected to database')
    } catch (e) {
        console.log(e);
        return
    }

    console.log("установка whitelist...")
    await prisma.whitelist.deleteMany();
    await set_whitelist(prisma)

    console.log("установка resources_access...")
    await prisma.resources_access.deleteMany();
    await set_resources_access(prisma)

    console.log("установка roles...")
    await prisma.users_role.deleteMany();
    await set_roles(prisma)

    console.log("установка users...")
    await prisma.users.deleteMany();
    await set_users(prisma)

    console.log("установка parsers...")
    await prisma.parsers.deleteMany();
    await set_parsers(prisma)

    console.log("установка appSettings...")
    await prisma.appSettings.deleteMany();
    await set_settings(prisma)
})()

