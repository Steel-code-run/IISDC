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

    await prisma.whitelist.create({
        data:{
            origin:"localhost"
        }
    })
    console.log('Created default whitelist')

    const role = await prisma.user_role.create({
        data:{
            name:"admin"
        }
    })
    console.log('Created default admin role')

    const user = await prisma.user.create({
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

    paths.forEach(async (path)=>{
        await prisma.resources_access.create({
            data:{
                path:path,
                role: {
                    connect:{
                        id:role.id
                    }
                }
            }
        })
    })

    console.log('Created default resources access')

})()

