import { Avatares } from "../models/avatares.js";
import { RenderizadorImagen } from "../utils/RenderizadorImagenes.js";
import { JWT_KEY, SALT } from "../utils/env.js";

import { Op } from "sequelize";
import sharp from 'sharp';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RecordarPassword } from "../models/RecordarPass.js";
import { generateToken, validateToken } from "../utils/token.utilities.js";
import { Usuario } from "../models/usuario.js";
import { cloudinary } from "../middlewares/subirImagen.js";
import { sequelize } from "../config/DB.js";


//Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(req.body);
        const usuario = await Usuario.findOne({ include: { model: Avatares }, where: { [Op.and]: [{ password }, { email }] } }); 
        const token = generateToken(usuario.dataValues);
        res.cookie('token', token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true
        }); res.status(200).json([token, usuario]);
    } catch (err) {
        console.log("error:", err.message);
        res.status(500).json(err.message);
    }
}

//POST
export const registro = async (req, res) => {
    try {
        sequelize.transaction(async t => {
            const fotoPerfil = await Avatares.create({
                url: 'https://res.cloudinary.com/dyfnd46fn/image/upload/v1678336446/usuarios/digilist_default_avatar_ns5j6g.jpg',
                publicId: 'usuarios/digilist_default_avatar_ns5j6g'
            }, { transaction: t })

            console.log(fotoPerfil);

            req.body.AvatareId = fotoPerfil.dataValues.id;
            req.body.StatusId=1;
            req.body.role= "administrador";
            const usuario = await Usuario.create(req.body, { transaction: t });
            const token = generateToken(usuario.dataValues);
            res.status(201).json({ token, usuario });
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
}

//POST
export const registroCliente = async (req, res) => {
    try {
        sequelize.transaction(async t => {
            const fotoPerfil = await Avatares.create({
                url: 'https://res.cloudinary.com/dyfnd46fn/image/upload/v1678336446/usuarios/digilist_default_avatar_ns5j6g.jpg',
                publicId: 'usuarios/digilist_default_avatar_ns5j6g'
            }, { transaction: t })

            console.log(fotoPerfil);

            req.body.AvatareId = fotoPerfil.dataValues.id;
            req.body.StatusId=1;
            req.body.role= "cliente";
            const usuario = await Usuario.create(req.body, { transaction: t });
            const token = generateToken(usuario.dataValues);
            res.status(201).json({ token, usuario });
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
}

//PUT

export const put = async (req, res) => {
    try {
        let { UsuarioNombre, usuarioApellido, telefono, password, email, StatusId } = req.body;
        password = bcrypt.hashSync(password, SALT);
        const actualizarUsuario = await Usuario.findOne({ where: { [Op.and]: [{ email }, { password }] } })
        actualizarUsuario.UsuarioNombre = UsuarioNombre;
        actualizarUsuario.usuarioApellido = usuarioApellido;
        actualizarUsuario.telefono = telefono;
        actualizarUsuario.StatusId = StatusId;
        await actualizarUsuario.save();
        res.status(200).json(actualizarUsuario);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

//Cambiar Contraseña

export const cambiarPass = async (req, res) => {
    let { email, password } = req.body;
    password = bcrypt.hashSync(password, SALT);
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
        const Usuario = await Usuario.findOne({ include: { model: Avatares }, where: { email } });
        console.log(Usuario);
        const token = jwt.sign(Usuario, JWT_KEY);
        res.status(201).json([Usuario, token]);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Activo

export const getAllActivo = async (req, res) => {
    try {
        const usuario = await Usuario.findAll({ include: { model: Avatares }, where: { StatusId: 1 } });
        res.status(201).json(usuario);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const getAllInactivo = async (req, res) => {
    try {
        const usuario = await Usuario.findAll({ where: { StatusId: 2 } });
        res.status(201).json(usuario);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS

export const getAll = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ include: { model: Avatares } });
        res.status(201).json(usuarios);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const subirAvatar = async (req, res, next) => {
    try {
        const user = validateToken(req.headers.authorization);
        const buffer = await sharp(req.file.buffer).resize(250, 250).png({ quality: 100 }).toBuffer();
        cloudinary.uploader.upload_stream({ folder: 'usuarios' }, async (err, result) => {
            if (err) { console.log(err); res.status(408).json(err) }
            const avatar = await Avatares.findByPk(user.Avatares.id);
            if(avatar.dataValues.url !== 'https://res.cloudinary.com/dyfnd46fn/image/upload/v1678336446/usuarios/digilist_default_avatar_ns5j6g.jpg') {
                await cloudinary.uploader.destroy(avatar.publicId); //eliminacion de la imagen
                avatar.url = result.url;
                avatar.publicId = result.public_id;
                await avatar.save();
            }
        }).end(buffer);
        res.status(200).send('se actualizó el perfil');
    } catch (err) {
        console.log(err);
        res.send('hay un problema');
    }
};

export const eliminarAvatar = async (req, res, next) => {
    try {
        const user = validateToken(req.headers.authorization);
        cloudinary.uploader.upload_stream({ folder: 'usuarios' }, async (err, result) => {
            if (err) { console.log(err); res.status(408).json(err) }
            const avatar = await Avatares.findByPk(user.Avatares.id);
            if(avatar.dataValues.url !== 'https://res.cloudinary.com/dyfnd46fn/image/upload/v1678336446/usuarios/digilist_default_avatar_ns5j6g.jpg') {
                await cloudinary.uploader.destroy(avatar.publicId); //eliminacion de la imagen
                avatar.url = 'https://res.cloudinary.com/dyfnd46fn/image/upload/v1678336446/usuarios/digilist_default_avatar_ns5j6g.jpg'
                avatar.publicId = 'usuarios/digilist_default_avatar_ns5j6g';
                await avatar.save();
                res.status(200).send('se eliminó la foto de perfil');
            }
            res.status(406).send('no se encontró ningun contenido para eliminar');
        })
    } catch (err) {
        console.log(err);
        res.send('hay un problema');
    }
};

//todo: aun esta en desicion para su implementación
export const subirImagenFondo = async (req, res, next) => {
    try {
        const url = req.protocol + "://" + req.get('host') + '/imagenes/' + req.file.filename;

        const token = req.headrs.authorization;
        const Usuario = jwt.verify(token, process.env.JWT_KEY);
        const imagenFondo = await Avatares.update({ url }, {
            where: { id: Usuario.ImagenId }
        });
        res.status(200).json(imagenFondo);
        console.log(url)
        RenderizadorImagen(req.file.path, 100);
        res.send("imagen de fondo se actualizo con éxito")
    } catch (err) {
        res.send(err);
    }
}

export const recuperarContrasena = async (req, res) => {
    try {
        const recordaPass = await RecordarPassword.findOne({ where: { codigo: req.params.codigo } });
        if (!recordaPass?.dataValues?.codigo) {
            res.status(401).json(err);
        } else {
            const Usuario = await Usuario.update({ password: bcrypt.hashSync(cambiarContrasena.dataValues.password, SALT) }, {
                where: { email: recordaPass.dataValues.email }
            });
            await recordaPass.destroy({ where: { codigo: req.params.codigo } });
            res.status(200).render('cambiarContrasena', { Usuario });
        }
    } catch (err) {
        console.log(err);
        res.status(404).render('404');
    }
};

