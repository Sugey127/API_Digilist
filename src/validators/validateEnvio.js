import { check } from "express-validator";

const validatEstadoPaquete = ['Preparacion', 'Pendiente','Entregado', 'Cancelado'];

export const validadorEnvio =[
    check('direccion')
        .not().isEmpty().withMessage('El campo direccion es requerido'),
    check('description')
        .not().isEmpty().withMessage('El campo description es requerido').isLength({ min: 10 })
        .withMessage('La descripción debe tener al menos 10 caracteres'),
    check('fechaEntrega')
        .not().isEmpty().withMessage('El campo fechaEntrega es requerido').isLength({ min: 10, max: 10 })
        .withMessage('La fecha debe tener el formato yyyy-mm-dd')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('La fecha debe tener el formato yyyy-mm-dd'),
    check('EstadoPaquete')
        .not().isEmpty().withMessage('El campo EstadoPaquete es requerido').isIn(validatEstadoPaquete)
        .withMessage('El EstadoPaquete proporcionado no es válido <Preparacion> || <Pendiente> || <Entregado> || <Cancelado>'),
    check('UsuarioEmail')
        .not().isEmpty().withMessage('El campo UsuarioEmail es requerido'),
    check('ReciboFolio').not().isEmpty().withMessage('El campo ReciboFolio es requerido'),
    check('codEnvio')
        .not().isEmpty().withMessage('El campo codEnvio es requerido'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];

export const validadorEnvioActualizar =[
    check('direccion')
        .not().isEmpty().withMessage('El campo direccion es requerido'),
    check('description')
        .not().isEmpty().withMessage('El campo description es requerido').isLength({ min: 10 })
        .withMessage('La descripción debe tener al menos 10 caracteres'),
    check('fechaEntrega')
        .not().isEmpty().withMessage('El campo fechaEntrega es requerido').isLength({ min: 10, max: 10 })
        .withMessage('La fecha debe tener el formato yyyy-mm-dd')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('La fecha debe tener el formato yyyy-mm-dd'),
    check('EstadoPaquete')
        .not().isEmpty().withMessage('El campo EstadoPaquete es requerido').isIn(validatEstadoPaquete)
        .withMessage('El EstadoPaquete proporcionado no es válido <Preparacion> || <Pendiente> || <Entregado> || <Cancelado>'),
    check('codEnvio')
        .not().isEmpty().withMessage('El campo codEnvio es requerido'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];