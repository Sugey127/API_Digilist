import { check } from "express-validator";

export const validadorAutoparte =[
    check('description')
        .not().isEmpty().withMessage('El campo description es requerido').isLength({ min: 10 })
        .withMessage('La descripción debe tener al menos 10 caracteres'),
    check('stock')
        .not().isEmpty().withMessage('El campo stock es requerido').isInt({ min: 0 })
        .withMessage('El stock debe ser un número entero positivo'),
    check('precio')
        .not().isEmpty().withMessage('El campo precio es requerido').isFloat({ min: 0 })
        .withMessage('El precio debe ser un número decimal positivo'),
    check('code_autoparte')
        .not().isEmpty().withMessage('El campo code_autoparte es requerido'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];

export const validadorAutoparteActualizar =[
    check('description')
        .not().isEmpty().withMessage('El campo description es requerido').isLength({ min: 10 })
        .withMessage('La descripción debe tener al menos 10 caracteres'),
    check('stock')
        .not().isEmpty().withMessage('El campo stock es requerido').isInt({ min: 0 })
        .withMessage('El stock debe ser un número entero positivo'),
    check('precio')
        .not().isEmpty().withMessage('El campo precio es requerido').isFloat({ min: 0 })
        .withMessage('El precio debe ser un número decimal positivo'),
    check('Imagen')
        .not().isEmpty().withMessage('El campo Imagen es requerido'),
    check('idAutopartes')
        .not().isEmpty().withMessage('El campo idAutopartes es requerido'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];