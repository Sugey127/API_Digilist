import { check } from "express-validator";

export const validadorMarca =[

    check('marca')
        .not().isEmpty().withMessage('El campo marca es requerido').isLength({ min: 5 })
        .withMessage('La marca debe tener al menos 5 caracteres'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];

export const validadorMarcaActualizar =[
    check('marca')
        .not().isEmpty().withMessage('El campo marca es requerido').isLength({ min: 5 })
        .withMessage('La marca debe tener al menos 5 caracteres'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')

   
];