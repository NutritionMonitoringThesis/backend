import {Request, Response, NextFunction } from 'express'
import { JWT_KEY } from '../../constant'
import * as jwt from 'jsonwebtoken'

export const checkToken = (req : Request, res: Response, next : NextFunction) => {
    const token = req.headers['auth'] as string || req.headers.authorization as string

    if (token == undefined) {
        res.status(401).send ({
            success: false,
            message : 'Akses ditolak'
        })
        return
    }
    else {
        const decoded = jwt.verify(token, JWT_KEY)
        console.log(decoded)
        // const decoded = jwt.decode(token, {complete: true})
        // res.locals.payload = decoded?.payload
        jwt.verify(token, JWT_KEY, (err, verified) => {
            if (err) {
                res.status(401).send({
                    success : false, 
                    err : err
                })
                return
            }
            else next()
        })
    }
}