import * as jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import Bcrypt, {genSalt, hash} from 'bcrypt'
import { JWT_KEY, TOKEN_VALID_TIME } from '../constant' 

const prisma = new PrismaClient()

interface TOKENData {
    id : string;
    email : String
}

export const login = async (req: Request, res: Response) => {
    let data = req.body 
    // res.send({ data : data})
    prisma.user.findFirst({
        where : { 
            email: data.email
        },
        include: {
            userDetails: true,
        }
    })
    .then (user => {
        if (user == null) {
            res.status(401).send({
                success: false,
                message : "Username / Password Salah!"
            })
            return
        }
        else {
            Bcrypt.compare(data.password, user.password)
            .then (async isValid => {
                if (isValid) {
                    const token = jwt.sign({id: user?.id, email: user?.email}, JWT_KEY, {
                        expiresIn : TOKEN_VALID_TIME
                    })
                    res.send({
                        success: true,
                        message: 'Selamat Datang, kamu berhasil login yang sayang',
                        data : {
                            token: token,
                            user: user.userDetails,
                        }
                    })
                }
                else {
                    res.status(401).send({ 
                        success: false,
                        message : 'Username / Password Salah!',
                    })
                }
            })
            .catch (err => {
                console.log(err)
                res.status(401).send({
                    success: false,
                    message : "Error Occured Contact Admin"
                })
                return
            })
        }
    })
    .catch (err => console.log(err))
}

export const changePassword = async (req: Request, res: Response) => {
    const token = req.headers['auth'] as string
    const userId = getId(token)
    const data = req.body 
    prisma.user.findFirst({
        where : {
            id : userId
        }
    }).then(user => {
        if (user === null) {
            res.status(404).send({
                success: false, 
                message : "Username / Password Salah!"
            })
            return
        }
        else {
            Bcrypt.compare(data.password, user.password)
            .then(async isValid => {
                if (isValid) {
                    prisma.user.update({
                        where : {
                            id : userId
                        },
                        data :{
                            password : await decrypt(data.newPassword)
                        },
                        include : {
                            userDetails : true
                        }
                    })
                    .then(user => {
                        res.send({
                            success: true,
                            message : `Kata Sandi ${user.userDetails?.namaLengkap} telah berhasil diganti`
                        })
                    })
                }
                else {
                    res.status(400).send({
                        success: false,
                        message : "Username / Password salah!"
                    })
                }
            })
        }

    })
}

export async function decrypt(passwordPlain : string) : Promise<string> {
    const salt = await genSalt(10)
    return hash(passwordPlain, salt)
}

export const getId = (token : string) => {
    const decoded = jwt.verify(token, JWT_KEY)
    const userId = ( decoded as TOKENData ).id
    return userId
}