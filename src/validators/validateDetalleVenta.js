import { check } from "express-validator";

export const validadorDetalleVenta =[
    check('cantidadVenta')
        .not().isEmpty().withMessage('El campo cantidadVenta es requerido').isInt({ min: 1 })
        .withMessage('El cantidadVenta debe ser un número entero positivo, minimo 1'),
    check('precioVenta')
        .not().isEmpty().withMessage('El campo precioVenta es requerido').isFloat({ min: 0 })
        .withMessage('El precioVenta debe ser un número decimal positivo'),
    check('VentumCodeVenta')
        .not().isEmpty().withMessage('El campo VentumCodeVenta es requerido'),
    check('AutoparteCodeAutoparte')
        .not().isEmpty().withMessage('El campo AutoparteCodeAutoparte es requerido'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];

export const validadorDetalleVentaActualizar =[
    check('cantidadVenta')
        .not().isEmpty().withMessage('El campo cantidadVenta es requerido').isInt({ min: 1 })
        .withMessage('El cantidadVenta debe ser un número entero positivo, minimo 1'),
    check('precioVenta')
        .not().isEmpty().withMessage('El campo precioVenta es requerido').isFloat({ min: 0 })
        .withMessage('El precioVenta debe ser un número decimal positivo'),
    check('VentumCodeVenta')
        .not().isEmpty().withMessage('El campo VentumCodeVenta es requerido'),
    check('AutoparteCodeAutoparte')
        .not().isEmpty().withMessage('El campo AutoparteCodeAutoparte es requerido'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];