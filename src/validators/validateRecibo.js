import { check } from "express-validator";

export const validadorRecibo =[
    check('cantidad')
        .not().isEmpty().withMessage('El campo cantidad es requerido').isFloat({ min: 0 })
        .withMessage('El cantidad debe ser un número decimal positivo'),
    check('VentumIdVenta')
        .not().isEmpty().withMessage('El campo VentumIdVenta es requerido'),
];
