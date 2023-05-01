import prisma from "../prisma/connect";
import express from "express";

export interface CustomRequest extends express.Request {
    headers: {
        authorization: string | undefined
    }
    user: Awaited<ReturnType<typeof prisma.user.findFirst>>
}