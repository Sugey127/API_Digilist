import { sequelize } from "../config/DB.js";
import { DataTypes, Op } from "sequelize";
import { Usuario } from "../models/usuario.js";
import { check } from "express-validator";


export const validateTodo = async (email, password, msg) => {
    const user = await Usuario.findOne({
        where: { [Op.and]: [{ email }, { password }] }
    });
    //null, undefined, NaN, "", [], {} son valores falsos
    if (!user) throw new Error(msg);
}



export const validaCamposUsuario = [
    check('userNombre').not().isEmpty().withMessage('El nombre es requerido'),
    check('usuarioApellido').not().isEmpty().withMessage('El apellido es requerido'),
    check('telefono').not().isEmpty().withMessage('El teléfono es requerido').isNumeric().withMessage('El teléfono debe ser un número válido'),
    check('email').not().isEmpty().withMessage('El email es requerido').isEmail().withMessage('Debe proporcionar un email valido'),
    check('password').not().isEmpty().withMessage('La contraseña es requerida').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
];

export const validaCamposUsuarioActualizar = [
    check('userNombre').not().isEmpty().withMessage('El nombre es requerido'),
    check('usuarioApellido').not().isEmpty().withMessage('El apellido es requerido'),
    check('telefono').not().isEmpty().withMessage('El teléfono es requerido').isNumeric().withMessage('El teléfono debe ser un número válido'),
    check('email').not().isEmpty().withMessage('El email es requerido').isEmail().withMessage('Debe proporcionar un email valido'),
    check('password').not().isEmpty().withMessage('La contraseña es requerida').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    check('passwordNuevo').not().isEmpty().withMessage('La contraseña es requerida').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
];

