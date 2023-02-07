import { check } from "express-validator";

export const validadorEntrada =[
    check('nombreAutoparte').not().isEmpty().withMessage('El campo nombreAutoparte es requerido'),
    check('stock').not().isEmpty().withMessage('El campo stock es requerido'),
    check('precio').not().isEmpty().withMessage('El campo precio es requerido'),
    check('code_entrada').not().isEmpty().withMessage('El campo code_entrada es requerido'),
    check('AutomovilIdAutomovil').not().isEmpty().withMessage('El campo AutomovilIdAutomovil es requerido'),
    check('ProveedorIdTipoProveedor').not().isEmpty().withMessage('El campo ProveedorIdTipoProveedor es requerido')
];

export const validadorEntradaActualizar =[
    check('nombreAutoparte').not().isEmpty().withMessage('El campo nombreAutoparte es requerido'),
    check('stock').not().isEmpty().withMessage('El campo stock es requerido'),
    check('precio').not().isEmpty().withMessage('El campo precio es requerido'),
    check('code_entrada').not().isEmpty().withMessage('El campo code_entrada es requerido')
];