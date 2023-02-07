import { check } from "express-validator";

export const validadorRecibo =[
    check('cantidad').not().isEmpty().withMessage('El campo cantidad es requerido'),
    check('VentumIdVenta').not().isEmpty().withMessage('El campo VentumIdVenta es requerido'),
];
