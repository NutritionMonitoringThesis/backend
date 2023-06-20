import { Request, Response, NextFunction } from "express";
import * as tf from '@tensorflow/tfjs-node'
import * as fs from "fs";
import axios from "axios";

export const FoodValidator = async (req : Request, res:Response, next:NextFunction) => {
    const path = res.locals.publicUrl
    
    const model = await tf.loadLayersModel('file://src/model/food5kdaffa/model.json')
    const foodLabel = ['Food', 'non-Food']

    // Load images from storae bucket 
    const response = await axios.get(path, { responseType: 'arraybuffer'})
    const imageBuffer = Buffer.from(response.data, 'binary')
    
    // Preprocessing 
    const decoded = tf.node.decodeImage(imageBuffer, 3)
    const resized = tf.image.resizeBilinear(decoded, [200, 200])
    const expanded = tf.expandDims(resized, 0)
    const output = model.predict(expanded) as tf.Tensor
    const result = tf.argMax(output.dataSync())
    const lobel = foodLabel[result.dataSync()[0]]
    console.log(output.dataSync())
    console.log(tf.argMax(output.dataSync()).dataSync())
    
    if (lobel == 'non-Food') {
        // fs.unlinkSync(`./${path}`)
        res.send({ 
            success: false,
            message: 'Tidak ada makanan terdeteksi. Mohon Foto ulang!'
        })
        return
    }
    else next()
}
