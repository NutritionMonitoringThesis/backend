import { Router } from 'express'
import { login } from '../controller/authController'
import { loginValidator } from '../middleware/validator/loginValidator'

const loginRoute = Router ()

loginRoute
    .route('/')
        .post(...loginValidator, login)

export default loginRoute