import {PrismaClient} from "@prisma/client";

(async function(){

    const prisma = new PrismaClient()

    try{
        await prisma.$connect()
        console.log('Connected to database')
    } catch (e) {
        console.log(e);
        return
    }

    await prisma.whitelist.create({
        data:{
            origin:"localhost"
        }
    })
    console.log('Created default whitelist')

    await prisma.user_role.create({
        data:{
            name:"admin"
        }
    })
    console.log('Created default admin role')

    await prisma.user.create({
        data:{
            name:"admin",
            email:"",
            password:"",
            role:{
                connect:{
                    name:"admin"
                }
            }
        }
    })
    console.log('Created default admin user')

})()

