import { Imagenes } from "../models/avatares.js";
import { RenderizadorImagen } from "../utils/RenderizadorImagenes.js";
import { JWT_KEY } from "../utils/env.js";
import { Usuario } from "../models/usuario.js";

import { Op } from "sequelize";
import sharp from 'sharp';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Login
export const login = async (req, res) => {
    let { email, password } = req.body;
    try {
        console.log(req.body);
        const Usuario = await Usuario.findOne({ where: { [Op.and]: [{ password }, { email }] } });
        const token = jwt.sign(Usuario.dataValues, JWT_KEY);

        res.cookie('token', token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        res.status(200).json([token, Usuario]);
    } catch (err) {
        console.log("error:", err.message);
        res.status(500).json(err.message);
    }
}

//POST
export const registro = async (req, res) => {
    console.log('verificando subida...', req.file);
    try {
        const fotoPerfil = await Imagenes.create({
            url: 'http://localhost:4000/imagenes/default-profile.jpg'
        })

        console.log("antes de modificar", req.body)

        req.body.ImagenId = fotoPerfil.id;

        console.log("DESPUES DE MODIFICAR", req.body)

        // req.body.password = await bcrypt.hash(req.body.password, 10);
        const usuarioNuevo = await Usuario.create(req.body);
        const token = jwt.sign(usuarioNuevo.dataValues, JWT_KEY);
        res.status(201).json({ token, usuarioNuevo });
    } catch (err) {
        res.status(500).json(err.message);
    }
}

//PUT

export const put = async (req, res) => {

    let { UsuarioNombre, usuarioApellido, telefono, password, email, StatusId } = req.body;
    password = await bcrypt.hash(password, 10);

    try {
        const actualizarUsuario = await Usuario.findOne({ where: { [Op.and]: [{ email }, { password }] } })
        actualizarUsuario.UsuarioNombre = UsuarioNombre;
        actualizarUsuario.usuarioApellido = usuarioApellido;
        actualizarUsuario.telefono = telefono;
        actualizarUsuario.StatusId = StatusId;
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
        const Usuario = await Usuario.findOne({ where: { email } });
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
        const { StatusId } = req.body;
        const usuario = await Usuario.findAll({ where: { StatusId: 1 } });
        res.status(201).json(usuario);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const getAllInactivo = async (req, res) => {
    try {
        const { StatusId } = req.body;
        const usuario = await Usuario.findAll({ where: { StatusId: 2 } });
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

export const updatePerfil = async (req, res, next) => {  
    try {
        const buffer = await sharp(req.file.buffer).resize(150, 150).png({ quality: 100 }).toBuffer();
        cloudinary.uploader.upload_stream({ folder: 'usuarios' }, async (err, result) => {
            if (err) { console.log(err); res.status(408).json(err) }
            else {
                const oldImg = await Avatares.update(
                    { url: result.url, publicId: result.public_id }, { where: { id: jwt.verify(req.headers.authorization, JWT_KEY).Imagenes.id } });
                cloudinary.uploader.destroy(oldImg.dataValues.publicId);
            }
        }).end(buffer);
        res.status(200).send('se actualizó el perfil');
    } catch (err) {
        console.log(err);
        res.send('hay un problema');
    }
}

export const rendiImagenFondo = async (req, res, next) => {
    try {
        const url = req.protocol + "://" + req.get('host') + '/imagenes/' + req.file.filename;

        const token = req.headrs.authorization;
        const Usuario = jwt.verify(token, process.env.JWT_KEY);
        const imagenFondo = await Imagenes.update({ url }, {
            where: { id: Usuario.ImagenId }
        });

        res.status(200).json(imagenFondo);
        console.log(url)
        RenderizadorImagen(req.file.path, 100);
        res.send("imagen de fondo se actualizo con exito")
    } catch (err) {
        res.send(err);
    }
}


export const cambiarContrasena = async (req, res) => {
    try {
        const cambiarContrasena = await cambiarContrasena.findOne({ where: { codigo: req.params.codigo } });
        if (!cambiarContrasena?.codigo) {
            res.status(401).json(err);
        } else {
            const Usuario = await Usuario.update({ password: bcrypt.hashSync(cambiarContrasena.dataValues.password, SALT) }, {
                where: { email: cambiarContrasena.dataValues.email }
            })
            await cambiarContrasena.destroy({ where: { codigo: req.params.codigo } });
            res.status(200).render('cambiarContrasena', { Usuario });
        }
    } catch (err) {
        console.log(err);
        res.status(404).render('404');
    }
};

