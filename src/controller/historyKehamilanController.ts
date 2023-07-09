import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getId } from "./authController";
import moment from "moment";

const prisma = new PrismaClient()

export const createKehamilan = async (req: Request, res: Response) => {
    const data = req.body as Prisma.HistoryKehamilanCreateInput
    const token = req.headers['auth'] as string 
    const userId = getId(token)

    await prisma.historyKehamilan.create({
        data: {
            lahir: data.lahir,
            tanggalHamil: new Date(data.tanggalHamil),
            tanggalKelahiran: data?.tanggalKelahiran,
            userDetail: {
                connect: {
                    userId: userId
                }
            }
        }
    })
    .then(() => {
        res.send({
            success: true,
            message: 'Data Kehamilan telah berhasil di input. Akhirnya bisa enak enak lagi'
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

// Update history kehamian by ID 
export const updateHistoryKehamilanById = async (req: Request, res: Response) => {
    const { id } = req.params    
    const data = req.body as Prisma.HistoryKehamilanUpdateInput

    await prisma.historyKehamilan.update({
        where: {
            id: id
        },
        data: {
            lahir: data.lahir,
            tanggalHamil: new Date(data.tanggalHamil as string),
            tanggalKelahiran: new Date(data.tanggalKelahiran as string),
        }
    })
    .then(historyKehamilan => {
        res.send({
            success: true,
            message: 'Data kehamilan sudah berhasil di update. Anaknya udah lahir ya? Dah bisa enak enak lagi tuh si bapake hehe.'
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

// Read all history kehamilan 
export const getAllHistoryKehamilan = async(req: Request, res:Response) => {
    const token = req.headers['auth'] as string
    const userId = getId(token)

    await prisma.historyKehamilan.findMany({
        where: {
            userDetail: {
                userId: userId
            }
        },
        orderBy: {
            tanggalHamil: 'desc',
        },
    })
    .then(historyKehamilan => {
        if(historyKehamilan.length === 0) {
            res.status(404).send({
                success: true,
                message: 'Wah belum ada nih riwayat kehamilannya. Yuk buat anak dulu yuk. Kalo ga ada suami sama admin ajah.'
            })
            return 
        }

        res.send({
            success: true,
            message: 'Ini ya history kehamilannya',
            data: historyKehamilan,
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

// Read History Kehamilan By Id 
export const getHistoryKehamilanById = async (req: Request, res: Response) => {
    const { id } = req.params

    await prisma.historyKehamilan.findUniqueOrThrow({
        where: {
            id: id
        }
    })
    .then( history => {
        res.send({
            success: true,
            message: `Ini data history kehamilannya yah`,
            data: history
        })
    })
    .catch(err => {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2015') {
                res.status(404).send({
                    success: false,
                    message: 'Wah detailnya tidak ditemukan nih, Ayo buat dulu ya bunda hehe.'
                })
                return
            }
        }

        res.status(500).send({
            success: false, 
            message: 'Error Occured Contact Admin'
        })
    })
}

// Delete Histary Kehamilan By ID 
export const deleteHistoryKehamilanById = async(req: Request, res: Response) => {
    const { id } = req.params

    await prisma.historyKehamilan.delete({
        where: {
            id: id,
        }
    })
    .then (data => {
        res.send({
            success: true,
            message: `History Kehamilan pada ${moment(data.tanggalHamil).locale('id').format('dddd, D MMMM YYYY')} telah berhasil di hapus. Ayo bisa yok buat anak lagi.`
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error Occurod Contact Admin.'
        })
    })
}