import { Prisma, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { getId } from "./authController"

const prisma = new PrismaClient()

// Read Standard givi by Umur 
export const getStandardGizi = async (req:Request, res:Response) => {
    const token = req.headers['auth'] as string
    const userId = getId(token)

    prisma.userDetails.findUnique({
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
            // console.log(data)
            res.send({
                success: true, 
                message: 'Ini yah data standar stuntingnya, semoga anak anda tidak stunting hehe.',
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
            
        })
    })
}