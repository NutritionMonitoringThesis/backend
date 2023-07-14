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
        res.send({ 
            success: true,
            message : `${data.namaLengkap} telah berhasil di input`
        })
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({ 
            success: false,
            message: 'Error Occoured Contact Admin' 
        })
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
        res.send({ 
            success: true,
            message : `${anak.namaLengkap} telah berhasil di update`
        })
    })
    .catch ( err => {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Eror Occured Contact Admin',
        })
    })
}

// Delete Anak 

export const deleteAnak = async (req: Request , res: Response) => {
    const anakId = req.params.anakId
    const token = req.headers['auth'] as string
    const userId = getId(token)

    const anak = await prisma.anak.findUnique({
        where: {
            id: anakId
        },
        include: {
            historyGiziHarian: true,
            historyStunting: true,
        }
    })
    
    if (anak?.historyStunting === undefined && anak?.historyGiziHarian === undefined) {
        res.send({
            success: false,
            message: 'Data History Stunting dan History Gizi masih ada jadi tidak bisa dihapus'
        })
        return
    }
    else if (anak?.historyGiziHarian === undefined) {
        res.send({
            success: false,
            message: 'Data History Gizi masih ada jadi tidak bisa dihapus'
        })
        return
    }
    else if (anak?.historyStunting === undefined) {
        res.send({
            success: false,
            message: 'Data History Stunting masih ada jadi tidak bisa dihapus'
        })
        return
    }

    await prisma.anak.delete({
        where : {
            id : anakId
        },
    })
    .then(anak => {
        res.send({
            success: false,
            message : `Data dengan nama ${anak.namaLengkap} telah berhasil dihapus`
    })
    })
    .catch(err => {
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({ 
                    success:false,
                    message : 'Not Found!'
                })
            }
            else if (err.code == 'P2025') {
                res.status(404).send({ 
                    success: false,
                    message : `Data anak tidak Ditemukan`
                })
            }
        }
    })
}

// Read Daftar Anak All 
export const getListAnak = async (req : Request, res : Response) => {
    const token = req.headers['auth'] as string || req.headers.authorization as string
    const userId = getId(token)

    await prisma.anak.findMany({
        where :{
            parentId : userId 
        },
        orderBy: {
            tanggalLahir: 'desc',
        }
    })
    .then(daftarAnak => {
        if (daftarAnak.length === 0) {
            res.send({
                success: true,
                message : 'Wah kamu masih belum punya anak nih ayo input data anak atau bikin anak dulu'
            })
            return 
        }
        
        res.send({
            success: true,
            message: 'Ini daftar anak kamu yah kalo mau nambah bisa sama admin aja hehe.',
            data: daftarAnak
        })
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
        res.send ({ 
            success: true,
            message: 'Ini Detail anak kita yah',
            data : anak
        })
    })
    .catch (err => {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({ message : 'Not Found!'})
            }
        }
        else {
            console.log(err)
            res.status(500).send({
                success: false,
                message: 'Error Occured Contact Admin'
            })
        }
    })
}