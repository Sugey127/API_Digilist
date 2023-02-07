import { Op } from "sequelize";
import { Comentario } from "../models/comentario.js";
import { Usuario } from "../models/usuario.js";
import { Autopartes } from "../models/autopartes.js";


//POST
export const post = async (req, res) => {
    const { comentario,UsuarioIdUsuario, AutoparteIdAutopartes } = req.body;
    try {
        const nuevoComentario = await Comentario.create({
            comentario, UsuarioIdUsuario, AutoparteIdAutopartes
        });
        res.status(201).json(nuevoComentario);

    } catch (err) {
        res.status(500).json(err);
    }
}

//PUT

export const put = async (req, res) => {
    const { idComentario, comentario } = req.body;
    try {
        const actualizarComentario = await Comentario.findOne( { where: { idComentario } })
        actualizarComentario.comentario = comentario;
        await actualizarComentario.save();
        res.status(201).json(actualizarComentario);
    } catch (err) { 
        res.status(500).json(err);
    }
}


//DELETE

export const drop = async (req, res) => {
    const { idComentario } = req.body;
    try {
        const eliminarComentario = Comentario.destroy({ where: { idComentario } });
        res.status(201).json('SE ELIMINO CON EXITO EL COMENTARIO');

    } catch (err) {
        res.status(500).json(err);
    }
}


//GET

export const getOne = async (req, res) => {
    const { idComentario } = req.body;
    try {
        const nuevoComentario = await Comentario.findOne( { where:{ idComentario } });
        res.status(201).json(nuevoComentario);

    } catch (err) {
        res.status(500).json(err);
    }
}


//GETS

export const getAll = async (req, res) => {
    try {
        const comentarios = await Comentario.findAll();
        res.status(201).json(comentarios);

    } catch (err) {
        res.status(500).json(err);
    }
}
