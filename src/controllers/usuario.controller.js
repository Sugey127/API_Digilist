import { Op } from "sequelize";
import { Usuario } from "../models/usuario.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import dotevn from 'dotenv';
import { validateUsuario } from "../validators/validateUsuario.js";
import { body } from "express-validator";

dotevn.config({path: './.env'});
// //request = peticion, response = respuesta

export const login = async  (req, res) => {
    const { email, password} = req.body; 

    try {
        console.log(body);
        const user = await Usuario.findOne({where: {[Op.and]: [{password}, {email}]}});
        const token = jwt.sign(user, process.env.JWT_KEY); 
        res.status(200).json([token, user]);
    } catch (err) {
        res.status(500).json(err);
    }
}

//POST
export const registro = async (req, res) => {
    
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const usuarioNuevo = await Usuario.create(req.body);
        // console.log(usuarioNuevo);
        console.log(usuarioNuevo.dataValues);
        const token = jwt.sign(usuarioNuevo.dataValues, process.env.JWT_KEY);
        console.log(token);
        res.status(201).json({token ,usuarioNuevo});

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

//PUT
 
export const put = async (req, res) => {
    let { userNombre, usuarioApellido, telefono, email, password, passwordNuevo } = req.body;

        password = await bcrypt.hash(password, 10);
        passwordNuevo = await bcrypt.hash(passwordNuevo, 10);
    
    try {
        const actualizarUsuario = await Usuario.findOne({ where: { [Op.and]: [{email}, {password}] } })
        
        actualizarUsuario.userNombre = userNombre;
        actualizarUsuario.usuarioApellido = usuarioApellido;
        actualizarUsuario.telefono = telefono;
        actualizarUsuario.password = passwordNuevo;

        await actualizarUsuario.save();
        res.status(201).json(actualizarUsuario);
    } catch (err) {
        res.status(500).json(err);
    }
}


//DELETE

export const drop = async (req, res) => {
    const { email, password} = req.body;
    try {
        const eliminarUsuario = Usuario.destroy({ where: { email } });
        res.status(201).json('SE ELIMINO USUARIO');

    } catch (err) {
        
        res.status(500).json(err);
    }
}


//GET

export const getOne = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Usuario.findOne({where:{email}});
        res.status(201).json(user);

    } catch (err) {
        res.status(500).json(err);
    }
}


//GETS

export const getAll = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(201).json(usuarios);   
 
    } catch (err) { 
        res.status(500).json(err);
    }
}


// export const login = async () => {
//     const { email, password } = req.body;
// }

// export const deleteAccount = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const dropUser = Users.destroy({ where: { email } });
//         res.status(200).json(dropUser);
//     } catch (err) {

//     }
// }

// export const updateProfile = async (req, res) => {
//     const { userNombre, usuarioApellido, password, telefono } = req.body;
//     const { email } = req.query;
//     console.log(req);
//     try {
//         const changeProfile = await Users.findOne({ where: { email } })
//         console.log(changeProfile);
//         changeProfile.userNombre = userNombre;
//         changeProfile.usuarioApellido = usuarioApellido;
//         changeProfile.password = password;
//         changeProfile.telefono = telefono;
//         await changeProfile.save();

//         res.status(200).json(changeProfile);

//     } catch (err) {

//     }
// }

// export const userList = async (req, res) => {
//     try {
//         const users = await Users.findAll();
//         res.status(200).json(users);
//     } catch (err) {

//     }
// }

// export const findUsersByName = async (req, res) => {
//     const {userNombre} = req.body;
//     try {
//         const users = await Users.findAll({ where: { userNombre } });
//         res.status(200).json(users);
//     } catch (err) {

//     }
// }

// export const findUserByEmail = async(req, res)=> {
//     const {email}=req.body;
//     try {
//         const user = await Users.findOne({where:{email}});
//         res.status(200).json(user);
//     } catch (err) {
        
//     }
// }


