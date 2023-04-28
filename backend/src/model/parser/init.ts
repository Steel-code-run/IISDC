import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default function init(){
    prisma.$connect()
};