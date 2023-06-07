import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { bucket } from "../utils/storageBucket";

export const userProfileUploader = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.file) {
        res.status(400).send({
            success: false, 
            message: 'Bad Request',
        })
    }

    const file = req.file
    const fileBuffer = file?.buffer

    const extension = file?.originalname.split('.').pop();
    const filename = `/users/${uuidv4()}.${extension}`

    const storageFile = bucket.file(filename)
    const stream = storageFile.createWriteStream()

    stream.on('error', (err) => {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error Occured Contact Admin'
        })
    })

    stream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/stunted-bucket/${filename}`
        
        res.locals.publicUrl = publicUrl

        next()
    })

    stream.end(fileBuffer)
}