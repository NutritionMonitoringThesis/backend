import { Prisma, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { getId } from "./authController"
import moment from "moment"

const prisma = new PrismaClient()

// Read Standard givi by Umur 
export const getStandardGizi = async (req:Request, res:Response) => {
    const token = req.headers['auth'] as string
    const userId = getId(token)
    const data = req.query

    if (!data.anakId) {

        await prisma.userDetails.findUnique({
            where : {
                userId: userId
            }
        })
        .then(userDetails => {
            const tanggalLahir = userDetails?.tanggalLahir
            const tahunLahir = tanggalLahir?.getFullYear() as number
            const tanggalNow = new Date
            const tahunNow = tanggalNow.getFullYear()
            const umur = tahunNow - tahunLahir
            console.log(tahunLahir + '-' + tahunNow)
            console.log(umur)
            const gender = userDetails?.jenisKelamin
            let kelompok 

            if (gender == 'M' ) {
                kelompok = 'Laki-Laki'
            }
            else if (gender == 'F') {
                kelompok = 'Perempuan'
            }
    
            prisma.standarGizi.findFirst({
                where : {
                    akhirRentang : { gte : umur},
                    awalRentang : { lte : umur},
                    kelompok : kelompok,
                },
                include : {
                    standarGiziDetail : true
                }
            })
            .then (data => {
                // Tambahin standar kalo ibunya hamil 

                res.send({
                    success: true, 
                    message: 'Ini yah data standar gizinya.',
                    data: data
                })
            })
            .catch (err => {
                console.log(err)
                if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    if (err.code == 'P2015') {
                        res.status(404).send({ 
                            success: false,
                            message: 'Not Found!'
                        })
                        return
                    }
                }
                res.status(500).send({
                    success: false,
                    message: 'Error Occured Contact Admin'
                })
                return 
                
            })
        })
    }
    else {
        console.log('Anak Nih')
        // Query Standard Anak 
        const { anakId } = req.query

        // Check Anak Data 
        const anak = await prisma.anak.findFirstOrThrow({
            where: {
                id: anakId as string,
                parentId: userId,
            }
        })

        if (anak === null) {
            res.status(404).send({
                success: false, 
                message: 'Data anak tidak ditemukan'
            })
            return 
        }

        // Calculate Umur to Bulan and Tahun

        // If tahun < 0 konversi ke bulan 
        const tanggalLahir = moment(anak.tanggalLahir)
        const today = moment()
        const year = today.diff(tanggalLahir, 'years')
        const month = today.diff(tanggalLahir, 'months')

        // Check gender yagesya  
        const gender = anak.jenisKelamin
        let kelompok 
        if (gender == 'M' ) {
            kelompok = 'Laki-Laki'
        }
        else if (gender == 'F') {
            kelompok = 'Perempuan'
        }
        
        let umur:number 
        let satuan 

        if ( year < 1 ) {
            umur = month
            satuan = 'bulan'
        }
        else {
            umur = year
            satuan = 'tahun'
        }

        if (year < 10) kelompok = 'Bocil'

        console.log(umur + ' ' + satuan + kelompok)

        await prisma.standarGizi.findFirst({
            where: {
                satuan: satuan,
                akhirRentang: { gte: umur },
                awalRentang: { lte: umur },
                kelompok: kelompok
            },
            include: {
                standarGiziDetail: true,
            }
        })
        .then(data => {
            res.send({
                success: true,
                message: 'Ini yah standard stunting anaknya',
                data: data,
            })
        })
        .catch (err => {
            console.log(err)
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code == 'P2015') {
                    res.status(404).send({ 
                        success: false,
                        message: 'Not Found!'
                    })
                    return
                }
            }

            res.status(500).send({
                success: false,
                message: 'Error Occured Contact Admin'
            })
            return 
        })
    }
    
}