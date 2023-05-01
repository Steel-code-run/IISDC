import prisma from "../prisma/connect";
import express from "express";

export interface CustomRequest extends express.Request {
    headers: {
        authorization: string | undefined
    },
    // роли которым доступнен ресурс
    resourceAccess: Awaited<ReturnType<typeof prisma.resources_access.findMany>>
    user: Awaited<ReturnType<typeof prisma.user.findFirst>>
}

