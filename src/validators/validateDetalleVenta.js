import { query } from "express-validator";

export const validadorDetalleVenta =[
    query('cantidadVenta')
        .not().isEmpty().withMessage('El campo cantidadVenta es requerido').isInt({ min: 1 })
        .withMessage('El cantidadVenta debe ser un número entero positivo, minimo 1'),
    query('precioVenta')
        .not().isEmpty().withMessage('El campo precioVenta es requerido').isFloat({ min: 0 })
        .withMessage('El precioVenta debe ser un número decimal positivo'),
    query('VentumIdVenta')
        .not().isEmpty().withMessage('El campo VentumCodeVenta es requerido'),
    query('AutoparteCodeAutoparte')
        .not().isEmpty().withMessage('El campo AutoparteCodeAutoparte es requerido'),
];

export const validadorDetalleVentaActualizar =[
    query('cantidadVenta')
        .not().isEmpty().withMessage('El campo cantidadVenta es requerido').isInt({ min: 1 })
        .withMessage('El cantidadVenta debe ser un número entero positivo, minimo 1'),
    query('precioVenta')
        .not().isEmpty().withMessage('El campo precioVenta es requerido').isFloat({ min: 0 })
        .withMessage('El precioVenta debe ser un número decimal positivo'),
    query('VentumIdVenta')
        .not().isEmpty().withMessage('El campo VentumCodeVenta es requerido'),
    query('AutoparteCodeAutoparte')
        .not().isEmpty().withMessage('El campo AutoparteCodeAutoparte es requerido'),
    query('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];