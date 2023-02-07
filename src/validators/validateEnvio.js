import { check } from "express-validator";

export const validadorEnvio =[
    check('direccion').not().isEmpty().withMessage('El campo direccion es requerido'),
    check('description').not().isEmpty().withMessage('El campo description es requerido'),
    check('fechaEntrega').not().isEmpty().withMessage('El campo fechaEntrega es requerido'),
    check('EstadoPaquete').not().isEmpty().withMessage('El campo EstadoPaquete es requerido'),
    check('UsuarioIdUsuario').not().isEmpty().withMessage('El campo UsuarioIdUsuario es requerido'),
    check('ReciboIdRecibo').not().isEmpty().withMessage('El campo ReciboIdRecibo es requerido')
];

export const validadorEnvioActualizar =[
    check('direccion').not().isEmpty().withMessage('El campo direccion es requerido'),
    check('description').not().isEmpty().withMessage('El campo description es requerido'),
    check('fechaEntrega').not().isEmpty().withMessage('El campo fechaEntrega es requerido'),
    check('EstadoPaquete').not().isEmpty().withMessage('El campo EstadoPaquete es requerido'),
    check('idEnvio').not().isEmpty().withMessage('El campo idEnvio es requerido')
];