import { Router } from "express";
import { changePassword } from "../controller/authController";
import { getProfilePicture, register, updateUserDetail, uploadPP, userDetail } from "../controller/userController";
// import { profileUploader } from "../middleware/function/uploaderList";
import { checkToken } from "../middleware/security/checkToken";
import { changePasswordValidator } from "../middleware/validator/loginValidator";
import { getUserDetailValidator, registerValidator, updateUserValidator, uploadPPValidator } from "../middleware/validator/userValidator";
import { multerMid } from "../middleware/utils/multer";
import { userProfileUploader } from "../middleware/upload/userProfile";

const userRoute = Router()

userRoute
    .route('/register')
        .post(...registerValidator, register)

userRoute
    .route('/')
        .patch(checkToken, ...updateUserValidator, updateUserDetail)
        .get(checkToken, userDetail)

userRoute
    .route('/profile/:userId')
        .get(getProfilePicture)
        
userRoute 
    .route('/upload')
        .patch(checkToken, multerMid.single('image'), ...uploadPPValidator, userProfileUploader, uploadPP)

userRoute
    .route('/auth')
        .patch(checkToken, ...changePasswordValidator, changePassword)
    
export default userRoute
