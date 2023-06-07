import { Request, Response } from 'express'
import { JenisKelamin, Prisma, PrismaClient } from '@prisma/client'
import { getId } from './authController'

const prisma = new PrismaClient()

// Create Anak 
export const createAnak = (req : Request, res: Response) => {
    const token = req.headers['auth'] as string
    const userId = getId(token)
    const data = req.body as Prisma.AnakCreateInput

    prisma.userDetails.update({
        where : {
            userId : userId 
        },
        data : {
            daftarAnak : {
                create : {
                    namaLengkap : data.namaLengkap,
                    jenisKelamin : data.jenisKelamin,
                    tanggalLahir : data.tanggalLahir,
                    tempatLahir : data.tempatLahir
                }
            }
        }
    })
    .then(userDetail => {
        res.send({ message : `${data.namaLengkap} telah berhasil di input`})
    })
    .catch(error => {
        res.send({ error : error })
        if (error instanceof Prisma.PrismaClientKnownRequestError){
        }
    })
}
// Update Anak 
export const updateAnak = async (req : Request, res : Response ) => {
    const token = req.headers['auth'] as string 
    const userId = getId(token)
    const { anakId } = req.params 
    const data = req.body

    await prisma.anak.update({
        where : { 
            id : anakId,
        },
        data : {
            namaLengkap : data?.namaLengkap,
            tanggalLahir : data?.tanggalLahir,
            tempatLahir : data?.tempatLahir
        }
    })
    .then (anak => {
        res.status(500).send({ message : `${anak.namaLengkap} telah berhasil di update`})
    })
    .catch ( err => {
        console.log(err)
        res.send({ error : err})
    })
}

// Delete Anak 

export const deleteAnak = (req: Request , res: Response) => {
    const anakId = req.params.anakId
    const token = req.headers['auth'] as string
    const userId = getId(token)

    prisma.anak.delete({
        where : {
            id : anakId
        },
    })
    .then(() => {
        res.send({ message : `Data dengan id ${anakId} telah berhasil dihapus`})
    })
    .catch(err => {
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({ message : 'Not Found!'})
            }
            else if (err.code == 'P2025') {
                res.status(404).send({ message : `Data dengan id ${anakId} tidak Ditemukan`})
            }
        }
    })
}

// Read Daftar Anak All 
export const getListAnak = (req : Request, res : Response) => {
    const token = req.headers['auth'] as string || req.headers.authorization as string
    const userId = getId(token)

    prisma.userDetails.findUnique({
        where :{
            userId : userId 
        },
        include : {
            daftarAnak : true
        }
    })
    .then(userDetail => {
        if (!userDetail?.daftarAnak) {
            res.send( { message : 'Wah kamu masih belum punya anak nih ayo input data anak atau bikin anak dulu'})
        }
        res.send(userDetail?.daftarAnak)
    })
}

// Read Daftar Anak by Anak Id 
export const getAnakById = (req: Request, res: Response) => {
    const anakId = req.params.anakId
    prisma.anak.findUnique({
        where :{
            id : anakId
        }
    })
    .then(anak => {
        res.send ({ anakDetails : anak})
    })
    .catch (err => {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({ message : 'Not Found!'})
            }
        }
    })
}