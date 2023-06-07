import { check } from "express-validator";
import { validator } from "./baseValidator";

export const createHistoryStuntingValidator= [
    [
        check('tinggiBadan')
        .isInt()
        .withMessage("Tinggi Badan harus berupa angka!")
        .notEmpty()
        .withMessage('Tinggi Badan tidak boleh kosong'),
        check('isTerlentang')
        .notEmpty()
        .withMessage('Status Terlentang tidak boleh kosong!')
    ],
    validator
]