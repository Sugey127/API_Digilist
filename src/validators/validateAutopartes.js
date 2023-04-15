import { query } from "express-validator";

export const validadorAutoparte =[
    query('description')
        .not().isEmpty().withMessage('El campo description es requerido').isLength({ min: 10 })
        .withMessage('La descripción debe tener al menos 10 caracteres'),
    query('stockInventario')
        .not().isEmpty().withMessage('El campo stock es requerido').isInt({ min: 0 })
        .withMessage('El stock debe ser un número entero positivo'),
    query('precio')
        .not().isEmpty().withMessage('El campo precio es requerido').isFloat({ min: 0 })
        .withMessage('El precio debe ser un número decimal positivo'),
    query('code_autoparte')
        .not().isEmpty().withMessage('El campo code_autoparte es requerido'),
];

export const validadorAutoparteActualizar =[
    query('description')
        .not().isEmpty().withMessage('El campo description es requerido').isLength({ min: 10 })
        .withMessage('La descripción debe tener al menos 10 caracteres'),
    query('stockInventario')
        .not().isEmpty().withMessage('El campo stock es requerido').isInt({ min: 0 })
        .withMessage('El stock debe ser un número entero positivo'),
    query('precio')
        .not().isEmpty().withMessage('El campo precio es requerido').isFloat({ min: 0 })
        .withMessage('El precio debe ser un número decimal positivo'),
    query('Imagen')
        .not().isEmpty().withMessage('El campo Imagen es requerido'),
    query('idAutopartes')
        .not().isEmpty().withMessage('El campo idAutopartes es requerido'),
    query('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];