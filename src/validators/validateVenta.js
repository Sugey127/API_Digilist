import { check } from "express-validator";

export const validadorVenta =[
    check('UsuarioEmail')
        .not().isEmpty().withMessage('El campo UsuarioEmail es requerido'),
    check('code_venta')
        .not().isEmpty().withMessage('El campo code_venta es requerido'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];

export const validadorVentaActualizar =[
    check('code_venta')
        .not().isEmpty().withMessage('El campo code_venta es requerido'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];