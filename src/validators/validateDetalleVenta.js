import { check } from "express-validator";

export const validadorDetalleVenta =[
    check('cantidadVenta').not().isEmpty().withMessage('El campo cantidadVenta es requerido'),
    check('precioVenta').not().isEmpty().withMessage('El campo precioVenta es requerido'),
    check('VentumIdVenta').not().isEmpty().withMessage('El campo VentumIdVenta es requerido'),
    check('AutoparteIdAutopartes').not().isEmpty().withMessage('El campo AutoparteIdAutopartes es requerido'),
];

export const validadorDetalleVentaActualizar =[
    check('cantidadVenta').not().isEmpty().withMessage('El campo cantidadVenta es requerido'),
    check('precioVenta').not().isEmpty().withMessage('El campo precioVenta es requerido'),
    check('VentumIdVenta').not().isEmpty().withMessage('El campo VentumIdVenta es requerido'),
    check('AutoparteIdAutopartes').not().isEmpty().withMessage('El campo AutoparteIdAutopartes es requerido'),
];