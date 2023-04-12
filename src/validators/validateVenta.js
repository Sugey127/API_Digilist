import { check } from "express-validator";

export const validadorVenta =[
    check('UsuarioEmail')
        .not().isEmpty().withMessage('El campo UsuarioEmail es requerido'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];

export const validadorVentaActualizar =[
    check('idVenta')
        .not().isEmpty().withMessage('El campo idVenta es requerido'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];