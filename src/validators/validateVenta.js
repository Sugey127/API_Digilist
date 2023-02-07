import { check } from "express-validator";

export const validadorVenta =[
    check('idUsuario').not().isEmpty().withMessage('El campo idUsuario es requerido'),
];

export const validadorVentaActualizar =[
    check('fechaVenta')
        .not().isEmpty().withMessage('El campo fechaVenta es requerido').isLength({ min: 10, max: 10 })
        .withMessage('La fecha debe tener el formato yyyy-mm-dd')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('La fecha debe tener el formato yyyy-mm-dd'),
    check('idVenta')
        .not().isEmpty().withMessage('El campo idVenta es requerido'),
];