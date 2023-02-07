import { check } from "express-validator";

export const validadorAutomovil =[
    check('modelo').not().isEmpty().withMessage('El campo modelo es requerido'),
    check('marca').not().isEmpty().withMessage('El campo marca es requerido'),
    check('año').not().isEmpty().withMessage('El campo año es requerido')
];

export const validadorAutomovilActualizar =[
    check('modelo').not().isEmpty().withMessage('El campo modelo es requerido'),
    check('marca').not().isEmpty().withMessage('El campo marca es requerido'),
    check('año').not().isEmpty().withMessage('El campo año es requerido'),
    check('idAutomovil').not().isEmpty().withMessage('El campo idAutomovil es requerido')
];