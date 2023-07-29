import {check} from 'express-validator'
import { validator } from './baseValidator'
import { JenisKelamin } from '@prisma/client'
import * as fs from 'fs'

export const registerValidator = [
    [
        check('email')
            .isEmail()
            .withMessage('Email tidak Valid')
            .notEmpty()
            .withMessage('Email tidak boleh kosong'),
        check('password')
            .notEmpty()
            .withMessage('Password tidak boleh kosong'),
            // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
            // .withMessage('Password harus memiliki satu huruf kecil, satu huruf besar, angka, dan simbol.'),
        check('confirmPassword')
            .notEmpty()
            .withMessage('Konfirmasi Password tidak boleh kosong')
            .custom(async (confirmPassword, {req}) => {
                const password = req.body.password
                if (password !== confirmPassword) {
                    throw new Error('Konfirmasi Password harus sama!')
                }
            }),
        check('jenisKelamin')
            .notEmpty()
            .withMessage('Jenis Kelamin tidak boleh kosong')
            .isIn(Object.values(JenisKelamin))
            .withMessage('Jenis Kelamin tidak Valid'),
        check('namaLengkap')
            .notEmpty()
            .withMessage('Nama Lengkap tidak boleh kosong'),
            // .isAlpha()
            // .withMessage('Nama Lengkap hanya boleh terdiri dari huruf'),
        check('tempatLahir')
            .notEmpty()
            .withMessage('Tempat Lahir tidak boleh kosong'),
        check('tanggalLahir')
            .notEmpty()
            .withMessage('Tanggal Lahir tidak boleh kosong')
            .isDate()
            .withMessage('Tanggal Lahir tidak valid silahkan input ulang')
    ],
    validator
]

export const updateUserValidator = [
    [
    check('userId')
        .optional()
        .isInt()
        .withMessage('User ID tidak valid silahkxan input ulang'),
        check('jenisKelamin')
        .optional()
        .isIn(Object.values(JenisKelamin))
        .withMessage('Jenis Kelamin tidak Valid'),
        check('namaLengkap')
        .optional(),
        check('Tanggal Lahir')
        .optional()
        .isDate()
        .withMessage('Tanggal Lahir tidak valid silahkan input ulang')
    ],
    validator
]

export const getUserDetailValidator = [
    [
        check('userId')
            .notEmpty()
            .withMessage('User ID tidak boleh kosong')
            .isInt()
            .withMessage('User ID tidak valid silahkan input ulang')
    ],
    validator
]

export const uploadPPValidator = [
    [
        check('profilePicture')
            .custom((value, {req}) => {
                // console.log(req.file)
                if (req.file.mimetype === 'image/png' || req.file?.mimetype === 'image/jpg' || req.file?.mimetype == 'image/jpeg') {
                    // console.log('tembus')
                    return '.jpg' || '.jpeg' || '.png'
                }
                else {
                    fs.unlinkSync('./'+req.file.path)
                    return false
                }
            })
            .withMessage('Format File Tidak Valid!')
    ],
    validator
]