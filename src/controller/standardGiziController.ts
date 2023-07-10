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
                    console.log('Wah HAmil Nih ')
                    // calculate umur kehamilan 
                    const today = moment()
                    const bulanKehamilan = today.diff(today, 'months')
                    console.log(bulanKehamilan)

                    if (bulanKehamilan > 9) {
                        res.send({
                            success: false, 
                            message: 'Wah ini usia kandungan sudah lewat dari 9 bulan jadi ini gizi tanpa kehamilan',
                            // data: data
                        })
                        return 
                    }

                    // get standar kehamilan 
                    const standarKehamilan = await prisma.standarGizi.findFirstOrThrow({
                        where: {
                            // satuan: 'bulan',
                            akhirRentang: { gte: bulanKehamilan },
                            awalRentang: { lte: bulanKehamilan },
                            kelompok: 'Hamil'
                        },
                        include: {
                            standarGiziDetail: true,
                        }
                    })

                    console.log(standarKehamilan)

                    let tempData = {
                        id: data.id,
                        standarGiziDetail: {
                            standardGiziId: data.standarGiziDetail?.standardGiziId,
                            tinggiBadan: 168,
                            beratBadan: 60,
                            VitA: (standarKehamilan.standarGiziDetail?.VitA as number) + (data.standarGiziDetail?.VitA as number),
                            VitB1: (standarKehamilan.standarGiziDetail?.VitB1 as number) + (data.standarGiziDetail?.VitB1 as number),
                            VitB2: (standarKehamilan.standarGiziDetail?.VitB2 as number) + (data.standarGiziDetail?.VitB2 as number),
                            VitB3: (standarKehamilan.standarGiziDetail?.VitB3 as number) + (data.standarGiziDetail?.VitB3 as number),
                            VitC: (standarKehamilan.standarGiziDetail?.VitC as number) + (data.standarGiziDetail?.VitC as number),
                            Energi: (standarKehamilan.standarGiziDetail?.Energi as number) + (data.standarGiziDetail?.Energi as number),
                            Protein: (standarKehamilan.standarGiziDetail?.Protein as number) + (data.standarGiziDetail?.Protein as number),
                            Lemak: (standarKehamilan.standarGiziDetail?.Lemak as number) + (data.standarGiziDetail?.Lemak as number),
                            Karbohidrat: (standarKehamilan.standarGiziDetail?.Karbohidrat as number) + (data.standarGiziDetail?.Karbohidrat as number),
                            Serat: (standarKehamilan.standarGiziDetail?.Serat as number) + (data.standarGiziDetail?.Serat as number),
                            Air: (standarKehamilan.standarGiziDetail?.Air as number) + (data.standarGiziDetail?.Air as number),
                            Ca: (standarKehamilan.standarGiziDetail?.Ca as number) + (data.standarGiziDetail?.Ca as number),
                            F: (standarKehamilan.standarGiziDetail?.F as number) + (data.standarGiziDetail?.F as number),
                            Fe2: (standarKehamilan.standarGiziDetail?.Fe2 as number) + (data.standarGiziDetail?.Fe2 as number),
                            Zn2: (standarKehamilan.standarGiziDetail?.Zn2 as number) + (data.standarGiziDetail?.Zn2 as number),
                            Ka: (standarKehamilan.standarGiziDetail?.Ka as number) + (data.standarGiziDetail?.Ka as number),
                            Na: (standarKehamilan.standarGiziDetail?.Na as number) + (data.standarGiziDetail?.Na as number),
                            Cu: (standarKehamilan.standarGiziDetail?.Cu as number) + (data.standarGiziDetail?.Cu as number)
                        }
                    }  

                    res.send({
                        success: true, 
                        message: 'Ini yah data standar gizinya ditambah dengan standar kehamilan',
                        data: tempData
                    })
                    return

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