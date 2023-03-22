import { check } from "express-validator";

export const validadorProveedor =[
    check('nombreProveedor')
        .not().isEmpty().withMessage('El campo nombreProveedor es requerido').isLength({ min: 2 })
        .withMessage('La marca debe tener al menos 2 caracteres'),
    check('direccionProveedor')
        .not().isEmpty().withMessage('El campo direccionProveedor es requerido'),
    check('RfcProveedor')
        .not().isEmpty().withMessage('El campo RfcProveedor es requerido'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2'),
    check('telefonoProveedor')
        .not().isEmpty().withMessage('El teléfono es requerido').isLength({ min: 12, max: 12 })
        .withMessage('El número de teléfono debe tener 12 digitos')
        .matches(/^\d{3}-\d{3}-\d{4}$/)
        .withMessage('El número de teléfono debe tener el formato xxx-xxx-xxxx')
        .custom(value => {
            const arr = value.split('-');
        
            const [n1, n2, n3] = arr;

            // console.log(n1, n2, n3);
        
            if(typeof parseInt(n1) !== 'number') return false;
            if(typeof parseInt(n2) !== 'number') return false;
            if(typeof parseInt(n3) !== 'number') return false;

            return true;
        
        }).withMessage('no es un formato númerico'),
    check('emailProveedor')
        .not().isEmpty().withMessage('El emailProveedor es requerido').isEmail().withMessage('Debe proporcionar un emailProveedor valido, <ejemplo@gmail.com>'),
];

export const validadorProveedorActualizar =[  
    check('nombreProveedor')
        .not().isEmpty().withMessage('El campo nombreProveedor es requerido').isLength({ min: 2 })
        .withMessage('La marca debe tener al menos 2 caracteres'),
    check('direccionProveedor')
        .not().isEmpty().withMessage('El campo direccionProveedor es requerido'),
    check('RfcProveedor')
        .not().isEmpty().withMessage('El campo RfcProveedor es requerido'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2'),
    check('telefonoProveedor')
        .not().isEmpty().withMessage('El teléfono es requerido').isLength({ min: 12, max: 12 })
        .withMessage('El número de teléfono debe tener 12 digitos')
        .matches(/^\d{3}-\d{3}-\d{4}$/)
        .withMessage('El número de teléfono debe tener el formato xxx-xxx-xxxx')
        .custom(value => {
            const arr = value.split('-');
        
            const [n1, n2, n3] = arr;

            // console.log(n1, n2, n3);
        
            if(typeof parseInt(n1) !== 'number') return false;
            if(typeof parseInt(n2) !== 'number') return false;
            if(typeof parseInt(n3) !== 'number') return false;

            return true;
        
        }).withMessage('no es un formato númerico'),
    check('emailProveedor')
        .not().isEmpty().withMessage('El emailProveedor es requerido').isEmail().withMessage('Debe proporcionar un emailProveedor valido, <ejemplo@gmail.com>'),

];