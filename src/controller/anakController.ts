import { Request, Response } from 'express'
import { JenisKelamin, Prisma, PrismaClient } from '@prisma/client'
import { getId } from './authController'

const prisma = new PrismaClient()

// Create Anak 
export const createAnak = (req : Request, res: Response) => {
    // Get token and userId
    const token = req.headers['auth'] as string
    const userId = getId(token)
    const data = req.body as Prisma.AnakCreateInput

    // Input data based on userId at Anak Table
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
        // Sending response if data was inputted
        res.send({ 
            success: true,
            message : `${data.namaLengkap} telah berhasil di input`
        })
    })
    .catch(error => {
        // Logging an error if error happens and return response error template
        console.log(error)
        res.status(500).send({ 
            success: false,
            message: 'Error Occoured Contact Admin' 
        })
    })
}

// Update Anak 
export const updateAnak = async (req : Request, res : Response ) => {
    // Getting userId 
    const token = req.headers['auth'] as string 
    const userId = getId(token)
    // Getting anakID and changed datas
    const { anakId } = req.params 
    const data = req.body

    // Updating the data 
    await prisma.anak.update({
        where : { 
            id : anakId,
        },
        data : {
            namaLengkap : data?.namaLengkap,
            tanggalLahir : data?.tanggalLahir,
            jenisKelamin: data?.jenisKelamin,
            tempatLahir : data?.tempatLahir
        }
    })
    .then (anak => {
        // Returning a response if the anak data was changed
        res.send({ 
            success: true,
            message : `${anak.namaLengkap} telah berhasil di update`
        })
    })
    .catch ( err => {
        // Template Error response by logging and protecting error on response
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Eror Occured Contact Admin',
        })
    })
}

// Delete Anak by ID 
export const deleteAnak = async (req: Request , res: Response) => {
    // Get anak Id 
    const anakId = req.params.anakId

    // get token and userId from token
    const token = req.headers['auth'] as string
    const userId = getId(token)

    const anak = await prisma.anak.findFirstOrThrow({
        where: {
            id: anakId,
            parentId: userId,
        },
        include: {
            historyGiziHarian: true,
            historyStunting: true,
        }
    })
    
    // Checking if anak data exist 
    if(anak === null) {
        res.send({
            success: false,
            message: 'Data anak tidak ditemukan',
        })
        return
    }

    // Protecting delete if historyStunding and histaryGizi exist
    if (anak?.historyStunting === undefined && anak?.historyGiziHarian === undefined) {
        res.send({
            success: false,
            message: 'Data History Stunting dan History Gizi masih ada jadi tidak bisa dihapus'
        })
        return
    }
    // Proceting if historyGizi is exist
    else if (anak?.historyGiziHarian === undefined) {
        res.send({
            success: false,
            message: 'Data History Gizi masih ada jadi tidak bisa dihapus'
        })
        return
    }
    // Protecting if historyStunting exist 
    else if (anak?.historyStunting === undefined) {
        res.send({
            success: false,
            message: 'Data History Stunting masih ada jadi tidak bisa dihapus'
        })
        return
    }

    // Deleting the data if pass the protection
    await prisma.anak.delete({
        where : {
            id : anakId
        },
    })
    .then(anak => {
        // Return a response if data was deleted
        res.send({
            success: false,
            message : `Data dengan nama ${anak.namaLengkap} telah berhasil dihapus`
    })
    })
    .catch(err => {
        // Logging an error 
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // Return an error if data was not found
            if (err.code == 'P2015') {
                res.status(404).send({ 
                    success:false,
                    message : 'Not Found!'
                })
            }
            // Return an error if data empty.
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
    // Get Token and Extract UserId
    const token = req.headers['auth'] as string || req.headers.authorization as string
    const userId = getId(token)

    // Getting all anak data which has parentId like userId and sortting descending by Tanggal Lahir
    await prisma.anak.findMany({
        where :{
            parentId : userId 
        },
        orderBy: {
            tanggalLahir: 'desc',
        }
    })
    .then(daftarAnak => {
        // Custom Response if daftar anak null
        if (daftarAnak.length === 0) {
            res.send({
                success: true,
                message : 'Wah kamu masih belum punya anak nih ayo input data anak.'
            })
            return 
        }
        
        // Return anak data and response message and success status
        res.send({
            success: true,
            message: 'Ini daftar anak kamu yah kalo mau nambah bisa sama admin aja hehe.',
            data: daftarAnak
        })
    })
}

// Read Daftar Anak by Anak Id 
export const getAnakById = (req: Request, res: Response) => {
    // get anakId from param
    const anakId = req.params.anakId
    
    // getting the detail
    prisma.anak.findUnique({
        where :{
            id : anakId
        }
    })
    .then(anak => {
        // Returning a response and anak datas
        res.send ({ 
            success: true,
            message: 'Ini Detail anak kita yah',
            data : anak
        })
    })
    .catch (err => {
        // returning an error if data not found or logging when error happens.
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