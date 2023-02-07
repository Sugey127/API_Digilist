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

const validRoles = ['administrador', 'cliente'];

export const validaCamposUsuario = [
    check('userNombre')
        .not().isEmpty().withMessage('El nombre es requerido').matches(/^[a-zA-Z]+$/)
        .withMessage('El nombre solo puede contener letras'),
    check('usuarioApellido')
        .not().isEmpty().withMessage('El apellido es requerido').matches(/^[a-zA-Z]+$/)
        .withMessage('El apellido solo puede contener letras'),
    check('telefono')
        .not().isEmpty().withMessage('El teléfono es requerido').isNumeric().withMessage('El teléfono debe ser un número válido').isLength({ min: 12, max: 12 })
        .withMessage('El número de teléfono debe tener el formato xxx-xxx-xxxx')
        .matches(/^\d{3}-\d{3}-\d{4}$/)
        .withMessage('El número de teléfono debe tener el formato xxx-xxx-xxxx'),
    check('email')
        .not().isEmpty().withMessage('El email es requerido').isEmail().withMessage('Debe proporcionar un email valido, <ejemplo@gmail.com>'),
    check('password')
        .not().isEmpty().withMessage('La contraseña es requerida').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un signo'),
    check('role')
        .not().isEmpty().withMessage('El role es requerido').isIn(validRoles)
        .withMessage('El rol proporcionado no es válido <administrador> || <cliente>')
];

export const validaCamposUsuarioActualizar = [
    check('userNombre')
        .not().isEmpty().withMessage('El nombre es requerido').matches(/^[a-zA-Z]+$/)
        .withMessage('El nombre solo puede contener letras'),
    check('usuarioApellido')
        .not().isEmpty().withMessage('El apellido es requerido').matches(/^[a-zA-Z]+$/)
        .withMessage('El apellido solo puede contener letras'),
    check('telefono')
        .not().isEmpty().withMessage('El teléfono es requerido').isNumeric().withMessage('El teléfono debe ser un número válido').isLength({ min: 12, max: 12 })
        .withMessage('El número de teléfono debe tener el formato xxx-xxx-xxxx')
        .matches(/^\d{3}-\d{3}-\d{4}$/)
        .withMessage('El número de teléfono debe tener el formato xxx-xxx-xxxx'),
    check('email')
        .not().isEmpty().withMessage('El email es requerido').isEmail().withMessage('Debe proporcionar un email valido, <ejemplo@gmail.com>'),
    check('password')
        .not().isEmpty().withMessage('La contraseña es requerida').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un signo'),
    check('passwordNuevo')
        .not().isEmpty().withMessage('La contraseña es requerida').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un signo')
];

