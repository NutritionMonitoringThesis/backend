import {Prisma} from '@prisma/client'
import * as fs from 'fs'


const readFile = (filePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

const parseJSON = (data:string):any => {
    try {
        return JSON.parse(data)
    }
    catch (err) {
        throw new Error('Invalid JSON Format')
    }
}

const bulkData:Prisma.GiziMakananCreateInput[] = []


const standardGiziListNew = () => {
    return bulkData as unknown as Prisma.GiziMakananCreateInput[] 
}

export default standardGiziListNew