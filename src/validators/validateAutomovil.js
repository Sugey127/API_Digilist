import { check } from "express-validator";

export const validadorAutomovil =[
    check('codeAuto')
        .not().isEmpty().withMessage('El campo codigo auto es requerido [Las 2 primeras letras de marca + los cuatro numeros del año + las cuatro ultimas letras de modelo]') .isLength({ min: 8, max: 10 })
        .withMessage('El codigo auto debe tener minimo 8 maximo 10 caracteres'),
    check('ModeloModelo')
        .not().isEmpty().withMessage('El campo modelo es requerido') .isLength({ min: 2 })
        .withMessage('El modelo debe tener al menos 2 caracteres'),
    check('MarcaMarca')
        .not().isEmpty().withMessage('El campo marca es requerido').isLength({ min: 2 })
        .withMessage('La marca debe tener al menos 2 caracteres'),
    check('YearYear').not().isEmpty().withMessage('El campo año es requerido').isInt({ min: 1900, max: new Date().getFullYear() + 1})
    .withMessage(`El año debe estar entre 1900 y ${new Date().getFullYear() +1}`),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')
];

export const validadorAutomovilActualizar =[
    check('codeAuto')
    .not().isEmpty().withMessage('El campo codigo auto es requerido [Las 2 primeras letras de marca + los cuatro numeros del año + las cuatro ultimas letras de modelo]') .isLength({ min: 8, max: 10 })
    .withMessage('El codigo auto debe tener minimo 8, maximo 10 caracteres'),
    check('StatusId')
        .not().isEmpty().withMessage('El campo StatusId es requerido').isIn([1, 2]).withMessage('El campo StatusId solo puede ser 1 o 2')

   
];