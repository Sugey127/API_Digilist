import { check } from "express-validator";

export const validadorEntrada =[
    
    check('stock')
        .not().isEmpty().withMessage('El campo stock es requerido').isInt({ min: 0 })
        .withMessage('El stock debe ser un número entero positivo'),
    check('precio')
        .not().isEmpty().withMessage('El campo precio es requerido').isFloat({ min: 0 })
        .withMessage('El precio debe ser un número decimal positivo'),
    check('ProveedorRfcProveedor')
        .not().isEmpty().withMessage('El campo ProveedorRfcProveedor es requerido'),
];

export const validadorEntradaActualizar =[
    check('stock')
        .not().isEmpty().withMessage('El campo stock es requerido').isInt({ min: 0 })
        .withMessage('El stock debe ser un número entero positivo'),
    check('precio')
        .not().isEmpty().withMessage('El campo precio es requerido').isFloat({ min: 0 })
        .withMessage('El precio debe ser un número decimal positivo'),
    
];