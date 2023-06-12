import { Router } from "express";
import { checkToken } from "../middleware/security/checkToken";
import { getAllGiziMakanan } from "../controller/giziMakananController";

const giziRouter = Router()

giziRouter
    .route('/')
        .get(checkToken, getAllGiziMakanan)

export default giziRouter