import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const inputHistoryGiziAnakManual = async(req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body

    const giziMakanan = await prisma.giziMakanan.findUnique({
        where: {
            id: data.giziId
        }
    })

    const patokan = giziMakanan?.beratPerPorsi as number
    const grHabis = patokan * req.body.persenHabis
    const multiplier = grHabis / 100

    await prisma.historyGizi.create({
        data: {
            namaMakanan : giziMakanan?.namaMakanan as string,
            Air : giziMakanan?.Air as number * multiplier,
            Ca : giziMakanan?.Ca as number * multiplier,
            Cu : giziMakanan?.Cu as number * multiplier,
            Energi : giziMakanan?.Energi as number * multiplier,
            F : giziMakanan?.F as number * multiplier, 
            Fe2 : giziMakanan?.Fe2 as number * multiplier,
            Ka : giziMakanan?.Ka as number * multiplier,
            Karbohidrat : giziMakanan?.Karbohidrat as number * multiplier,
            Lemak : giziMakanan?.Lemak as number * multiplier,
            Na : giziMakanan?.Na as number * multiplier,
            Protein : giziMakanan?.Protein as number * multiplier,
            Serat : giziMakanan?.Serat as number * multiplier,
            VitA : giziMakanan?.VitA as number * multiplier,
            VitB1 : giziMakanan?.VitB1 as number * multiplier,
            VitB2 : giziMakanan?.VitB2 as number * multiplier,
            VitB3 : giziMakanan?.VitB3 as number * multiplier,
            VitC : giziMakanan?.VitC as number * multiplier,
            Zn2 : giziMakanan?.Zn2 as number * multiplier,
            persentaseHabis : parseFloat(req.body.persenHabis),
            timastamp: new Date(),
            anakId: id,
            foodUrl: data.foodUrl
        }
    })
    .then(history => {
        res.send({
            success: true,
            message: 'Histry Gizi Anak anda berhasil di update',
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error Occured Contact Admin',
        })
    })
}

// Get all History Gizi By Anak Id
export const getAllHistoryGiziByAnakId = async (req: Request, res: Response) => {
    const token = req.headers['auth'] as string
    const { id } = req.params

    await prisma.historyGizi.findMany({
        where: {
            anakId: id,
        },
    })
    .then( historyGizi => {
        res.send({
            success: true,
            message: 'Inilah History Anak anda yah',
            data: historyGizi,
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error Occured Contact Admin',
        })
    })
}