import { check } from "express-validator";

export const validadorProveedor =[
    check('nombreProveedor').not().isEmpty().withMessage('El campo nombreProveedor es requerido'),
];

export const validadorProveedorActualizar =[
    check('nombreProveedor').not().isEmpty().withMessage('El campo nombreProveedor es requerido'),
    check('idTipoProveedor').not().isEmpty().withMessage('El campo idTipoProveedor es requerido'),
    check('nombreProveedorNuevo').not().isEmpty().withMessage('El campo nombreProveedorNuevo es requerido'),
];