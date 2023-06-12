import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getAllGiziMakanan = async(req: Request, res: Response) => {
    await prisma.giziMakanan.findMany({})
    .then(giziMakananList => {
        res.send({
            success: true,
            message: 'Ini Yah Gizi Makanannya kalo mau pilid makanan secara manual',
            data: giziMakananList,
        })
    })
}