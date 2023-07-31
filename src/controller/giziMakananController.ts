import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

// GET all Makanan data from kemenkes datas 
export const getAllGiziMakanan = async(req: Request, res: Response) => {
    await prisma.giziMakanan.findMany({})
    .then(giziMakananList => {
        res.send({
            success: true,
            message: 'Ini Yah Gizi Makanannya kalo mau pilih makanan secara manual',
            data: giziMakananList,
        })
    })
}