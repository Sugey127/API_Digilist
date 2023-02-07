import { check } from "express-validator";

export const validadorAutomovil =[
    check('modelo')
        .not().isEmpty().withMessage('El campo modelo es requerido') .isLength({ min: 2 })
        .withMessage('El modelo debe tener al menos 2 caracteres'),
    check('marca')
        .not().isEmpty().withMessage('El campo marca es requerido').isLength({ min: 2 })
        .withMessage('La marca debe tener al menos 2 caracteres'),
    check('año').not().isEmpty().withMessage('El campo año es requerido').isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage(`El año debe estar entre 1900 y ${new Date().getFullYear()}`)
];

export const validadorAutomovilActualizar =[
    check('modelo')
        .not().isEmpty().withMessage('El campo modelo es requerido') .isLength({ min: 2 })
        .withMessage('El modelo debe tener al menos 2 caracteres'),
    check('marca')
        .not().isEmpty().withMessage('El campo marca es requerido').isLength({ min: 2 })
        .withMessage('La marca debe tener al menos 2 caracteres'),
    check('año').not().isEmpty().withMessage('El campo año es requerido').isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage(`El año debe estar entre 1900 y ${new Date().getFullYear()}`),
     check('idAutomovil')
        .not().isEmpty().withMessage('El campo idAutomovil es requerido')
];