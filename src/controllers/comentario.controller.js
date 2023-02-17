import { Op } from "sequelize";
import { Comentario } from "../models/comentario.js";
import { Usuario } from "../models/usuario.js";
import { Autopartes } from "../models/autopartes.js";


//POST
export const post = async (req, res) => {
    const { comentario,code_comentario,UsuarioEmail, AutoparteCodeAutoparte,StatusId } = req.body;
    try {
        const nuevoComentario = await Comentario.create({
            comentario,code_comentario, UsuarioEmail, AutoparteCodeAutoparte,StatusId
        });
        res.status(201).json(nuevoComentario);

    } catch (err) {
        res.status(500).json(err);
    }
}

//PUT

export const put = async (req, res) => {
    const { code_comentario,StatusId } = req.body;
    try {
        const actualizarComentario = await Comentario.findOne( { where: { code_comentario } })
        actualizarComentario.StatusId = StatusId;
        await actualizarComentario.save();
        res.status(201).json(actualizarComentario);
    } catch (err) { 
        res.status(500).json(err);
    }
}


//DELETE

// export const drop = async (req, res) => {
//     const { code_comentario } = req.body;
//     try {
//         const eliminarComentario = Comentario.destroy({ where: { code_comentario } });
//         res.status(201).json('SE ELIMINO CON EXITO EL COMENTARIO');

//     } catch (err) {
//         res.status(500).json(err);
//     }
// }


//GET

export const getOne = async (req, res) => {
    const { code_comentario } = req.body;
    try {
        const nuevoComentario = await Comentario.findOne( { where:{ code_comentario } });
        res.status(201).json(nuevoComentario);

    } catch (err) {
        res.status(500).json(err);
    }
}

//GETS Status Activo

export const getAllActivo = async (req, res) => {
    try {
        const { StatusId } = req.body;
        const year = await Comentario.findAll({ where:{ StatusId : 1 } });
        res.status(201).json(year);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Inactivo

export const getAllInactivo = async (req, res) => {
    try {
        const { StatusId } = req.body;
        const year = await Comentario.findAll({ where:{ StatusId : 2 } });
        res.status(201).json(year);

    } catch (err) {
        res.status(500).json(err.message);
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
