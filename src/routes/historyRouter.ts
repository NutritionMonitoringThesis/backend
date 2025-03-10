import { Router } from "express";
import { checkToken } from "../middleware/security/checkToken";
import { createHistoryGizi, deleteHistoryGiziById, detectMakanan, getAllHistoryGizi, getHistoryGiziById, getHistoryGiziByTanggal, inputMakananManual } from "../controller/historyGiziController";
import { createKehamilanValidator, updateKehamilanByIdValidator } from "../middleware/validator/historyKehamilanValidator";
import { createKehamilan, deleteHistoryKehamilanById, getAllHistoryKehamilan, updateHistoryKehamilanById } from "../controller/historyKehamilanController";
import { createHistoryStunting, deleteHistoryStuntingById, getAllHistoryStuntingByAnakId } from "../controller/historyStuntingController";
import { createHistoryStuntingValidator } from "../middleware/validator/historyStuntingValidator";
import { multerMid } from "../middleware/utils/multer";
import { giziUploader } from "../middleware/upload/userProfile";
import { FoodValidator } from "../middleware/validator/foodValidator";
import { getAllHistoryGiziByAnakId, inputHistoryGiziAnakManual } from "../controller/historyGiziAnakController";

const historyRouter = Router()

historyRouter
    .route('/gizi')
        .get(checkToken, getAllHistoryGizi)
        .post(checkToken, multerMid.single('image'), giziUploader, FoodValidator, createHistoryGizi)

historyRouter
    .route('/detect')
        .post(checkToken, multerMid.single('image'), giziUploader, FoodValidator, detectMakanan)

historyRouter
    .route('/gizi/manual')
        .post(checkToken, inputMakananManual)

historyRouter
    .route('/gizi/anak/:id')
        .post(checkToken, inputHistoryGiziAnakManual)
        .get(checkToken, getAllHistoryGiziByAnakId)

historyRouter
    .route('/gizi/:id')
        .get(checkToken, getHistoryGiziById)
        .delete(checkToken, deleteHistoryGiziById)

historyRouter   
    .route('/status-gizi/')
        .get(checkToken, getHistoryGiziByTanggal)

historyRouter
    .route('/kehamilan')
        .post(checkToken, ...createKehamilanValidator, createKehamilan)
        .get(checkToken, getAllHistoryKehamilan)

historyRouter
    .route('/kehamilan/:id')
        .patch(checkToken, ...updateKehamilanByIdValidator, updateHistoryKehamilanById)
        .delete(checkToken, deleteHistoryKehamilanById)

historyRouter
    .route('/stunting/:id')
        .delete(checkToken, deleteHistoryStuntingById)

historyRouter   
    .route('/stunting/:anakId')
        .get(checkToken, getAllHistoryStuntingByAnakId)
        .post(checkToken, ...createHistoryStuntingValidator, createHistoryStunting)

export default historyRouter