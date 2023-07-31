import * as jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import Bcrypt, {genSalt, hash} from 'bcrypt'
import { JWT_KEY, TOKEN_VALID_TIME } from '../constant' 

const prisma = new PrismaClient()

// nterface for decoded token
interface TOKENData {
    id : string;
    email : String
}

export const login = async (req: Request, res: Response) => {
    let data = req.body 
    
    // Find the user data by email.
    prisma.user.findFirst({
        where : { 
            email: data.email
        },
        include: {
            userDetails: true,
        }
    })
    .then (user => {
        // Check if user exist or not and return abstract response for security.
        if (user == null) {
            res.status(401).send({
                success: false,
                message : "Username / Password Salah!"
            })
            return
        }
        // If user exist, comparing the password by the database using Bcrypt
        else {
            Bcrypt.compare(data.password, user.password)
            .then (async isValid => {
                // If password is valid return token by jwt with userId, and email written on token,
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
                // If password invalid return an abstract response 
                else {
                    res.status(401).send({ 
                        success: false,
                        message : 'Username / Password Salah!',
                    })
                }
            })
            .catch (err => {
                // Logging an error if happens and return template error response
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
    // Get token and userId 
    const token = req.headers['auth'] as string
    const userId = getId(token)
    // Get the request body 
    const data = req.body 
    
    // Finding user data based on userId in Token 
    prisma.user.findFirst({
        where : {
            id : userId
        }
    }).then(user => {
        // Check if user is null. 
        if (user === null) {
            res.status(404).send({
                success: false, 
                message : "Username / Password Salah!"
            })
            return
        }
        // if user exist then comparing the password
        else {
            Bcrypt.compare(data.password, user.password)
            .then(async isValid => {
                if (isValid) {
                    // if the password valid, update user password and hashing the password
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
                        // Return a response if password successfully updated
                        res.send({
                            success: true,
                            message : `Kata Sandi ${user.userDetails?.namaLengkap} telah berhasil diganti`
                        })
                    })
                }
                else {
                    // Return an obfuscated response for security 
                    res.status(400).send({
                        success: false,
                        message : "Username / Password salah!"
                    })
                }
            })
        }

    })
}

// Function for encryptyng the password
export async function decrypt(passwordPlain : string) : Promise<string> {
    const salt = await genSalt(10)
    return hash(passwordPlain, salt)
}

// Function to extract userId from token 
export const getId = (token : string) => {
    // console.log('aoeuaoeuaoeu')
    const decoded = jwt.verify(token, JWT_KEY)
    const userId = ( decoded as TOKENData ).id
    return userId
}