import { check } from "express-validator";

export const validadorModelo =[

    check('modelo')
        .not().isEmpty().withMessage('El campo modelo es requerido').isLength({ min: 5 })
        .withMessage('La modelo debe tener al menos 5 caracteres'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2'),
    check('YearYear')
        .not().isEmpty().withMessage('El campo YearYear es requerido')
];

export const validadorModeloActualizar =[
    check('modelo')
        .not().isEmpty().withMessage('El campo modelo es requerido').isLength({ min: 5 })
        .withMessage('La modelo debe tener al menos 5 caracteres'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')

   
];