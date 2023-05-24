import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getAllArticle = async (req:Request, res: Response) => {
    await prisma.educationArticle.findMany({})
    .then(allArticle => {
        console.log(allArticle)
        res.send({
            success: true,
            message: 'Ini Seluruh Artikelnya ya sayang',
            data: allArticle
        })
    })
}