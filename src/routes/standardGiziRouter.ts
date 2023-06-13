import { Router } from "express";
import { checkToken } from "../middleware/security/checkToken";
import { getStandardGizi } from "../controller/standardGiziController";

const standardGiziRouter = Router()

standardGiziRouter
    .route('/')
        .get(checkToken, getStandardGizi)

export default standardGiziRouter