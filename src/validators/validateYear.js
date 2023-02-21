import { check } from "express-validator";

export const validadorYear =[
    check('YearYear').not().isEmpty().withMessage('El campo año es requerido').isInt({ min: 1900, max: new Date().getFullYear() + 1})
        .withMessage(`El año debe estar entre 1990 y ${new Date().getFullYear() +1}`),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];

export const validadorYearActualizar =[
    check('YearYear').not().isEmpty().withMessage('El campo año es requerido').isInt({ min: 1900, max: new Date().getFullYear() + 1})
        .withMessage(`El año debe estar entre 1990 y ${new Date().getFullYear() +1}`),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];