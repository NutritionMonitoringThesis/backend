import { Request, Response } from "express";
import { getId } from "./authController";
import { Prisma, PrismaClient } from "@prisma/client";
import * as tf from '@tensorflow/tfjs-node'
import axios from "axios";

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
            message: 'Inilah History Kamu',
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

export const getStatusGiziIbuToday = async(req: Request, res: Response) => {
    const token = req.headers['auth'] as string 
    const userId = getId(token)

    await prisma.historyGizi.groupBy({
        where : {
            ibuId: userId,
            timastamp: {
            }
        },
        by: ['Zn2', 'Air', 'Ca', 'Cu', 'Energi', 'F', 'Fe2', 'Ka', 'Karbohidrat', 'Lemak', 'Na', 'Protein', 'Serat', 'VitA', 'VitB1', 'VitB2', 'VitB3', "VitC"],

    })
}

export const getHistoryGiziByTanggal = async (req: Request, res: Response) => {
    const token = req.headers['auth'] as string 
    const userId = getId(token)
    console.log(userId)

    const data = req.query

    console.log(data)

    let start:Date = new Date()
    let end:Date = new Date()

    console.log(typeof(data.date))
    if (Array.isArray(data.date)) {
        start = new Date(data.date[0] as string)
        end = new Date(data.date[1] as string)
    }

    let whereConfig = {
    }
    let by 
    
    if(data.isAnak === `true`) {
        whereConfig = {
            anakId: data.id as string,
            timastamp: {
                gte: start,
                lte: end,
            }
        }
        by = 'anakId'
    } 
    else {
        whereConfig = {
            ibuId: userId,
            timastamp: {
                gte: start,
                lte: end,
            }
        }
        by = 'ibuId'
    }

    console.log(whereConfig)
    console.log(by)

    const historyList = await prisma.historyGizi.findMany({
        where: whereConfig,
    })

    await prisma.historyGizi.aggregate({
        where: whereConfig,
        // by: [by as Prisma.HistoryGiziScalarFieldEnum],
        _sum: {
            Air: true,
            Ca: true,
            Cu: true,
            Energi: true,
            F: true,
            Fe2: true,
            Ka: true,
            Karbohidrat: true,
            Lemak: true,
            Na: true,
            Protein: true,
            Serat: true,
            VitA: true,
            VitB1: true,
            VitB2: true,
            VitB3: true,
            VitC: true,
            Zn2: true,
        }
    })
    .then(historyGizi => {
        // console.log(historyGizi)
        if(historyList.length === 0) {
            res.status(404).send({
                success: true, 
                message: 'Tidak ada history gizi pada tanggal yang dipilih'
            })
            return 
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
export const createHistoryGizi = async(req: Request, res: Response) => {
    const path = res.locals.publicUrl

    const model = await tf.loadLayersModel('file://src/model/Vall_Loss_New/model.json')
    const label = [
        'Bebek Goreng',
        'Beef Burger',
        'Cumi Cumi Goreng',
        'Gulai Kambing',
        'Gurame Asem Manis',
        'Mie Ayam',
        'Pelecing Kangung',
        'Rendang Sapi',
        'Sayur Asem',
        'Semur Jengkol',
        'Sop Buntut',
        'Soto Padang',
        'Tekwan'
    ]


    // Load images from storae bucket 
    const response = await axios.get(path, { responseType: 'arraybuffer'})

    const imageBuffer = Buffer.from(response.data, 'binary')
    // Preprocessing 
    const decoded = tf.node.decodeImage(imageBuffer)
    const resize = tf.image.resizeBilinear(decoded, [300, 300]).div(tf.scalar(255))
    const expanded = tf.expandDims(resize, 0)

    // Prediction 
    const result = model.predict(expanded) as tf.Tensor
    const labelIdx = tf.argMax(result.dataSync())
    const classLabel = label[labelIdx.dataSync()[0]]

    await prisma.giziMakanan.findFirst({
        where: {
            namaMakanan: classLabel,
        }
    })
    .then(async giziMakanan => {
        if (giziMakanan === null) {
            res.send({
                success: false, 
                message: 'Wah data gizi makanan yang dimakan belum ada nih.'
            })
        }

        const patokan = giziMakanan?.beratPerPorsi as number
        const grHabis = patokan * req.body.persenHabis
        const multiplier = grHabis / 100

        const token = req.headers['auth'] as string
        const userId = getId(token)

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
                ibuId: userId
            }
        })
        .then(history => {
            res.send({
                success: true,
                message: 'History gizi telah berhasil dibuat',
                data: {
                    class: classLabel,
                    detail: history
                }
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({
            success: false, 
            message: 'Error Occured Contact Admin.'
        })
    })
}

// Detect Makanan 
export const detectMakanan = async (req: Request, res: Response) => {
    const path = res.locals.publicUrl

    const model = await tf.loadLayersModel('file://src/model/Vall_Loss_New/model.json')
    const label = [
        'Bebek Goreng',
        'Beef Burger',
        'Cumi Cumi Goreng',
        'Gulai Kambing',
        'Gurame Asem Manis',
        'Mie Ayam',
        'Pelecing Kangung',
        'Rendang Sapi',
        'Sayur Asem',
        'Semur Jengkol',
        'Sop Buntut',
        'Soto Padang',
        'Tekwan'
    ]


    // Load images from storae bucket 
    const response = await axios.get(path, { responseType: 'arraybuffer'})

    const imageBuffer = Buffer.from(response.data, 'binary')
    // Preprocessing 
    const decoded = tf.node.decodeImage(imageBuffer)
    const resize = tf.image.resizeBilinear(decoded, [300, 300]).div(tf.scalar(255))
    const expanded = tf.expandDims(resize, 0)

    // Prediction 
    const result = model.predict(expanded) as tf.Tensor
    const labelIdx = tf.argMax(result.dataSync())
    const classLabel = label[labelIdx.dataSync()[0]]

    await prisma.giziMakanan.findFirst({
        where: {
            namaMakanan: classLabel,
        }
    })
    .then(gizi => {
        res.send({
            success: true,
            message: 'Ini Data Detail Gizinya ya bang',
            data: {
                dataGizi: gizi,
                image: path,
            },
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

// Input History Gizi Manual 
export const inputMakananManual  = async(req: Request, res: Response) => {
    const data = req.body
    const userId = getId(req.headers['auth'] as string) 

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
            ibuId: userId,
            foodUrl: data.foodUrl,
        }
    })
    .then(history => {
        res.send({
            success: true,
            message: 'Histry Gizi berhasil di update',
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

// export const getHistoryGiziById = async (req:Request, res:Response) => {
//     const { id } = req.params

//     await prisma.historyGizi.findUnique({
//         where: {
//             id: id,
//         },
//     })
//     .then (history => {
//         res.send({
//             success: true,
//             message: 'Ini yah data gizi kamuh',
//             data: history
//         })
//     })
//     .catch(err => {
//         console.log(err)
//         res.status(500).send({
//             success: false,
//             message: 'Error Occured contact Admin'
//         })
//     })
// }