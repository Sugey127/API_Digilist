import { Op } from "sequelize";
import { DetalleVenta } from "../models/detalleVenta.js";

//POST
export const post = async (req, res) => {
    const { cantidadVenta, precioVenta,VentumIdVenta,AutoparteIdAutopartes } = req.body;
    try {
        const nuevoDetalleVenta = await DetalleVenta.create({
            cantidadVenta, precioVenta, VentumIdVenta, AutoparteIdAutopartes
        });
        res.status(201).json(nuevoDetalleVenta);

    } catch (err) { 
        res.status(500).json(err);
    }
}

//PUT

export const put = async (req, res) => {
    const { cantidadVenta, precioVenta, AutoparteIdAutopartes, VentumIdVenta } = req.body;
    try {
        const actualizarDetalleVenta = await DetalleVenta.findOne({ where: { [Op.and]: [{AutoparteIdAutopartes}, {VentumIdVenta}] } });
        actualizarDetalleVenta.cantidadVenta = cantidadVenta;
        actualizarDetalleVenta.precioVenta= precioVenta;
        await actualizarDetalleVenta.save();
        res.status(201).json(actualizarDetalleVenta);
    } catch (err) {
        res.status(500).json(err);
    }
} 


//DELETE

export const drop = async (req, res) => {
    const { AutoparteIdAutopartes,VentumIdVenta } = req.body;
    try {
        const eliminarDetalleVenta = DetalleVenta.destroy({ where: { [Op.and]: [{AutoparteIdAutopartes}, {VentumIdVenta}] } });
        res.status(201).json('SE ELIMINO CON EXITO');

    } catch (err) { 
        res.status(500).json(err);
    }
}


//GET

export const getOne = async (req, res) => {
    const { AutoparteIdAutopartes, VentumIdVenta } = req.body;
    try {
        const nuevoDetalleVenta = await DetalleVenta.findOne({ where: { [Op.and]: [{AutoparteIdAutopartes}, {VentumIdVenta}] } });
        res.status(201).json(nuevoDetalleVenta);

    } catch (err) { 
        res.status(500).json(err);  
    }
}


//GETS

export const getAll = async ( req,res) => {
    try {
        const detalleVenta = await DetalleVenta.findAll();
        res.status(201).json(detalleVenta);

    } catch (err) {
        res.status(500).json(err);
    }
}


