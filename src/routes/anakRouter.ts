import { Router } from "express";
import { checkToken } from "../middleware/security/checkToken";
import { createAnakValidator, updateAnakValidator } from "../middleware/validator/anakValidator";
import { createAnak, deleteAnak, getAnakById, getListAnak, updateAnak } from "../controller/anakController";

const anakRouter = Router()

anakRouter
    .route('/')
        .post(checkToken, ...createAnakValidator, createAnak)
        .get(checkToken, getListAnak)

anakRouter
    .route('/:anakId')
        .patch(checkToken, ...updateAnakValidator, updateAnak)
        .delete(checkToken, deleteAnak)
        .get(checkToken, getAnakById)
        
export default anakRouter