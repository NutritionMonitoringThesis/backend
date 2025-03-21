import {check} from 'express-validator'
import { validator } from './baseValidator'
import { JenisKelamin } from '@prisma/client'

export const createAnakValidator = [
    [
        check('namaLengkap')
            .notEmpty()
            .withMessage('Nama Anak tidak boleh kosong'),
        check('tanggalLahir')
            .notEmpty()
            .withMessage('Tanggal Lahir tidak boleh kosong')
            .isDate()
            .withMessage('Format Tanggal Lahir tidak valid'),
        check('tempatLahir')
            .notEmpty()
            .withMessage('Tempat Lahir tidak boleh kosong')
    ],
    validator
]

export const updateAnakValidator = [
    [
        check('namaLengkap')
        .optional(),
        check('jenisKelamin')
        .optional()
        .isIn(Object.values(JenisKelamin))
        .withMessage('Jenis Kelamin tidak Valid'),
        check('tanggalLahir')
        .optional()
        .isDate()
        .withMessage('Format Tanggal Lahir tidak Valid.'),
        check('tempatLahir')
        .optional()
    ],
    validator
]

