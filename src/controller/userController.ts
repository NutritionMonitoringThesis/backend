import { NextFunction, Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import { decrypt, getId } from './authController'
import multer from 'multer'
import * as fs from 'fs'

import path from 'path'
import { ROOT_URL } from '../constant'
import { bucket } from '../middleware/utils/storageBucket'
// import { profileStorage } from '../middleware/function/storageList'
const prisma = new PrismaClient()

// Register 
export const register = async (req: Request, res : Response) => {
    const data = req.body 
    const passwordHashed = await decrypt(data.password)
    prisma.user.create({
        data: {
            email : data.email,
            password : passwordHashed,
            userDetails : {
                create : {
                    jenisKelamin : data.jenisKelamin,
                    namaLengkap : data.namaLengkap,
                    tanggalLahir: new Date (data.tanggalLahir),
                    tempatLahir : data.tempatLahir,
                }
            }
        }
    })
    .then(user => {
        res.send({
            success: true,
            message : `${user.email} telah berhasil dibuat. Silahkan Login untuk mendapatkan Token.`
        })
    })
    .catch(err => {
        // res.send(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({ 
                    success: false, 
                    message : 'Not Found!'
                })
            }
            else if (err.code == 'P2025') {
                res.status(404).send({ 
                    success: false,
                    message : `Username/Password Salah`
                })
            }
            else if (err.code == 'P2002') {
                res.status(401).send({
                    success: false,
                    message: 'Email telah digunakan'
                })
            }
    }
})
}

// Read Detail Profile 
export const userDetail = async (req: Request, res: Response) => {
    const data = req.body
    const token = req.headers['auth'] as string
    const userId = getId(token)
    const url = ROOT_URL + '/user/profile'
    const option = {
        root : path.join(__dirname)
    }

    await prisma.userDetails.findUnique({
        where: {
            userId : userId 
        }
    })
    .then(user => {
        if (user === undefined) {
            res.status(404).send ({ error : 'Not Found!'})
            return
        }
        // if(user?.profileUrl) {
        //     res.sendFile(user.profileUrl, option)
        // }
        res.send({ 
            success: true, 
            message: 'Ini Detail usernya yah',
            data : {
                namaLengkap : user?.namaLengkap,
                tempatLahir : user?.tempatLahir,
                tanggalLahir : user?.tanggalLahir as Date,
                jenisKelamin : user?.jenisKelamin,
                profileUrl : `${url}/${userId}`
            }
        })
    })
}

export const getProfilePicture = async (req: Request, res: Response) => {
    const token = req.headers['auth'] as string
    const userId = req.params.userId 
    console.log(userId)
    var option = {
        root : './'
    }
    const userDetails = await prisma.userDetails.findUnique ({
        where : {userId : userId }
    })

    if (userDetails?.profileUrl) {
        console.log(userDetails.profileUrl)
        console.log('kirim pap dulu')
        res.sendFile(userDetails.profileUrl, option)
    }
    else {
        console.log(userDetails)
        if (userDetails === null ) {
            res.send({
                success: false,
                message: 'User Not Found'
            })
            return
        }
        console.log('ga ada pap nich')
        res.send({ 
            success: false,
            message : `Ga ada Pap. Pap dulu yach!`
        })
    } 
}


// Update User Details
export const updateUserDetail = async (req : Request, res : Response) => {
    const data = req.body 
    const token = req.headers['auth'] as string
    const userId = getId(token)

    await prisma.userDetails.update({
        where : {
            userId : userId
        },
        data : {
            jenisKelamin : data?.jenisKelamin,
            namaLengkap : data?.namaLengkap,
            tanggalLahir : data?.tanggalLahir as Date,
            tempatLahir : data?.tempatLahir            
        }
    }).then (userDetails => {
        res.send({ 
            success: true,
            message : `${userDetails.namaLengkap} berhasil diperbaharui.`
        })
    }).catch (err => {
        res.send(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({
                    success: false,
                    message : 'Not Found!'
                })
            }
        }
    })
}

// Upload Profile Picture 
export const uploadPP = async (req: Request, res: Response) => {
    const path = req.file?.path
    const token = req.headers['auth'] as string
    const userId = getId(token)

    console.log(req.file)
    // Cek Profile nya ada engga 
    const userDetail = await prisma.userDetails.findUnique({
        where : { userId : userId }
    })

    const baseUrl = 'https://storage.googleapis.com/stunted-bucket/'

    if (userDetail?.profileUrl !== null) {
        console .log('ada data lama')
        bucket.file(userDetail?.profileUrl.replace(baseUrl, '') as string)
        .delete()
        .catch(err => {
            console.log(err)
        })
    }

    // res.send({message :    `masi testing`})

    await prisma.userDetails.update({
        where : { userId :userId},
        data : {
            profileUrl : res.locals.publicUrl
        }
    })
    .then (() => {
        res.send({
            success: true,
            message : 'Upload Foto Profil Berhasil!'
        }) 
    })
    
}