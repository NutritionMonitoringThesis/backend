import {check} from 'express-validator'
import { validator } from './baseValidator'

export const loginValidator = [
    [
        check('email')
            .notEmpty()
            .withMessage('Email tidak boleh kosong')
            .isEmail()
            .withMessage('Bener nih Emailnya?'),
        check('password')
            .notEmpty()
            .withMessage('Password tidak boleh kosong')
    ],
    validator
]

export const changePasswordValidator = [
    [
        check('password')
            .notEmpty()
            .withMessage('Pasword sekarang tidak boleh kosong'),
        check('newPassword')
            .notEmpty()
            .withMessage('Password baru tidak boleh kosong')
            .isLength({min : 8})
            .withMessage ('Pankang password harus lebih dari 8 karakter'),
        check('confirmNewPassword')
            .notEmpty()
            .withMessage('Konfirmasi Password Baru tidak boleh kosong')
            .custom(async (confirmNewPassword, {req}) => {
                const password = req.body.newPassword
                if (password !== confirmNewPassword) {
                    throw new Error('Konfirmasi Password Baru harus sama!')
                }
            }),
    ],
    validator
]