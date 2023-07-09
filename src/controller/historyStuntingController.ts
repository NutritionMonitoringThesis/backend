import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import moment from "moment";

const prisma = new PrismaClient()

export const createHistoryStunting = async(req: Request, res: Response) => {
    let { tinggiBadan, isTerlentang, }  = req.body
    const { anakId } = req.params

    const anak = await prisma.anak.findUnique({
        where: {
            id: anakId,
        }
    })

    const umurBulan = moment().diff(anak?.tanggalLahir, 'months')

    if (umurBulan < 24 && isTerlentang == 'false') {
        tinggiBadan = parseFloat(tinggiBadan) + 0.7
    }

    if (umurBulan > 23 && isTerlentang == 'true') {
        tinggiBadan = parseFloat(tinggiBadan) - 0.7
    }

    const standarStunting = await prisma.standardStunting.findFirst({
        where: {
            gender: anak?.jenisKelamin,
            umur: umurBulan,
        }
    })

    const sdminus2 = standarStunting?.SDMinus2 || 0
    const sdminus3 = standarStunting?.SDMinus3 || 0
    const sdplus3 = standarStunting?.SDPlus3 || 0
    let status = ''

    if (sdminus2 === 0 || sdminus3 === 0 || sdplus3 === 0) {
        res.status(404).send({ 
            success: false,
            message : 'Wah ga ada data stuting nya nih, mungkin anaknya udah terlalu tua atau terlalu muda sampe umurnya minus hehe.'
        })
        return
    }
    if (tinggiBadan < sdminus3 ) {
        status = 'Severely Stunted'
        // res.send({ message : `Beuh ini anak anda udah ga layak hidup, mending mati deh`})
    }
    if (tinggiBadan  < sdminus2  && tinggiBadan >= sdminus3) {
        status = 'Stunted'
        // res.send({ message : 'Wah anak anda stunting bu ga pantas hidup nih'})
    }
    if (tinggiBadan <= sdplus3 && tinggiBadan >=sdminus2) {
        status = 'Normal'
    }
    if (tinggiBadan > sdplus3 ) {
        status = 'Tinggi'
    }

    await prisma.historyStunting.create({
        data: {
            result: status,
            tinggiBadan: parseFloat(tinggiBadan),
            anakId: anakId,
        }
    })
    .then(history => {
        res.send({
            success: true,
            message: `${anak?.namaLengkap} talah berhasil di catat dengan status ${status}`,
            data: history,
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({
            success: false,
            massage: 'Error Occued Contact Admin'
        })
    })
}

// Delete History Stunting By Id 
export const deleteHistoryStuntingById = async (req: Request, res: Response) => {
    const { id } = req.params

    await prisma.historyStunting.delete({
        where: {
            id: id ,
        },
    })
    .then(history => {
        res.send({
            success: true,
            message: `History Stunting pada ${moment(history.timestamp).locale('id').format('dddd,dd MMMM YYYY')} telah berhasil dihapus`,
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

export const getAllHistoryStuntingByAnakId = async (req: Request, res: Response) => {
    const { anakId } = req.params
    await prisma.historyStunting.findMany({
        where: { 
            anakId: anakId,
        },
        orderBy: {
            timestamp: 'desc',
        }
    })
    .then(async history => {
        const newHistory = []
        
        const anak = await prisma.anak.findUnique({ where: { id: anakId }})
        const birthDate = moment(anak?.tanggalLahir)
        for (const detail of history) {
            const historyDate = moment(detail.timestamp)
            const selisihHari = historyDate.diff(birthDate, 'days')

            console.log(birthDate)
            console.log(historyDate)
            console.log(selisihHari)

            const newData = {
                id: detail.id,
                anakId: detail.anakId,
                result: detail.result,
                timestamp: detail.timestamp,
                tinggiBadan: detail.tinggiBadan,
                umur: `${selisihHari} hari`
            }

            newHistory.push(newData)
        }

        res.send({
            success: true,
            message: 'Ini yah riwayat stunting anak anda',
            data: newHistory
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