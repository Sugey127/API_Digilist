import { Op } from "sequelize";
import { Usuario } from "../models/usuario.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotevn from 'dotenv';
import { body } from "express-validator";

dotevn.config({ path: './.env' });

//Login
export const login = async (req, res) => {
    let { email, password } = req.body;
    // password = await bcrypt.hash(password, 10);

    console.log(password);
    try {
        console.log(req.body);
        const user = await Usuario.findOne({ where: { [Op.and]: [{ password }, { email }] } });
        const token = jwt.sign(user.dataValues, process.env.JWT_KEY);
        res.status(200).json([token, user]);
    } catch (err) {
        console.log("error:", err.message);
        res.status(500).json(err.message);
    }
}

//POST
export const registro = async (req, res) => {

    try {
        // req.body.password = await bcrypt.hash(req.body.password, 10);
        const usuarioNuevo = await Usuario.create(req.body);
        // console.log(usuarioNuevo);
        console.log(usuarioNuevo.dataValues);
        const token = jwt.sign(usuarioNuevo.dataValues, process.env.JWT_KEY);
        console.log(token);
        res.status(201).json({ token, usuarioNuevo });
    } catch (err) {
         res.status(500).json(err.message);
    }
}

//PUT

export const put = async (req, res) => {
    let { userNombre, usuarioApellido, telefono, email, password, passwordNuevo, StatusId } = req.body;
    password = await bcrypt.hash(password, 10);
    passwordNuevo = await bcrypt.hash(passwordNuevo, 10);

    try {
        const actualizarUsuario = await Usuario.findOne({ where: { [Op.and]: [{ email }, { password }] } })
        actualizarUsuario.userNombre = userNombre;
        actualizarUsuario.usuarioApellido = usuarioApellido;
        actualizarUsuario.telefono = telefono;
        actualizarUsuario.StatusId=StatusId;
        await actualizarUsuario.save();
        res.status(201).json(actualizarUsuario);
    } catch (err) {
         res.status(500).json(err.message);
    }
}

//Cambiar Contraseña

export const cambiarPass = async (req, res) => {
    let { email, password } = req.body;

    password = await bcrypt.hash(password, 10);

    try {
        const actualizarUsuario = await Usuario.findOne({ where: { email } })
        actualizarUsuario.password = password;
        await actualizarUsuario.save();
        res.status(201).json(actualizarUsuario);
    } catch (err) {
         res.status(500).json(err.message);
    }
}



//DELETE

// export const drop = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const eliminarUsuario = Usuario.destroy({ where: { email } });
//         res.status(201).json('SE ELIMINO USUARIO');

//     } catch (err) {

//          res.status(500).json(err.message);
//     }
// }


//GET

export const getOne = async (req, res) => {
    const { email } = req.query;
    console.log("email", email)
    console.log(req.query);
    try {
        const user = await Usuario.findOne({ where: { email } });
        console.log(user);
        const token = jwt.sign(user, process.env.JWT_KEY);
        res.status(201).json([user, token]);

    } catch (err) {
         res.status(500).json(err.message);
    }
}

//GETS Status Activo

export const getAllActivo = async (req, res) => {
    try {
        const { StatusId } = req.body;
        const usuario = await Usuario.findAll({ where:{ StatusId : 1 } });
        res.status(201).json(usuario);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Inactivo

export const getAllInactivo = async (req, res) => {
    try {
        const { StatusId } = req.body;
        const usuario = await Usuario.findAll({ where:{ StatusId : 2 } });
        res.status(201).json(usuario);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS

export const getAll = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(201).json(usuarios);

    } catch (err) {
         res.status(500).json(err.message);
    }
}



