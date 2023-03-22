import { check } from "express-validator";

export const validadorComentario =[
    check('comentario')
        .not().isEmpty().withMessage('El campo comentario es requerido').isLength({ min: 10, max: 200 })
        .withMessage('El comentario debe tener al menos 10 caracteres y un maximo de 200 caracteres'),
    check('UsuarioEmail')
        .not().isEmpty().withMessage('El campo UsuarioEmail es requerido'),
    check('AutoparteCodeAutoparte')
        .not().isEmpty().withMessage('El campo AutoparteCodeAutoparte es requerido'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];

export const validadorComentarioActualizar =[
    check('comentario')
        .not().isEmpty().withMessage('El campo comentario es requerido').isLength({ min: 10, max: 200 })
        .withMessage('El comentario debe tener al menos 10 caracteres y un maximo de 200 caracteres'),
    check('code_comentario')
        .not().isEmpty().withMessage('El campo code_comentario es requerido'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];