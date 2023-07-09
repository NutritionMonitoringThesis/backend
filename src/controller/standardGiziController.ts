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
            },
            include: {
                historyKehamilan: {
                    where: {
                        lahir: 'BELUM'
                    },
                    orderBy: {
                        tanggalHamil: 'desc'
                    },
                },
            }
        })
        .then(async userDetails => {

            console.log(userDetails?.historyKehamilan)

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
    
            await prisma.standarGizi.findFirstOrThrow({
                where : {
                    akhirRentang : { gte : umur},
                    awalRentang : { lte : umur},
                    kelompok : kelompok,
                },
                include : {
                    standarGiziDetail : true
                }
            })
            .then (async data => {
                // Tambahin standar kalo ibunya hamil 

                if (userDetails?.historyKehamilan.length as number > 0) {
                    // calculate umur kehamilan 
                    const today = moment()
                    const bulanKehamilan = today.diff(tanggalLahir, 'months')

                    if (bulanKehamilan > 9) {
                        res.send({
                            success: false, 
                            message: 'Wah ini usia kandungan sudah lewat dari 9 bulan jadi ini gizi tanpa kehamilan',
                            data: data
                        })
                        return 
                    }

                    // get standar kehamilan 
                    const standarKehamilan = await prisma.standarGizi.findFirstOrThrow({
                        where: {
                            satuan: 'bulan',
                            akhirRentang: { gte: umur },
                            awalRentang: { lte: umur },
                        },
                        include: {
                            standarGiziDetail: true,
                        }
                    })

                    // let tempData = data 

                    // tempData.standarGiziDetail.VitA  = (tempData.standarGiziDetail?.VitA as number + (standarKehamilan.standarGiziDetail?.VitA as number)) as number  
                    // tempData.standarGiziDetail.VitB1  = (tempData.standarGiziDetail?.VitB1 as number + (standarKehamilan.standarGiziDetail?.VitB1 as number)) as number  
                    // tempData.standarGiziDetail.VitB2  = (tempData.standarGiziDetail?.VitB2 as number + (standarKehamilan.standarGiziDetail?.VitB2 as number)) as number  
                    // tempData.standarGiziDetail.VitB3  = (tempData.standarGiziDetail?.VitB3 as number + (standarKehamilan.standarGiziDetail?.VitB3 as number)) as number  
                    // tempData.standarGiziDetail.VitC  = (tempData.standarGiziDetail?.VitC as number + (standarKehamilan.standarGiziDetail?.VitC as number)) as number  
                    // tempData.standarGiziDetail.Energi  = (tempData.standarGiziDetail?.Energi as number + (standarKehamilan.standarGiziDetail?.Energi as number)) as number  
                    // tempData.standarGiziDetail.Protein  = (tempData.standarGiziDetail?.Protein as number + (standarKehamilan.standarGiziDetail?.Protein as number)) as number  
                    // tempData.standarGiziDetail.Lemak  = (tempData.standarGiziDetail?.Lemak as number + (standarKehamilan.standarGiziDetail?.Lemak as number)) as number  
                    // tempData.standarGiziDetail.Karbohidrat  = (tempData.standarGiziDetail?.Karbohidrat as number + (standarKehamilan.standarGiziDetail?.Karbohidrat as number)) as number  
                    // tempData.standarGiziDetail.Serat  = (tempData.standarGiziDetail?.Serat as number + (standarKehamilan.standarGiziDetail?.Serat as number)) as number  
                    // tempData.standarGiziDetail.Air  = (tempData.standarGiziDetail?.Air as number + (standarKehamilan.standarGiziDetail?.Air as number)) as number  
                    // tempData.standarGiziDetail.Ca  = (tempData.standarGiziDetail?.Ca as number + (standarKehamilan.standarGiziDetail?.Ca as number)) as number  
                    // tempData.standarGiziDetail.F  = (tempData.standarGiziDetail?.F as number + (standarKehamilan.standarGiziDetail?.F as number)) as number  
                    // tempData.standarGiziDetail.Fe2  = (tempData.standarGiziDetail?.Fe2 as number + (standarKehamilan.standarGiziDetail?.Fe2 as number)) as number  
                    // tempData.standarGiziDetail.Zn2  = (tempData.standarGiziDetail?.Zn2 as number + (standarKehamilan.standarGiziDetail?.Zn2 as number)) as number  
                    // tempData.standarGiziDetail.Ka  = (tempData.standarGiziDetail?.Ka as number + (standarKehamilan.standarGiziDetail?.Ka as number)) as number  
                    // tempData.standarGiziDetail.Na  = (tempData.standarGiziDetail?.Na as number + (standarKehamilan.standarGiziDetail?.Na as number)) as number  
                    // tempData.standarGiziDetail.Cu  = (tempData.standarGiziDetail?.Cu as number + (standarKehamilan.standarGiziDetail?.Cu as number)) as number  

                    res.send({
                        success: true, 
                        message: 'Ini yah data standar gizinya ditambah dengan standar kehamilan',
                        data: data
                    })
                    

                }
                
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