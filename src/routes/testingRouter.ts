import { Request, Response, Router } from "express";
import { bucket } from "../middleware/utils/storageBucket";
import { multerMid } from "../middleware/utils/multer";
import { v4 as uuid } from 'uuid'

const testingRouter = Router()

testingRouter   
    .route('/')
        .post(multerMid.single('image'), async (req: Request, res: Response) => {
            console.log(req.file)
            if (!req.file) {
                return res.status(400).send({
                    message: 'Bad Request!'
                })
            }

            const file = req.file
            const fileBuffer = file?.buffer
            
            const extension = file.originalname.split('.').pop()
            const filename = `${uuid()}.${extension}`

            const storageFile = bucket.file(filename)
            
            const stream = storageFile.createWriteStream()

            stream.on('error', (err) => {
                console.log(err)
                res.status(500).send({
                    success: false,
                    message: 'Error Uploading File'
                })
            })

            stream.on('finish', () => {
                const publicUrl = `https://storage.googleapis.com/stunted-bucket/${filename}`
                
                res.locals.publicUrl = publicUrl
                
                res.send({
                    success: true,
                    message: 'aeua',
                    publicUrl: publicUrl
                })
            })

            stream.end(fileBuffer)


            // console.log('sini bang')
            // await bucket.upload('./', {
            //     destination: 'aoeua.jpg',
            // })
            // .then(oeu => {
            //     res.send({
            //         message: 'Udah bang!'
            //     })
            // })
            // .catch(err => {
            //     console.log(err)
            // } )

        })

export default testingRouter