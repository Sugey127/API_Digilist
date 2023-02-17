import { Op } from "sequelize";
import { Envio } from "../models/envio.js";

//POST
export const post = async (req, res) => {
    const { direccion, description, fechaEntrega, EstadoPaquete, UsuarioEmail,ReciboFolio, codEnvio, StatusId } = req.body;
    try {
        const nuevoEnvio = await Envio.create({
            direccion, description, fechaEntrega, EstadoPaquete, UsuarioEmail,ReciboFolio,codEnvio,StatusId
        });
        res.status(201).json(nuevoEnvio);

    } catch (err) { 
        res.status(500).json(err);
    }
}

//PUT

export const put = async (req, res) => {
    const {  description,direccion,fechaEntrega, EstadoPaquete, codEnvio,StatusId } = req.body;
    try {
        const actualizarEnvio = await Envio.findOne( { where: { codEnvio } })
        actualizarEnvio.fechaEntrega = fechaEntrega;
        actualizarEnvio.EstadoPaquete = EstadoPaquete;
        actualizarEnvio.direccion = direccion;
        actualizarEnvio.description = description;
        actualizarEnvio.StatusId=StatusId;
        await actualizarEnvio.save();
        res.status(201).json(actualizarEnvio);
    } catch (err) {
        res.status(500).json(err);
    }
}


//DELETE

// export const drop = async (req, res) => {
//     const { codEnvio } = req.body;
//     try {
//         const eliminarEnvio = Envio.destroy({ where: { codEnvio } });
//         res.status(201).json('SE ELIMINO CON EXITO');

//     } catch (err) { 
//         res.status(500).json(err);
//     }
// }


//GET

export const getOne = async (req, res) => {
    const { codEnvio } = req.body;
    try {
        const nuevoEnvio = await Envio.findOne( { where:{ codEnvio } });
        res.status(201).json(nuevoEnvio);

    } catch (err) {
        res.status(500).json(err);
    }
}

//GETS Status Activo

export const getAllActivo = async (req, res) => {
    try {
        const { StatusId } = req.body;
        const envio = await Envio.findAll({ where:{ StatusId : 1 } });
        res.status(201).json(envio);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Inactivo

export const getAllInactivo = async (req, res) => {
    try {
        const { StatusId } = req.body;
        const envio = await Envio.findAll({ where:{ StatusId : 2 } });
        res.status(201).json(envio);

    } catch (err) {
        res.status(500).json(err.message);
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


