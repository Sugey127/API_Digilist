import { check } from "express-validator";

export const validadorEntrada =[
    check('nombreAutoparte')
        .not().isEmpty().withMessage('El campo nombreAutoparte es requerido'),
    check('stock')
        .not().isEmpty().withMessage('El campo stock es requerido').isInt({ min: 0 })
        .withMessage('El stock debe ser un número entero positivo'),
    check('precio')
        .not().isEmpty().withMessage('El campo precio es requerido').isFloat({ min: 0 })
        .withMessage('El precio debe ser un número decimal positivo'),
    check('ModeloCodeAuto')
        .not().isEmpty().withMessage('El campo AutomovilCodeAuto es requerido'),
    check('ProveedorRfcProveedor')
        .not().isEmpty().withMessage('El campo ProveedorRfcProveedor es requerido'),
];

export const validadorEntradaActualizar =[
    check('nombreAutoparte')
        .not().isEmpty().withMessage('El campo nombreAutoparte es requerido'),
    check('stock')
        .not().isEmpty().withMessage('El campo stock es requerido').isInt({ min: 0 })
        .withMessage('El stock debe ser un número entero positivo'),
    check('precio')
        .not().isEmpty().withMessage('El campo precio es requerido').isFloat({ min: 0 })
        .withMessage('El precio debe ser un número decimal positivo'),
    check('code_entrada')
        .not().isEmpty().withMessage('El campo code_entrada es requerido'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];