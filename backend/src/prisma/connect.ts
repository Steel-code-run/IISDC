import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function connect(){
    try{
        await prisma.$connect()
        console.log('Connected to database')
    } catch (e) {
        console.log('Error connecting to database, retrying in 5 seconds...')
        setTimeout(connect, 5000)
    }
}
export default prisma