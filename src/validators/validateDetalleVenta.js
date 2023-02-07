import { check } from "express-validator";

export const validadorDetalleVenta =[
    check('cantidadVenta')
        .not().isEmpty().withMessage('El campo cantidadVenta es requerido').isInt({ min: 1 })
        .withMessage('El cantidadVenta debe ser un número entero positivo, minimo 1'),
    check('precioVenta')
        .not().isEmpty().withMessage('El campo precioVenta es requerido').isFloat({ min: 0 })
        .withMessage('El precioVenta debe ser un número decimal positivo'),
    check('VentumIdVenta')
        .not().isEmpty().withMessage('El campo VentumIdVenta es requerido'),
    check('AutoparteIdAutopartes')
        .not().isEmpty().withMessage('El campo AutoparteIdAutopartes es requerido'),
];

export const validadorDetalleVentaActualizar =[
    check('cantidadVenta')
        .not().isEmpty().withMessage('El campo cantidadVenta es requerido').isInt({ min: 1 })
        .withMessage('El cantidadVenta debe ser un número entero positivo, minimo 1'),
    check('precioVenta')
        .not().isEmpty().withMessage('El campo precioVenta es requerido').isFloat({ min: 0 })
        .withMessage('El precioVenta debe ser un número decimal positivo'),
    check('VentumIdVenta')
        .not().isEmpty().withMessage('El campo VentumIdVenta es requerido'),
    check('AutoparteIdAutopartes')
        .not().isEmpty().withMessage('El campo AutoparteIdAutopartes es requerido'),
];