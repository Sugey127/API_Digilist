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
    check('UsuarioIdUsuario')
        .not().isEmpty().withMessage('El campo UsuarioIdUsuario es requerido'),
    check('ReciboIdRecibo').not().isEmpty().withMessage('El campo ReciboIdRecibo es requerido')
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
    check('idEnvio')
        .not().isEmpty().withMessage('El campo idEnvio es requerido')
];