import { Request, Response } from "express";
import { getId } from "./authController";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// Get all History Gizi 
export const getAllHistoryGizi = async (req: Request, res: Response) => {
    const token = req.headers['auth'] as string
    const userId = getId(token)

    await prisma.historyGizi.findMany({
        where: {
            ibuId: userId,
        },
    })
    .then( historyGizi => {
        res.send({
            success: true,
            message: historyGizi,
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

export const getHistoryGiziByDate = async (req: Request, res: Response) => {
    const token = req.headers['auth'] as string 
    const userId = getId(token)

    await prisma.historyGizi.findMany({
        where: {
            ibuId: userId,
            timastamp: {
                gte: new Date(req.params.date)
            }
        }
    })
    .then(historyGizi => {
        if(historyGizi.length === 0) {
            res.status(404).send({
                success: true, 
                message: 'Tidak ada histary gizi pada tanggal yang dipilih'
            })
        }

        res.send({
            success: true,
            message: 'Ini data historynya ya sayang. Mwah',
            data: historyGizi,
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error Occured Contact Admin'
        })
    })
}

// Delete History by Id 
export const deleteHistoryGiziById = async(req: Request, res: Response) => {
    const { id } = req.params

    await prisma.historyGizi.delete({
        where: {
            id: id
        }
    })
    .then(data => {
        res.send({
            success: true,
            message: `History gizi berhasil dihapus`
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error Occured Contact Admin'
        })
    })
}

// Read detail histary by Id 
export const getHistoryGiziById = async(req: Request, res: Response) => {
    const { id } = req.params

    await prisma.historyGizi.findUnique({
        where: {
            id: id,
        }
    })
    .then(history => {
        res.send({
            success: true,
            message: 'Ini data detail history gizi nya ya sayang',
            data: history,
        })
    })
    .catch(err => {
        console.log(err)
        res.status(5000).send({
            success: false,
            message: 'Error Occured Contact Admit',
        })
    })
}

// Input History Gizi using TF Model