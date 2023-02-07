import { check } from "express-validator";

export const validadorComentario =[
    check('comentario').not().isEmpty().withMessage('El campo comentario es requerido'),
    check('UsuarioIdUsuario').not().isEmpty().withMessage('El campo UsuarioIdUsuario es requerido'),
    check('AutoparteIdAutopartes').not().isEmpty().withMessage('El campo AutoparteIdAutopartes es requerido')
];

export const validadorComentarioActualizar =[
    check('comentario').not().isEmpty().withMessage('El campo comentario es requerido'),
    check('idComentario').not().isEmpty().withMessage('El campo idComentario es requerido'),
];