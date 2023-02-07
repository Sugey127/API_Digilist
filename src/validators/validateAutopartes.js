import { check } from "express-validator";

export const validadorAutoparte =[
    check('description').not().isEmpty().withMessage('El campo description es requerido'),
    check('stock').not().isEmpty().withMessage('El campo stock es requerido'),
    check('precio').not().isEmpty().withMessage('El campo precio es requerido'),
    check('Imagen').not().isEmpty().withMessage('El campo Imagen es requerido'),
    check('idEntradas').not().isEmpty().withMessage('El campo idEntradas es requerido')
];

export const validadorAutoparteActualizar =[
    check('description').not().isEmpty().withMessage('El campo description es requerido'),
    check('stock').not().isEmpty().withMessage('El campo stock es requerido'),
    check('precio').not().isEmpty().withMessage('El campo precio es requerido'),
    check('Imagen').not().isEmpty().withMessage('El campo Imagen es requerido'),
    check('idAutopartes').not().isEmpty().withMessage('El campo idAutopartes es requerido')
];