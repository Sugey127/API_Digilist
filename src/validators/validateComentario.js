import { check } from "express-validator";

export const validadorComentario =[
    check('comentario')
        .not().isEmpty().withMessage('El campo comentario es requerido').isLength({ min: 10, max: 200 })
        .withMessage('El comentario debe tener al menos 10 caracteres y un maximo de 200 caracteres'),
    check('UsuarioIdUsuario')
        .not().isEmpty().withMessage('El campo UsuarioIdUsuario es requerido'),
    check('AutoparteIdAutopartes')
        .not().isEmpty().withMessage('El campo AutoparteIdAutopartes es requerido')
];

export const validadorComentarioActualizar =[
    check('comentario')
        .not().isEmpty().withMessage('El campo comentario es requerido').isLength({ min: 10, max: 200 })
        .withMessage('El comentario debe tener al menos 10 caracteres y un maximo de 200 caracteres'),
    check('idComentario')
        .not().isEmpty().withMessage('El campo idComentario es requerido'),
];