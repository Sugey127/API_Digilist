import { Op } from "sequelize";
import { Envio } from "../models/envio.js";

//POST
export const post = async (req, res) => {
    const { direccion, description, fechaEntrega, EstadoPaquete, UsuarioIdUsuario,ReciboIdRecibo } = req.body;
    try {
        const nuevoEnvio = await Envio.create({
            direccion, description, fechaEntrega, EstadoPaquete, UsuarioIdUsuario,ReciboIdRecibo
        });
        res.status(201).json(nuevoEnvio);

    } catch (err) { 
        res.status(500).json(err);
    }
}

//PUT

export const put = async (req, res) => {
    const {  description,direccion,fechaEntrega, EstadoPaquete, idEnvio } = req.body;
    try {
        const actualizarEnvio = await Envio.findOne( { where: { idEnvio } })
        actualizarEnvio.fechaEntrega = fechaEntrega;
        actualizarEnvio.EstadoPaquete = EstadoPaquete;
        actualizarEnvio.direccion = direccion;
        actualizarEnvio.description = description;
        await actualizarEnvio.save();
        res.status(201).json(actualizarEnvio);
    } catch (err) {
        res.status(500).json(err);
    }
}


//DELETE

export const drop = async (req, res) => {
    const { idEnvio } = req.body;
    try {
        const eliminarEnvio = Envio.destroy({ where: { idEnvio } });
        res.status(201).json('SE ELIMINO CON EXITO');

    } catch (err) { 
        res.status(500).json(err);
    }
}


//GET

export const getOne = async (req, res) => {
    const { idEnvio } = req.body;
    try {
        const nuevoEnvio = await Envio.findOne( { where:{ idEnvio } });
        res.status(201).json(nuevoEnvio);

    } catch (err) {
        res.status(500).json(err);
    }
}


//GETS

export const getAll = async (req,res) => {
    try {
        const envio = await Envio.findAll();
        res.status(201).json(envio);

    } catch (err) {
        res.status(500).json(err);
    }
}


