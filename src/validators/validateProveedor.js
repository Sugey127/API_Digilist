import { check } from "express-validator";

export const validadorProveedor =[
    check('nombreProveedor')
        .not().isEmpty().withMessage('El campo nombreProveedor es requerido').isLength({ min: 2 })
        .withMessage('La marca debe tener al menos 2 caracteres'),
];

export const validadorProveedorActualizar =[ 
    check('nombreProveedor')
        .not().isEmpty().withMessage('El campo nombreProveedor es requerido').isLength({ min: 2 })
        .withMessage('La marca debe tener al menos 2 caracteres'),
    check('idTipoProveedor')
        .not().isEmpty().withMessage('El campo idTipoProveedor es requerido'),
    check('nombreProveedorNuevo')
        .not().isEmpty().withMessage('El campo nombreProveedorNuevo es requerido').isLength({ min: 2 })
        .withMessage('La marca debe tener al menos 2 caracteres'),
];