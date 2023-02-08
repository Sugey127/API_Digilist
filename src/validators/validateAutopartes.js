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
    check('Imagen')
        .not().isEmpty().withMessage('El campo Imagen es requerido'),
    check('EntradaIdEntradas')
        .not().isEmpty().withMessage('El campo EntradaIdEntradas es requerido')
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
        .not().isEmpty().withMessage('El campo idAutopartes es requerido')
];