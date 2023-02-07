import { check } from "express-validator";

export const validadorVenta =[
    check('idUsuario').not().isEmpty().withMessage('El campo idUsuario es requerido'),
];

export const validadorVentaActualizar =[
    check('fechaVenta').not().isEmpty().withMessage('El campo fechaVenta es requerido'),
    check('idVenta').not().isEmpty().withMessage('El campo idVenta es requerido'),
];