import { Op } from "sequelize";
import { DetalleVenta } from "../models/detalleVenta.js";

//POST
export const post = async (req, res) => {
    const { cantidadVenta, precioVenta,VentumCodeVenta,AutoparteCodeAutoparte, StatusId } = req.body;
    try {
        const nuevoDetalleVenta = await DetalleVenta.create({
            cantidadVenta, precioVenta, VentumCodeVenta, AutoparteCodeAutoparte,StatusId
        });
        res.status(201).json(nuevoDetalleVenta);

    } catch (err) { 
        res.status(500).json(err);
    }
}

//PUT

export const put = async (req, res) => {
    const { cantidadVenta, precioVenta, AutoparteCodeAutoparte, VentumCodeVenta,StatusId } = req.body;
    try {
        const actualizarDetalleVenta = await DetalleVenta.findOne({ where: { [Op.and]: [{AutoparteCodeAutoparte}, {VentumCodeVenta}] } });
        actualizarDetalleVenta.cantidadVenta = cantidadVenta;
        actualizarDetalleVenta.precioVenta= precioVenta;
        actualizarDetalleVenta.StatusId=StatusId;
        await actualizarDetalleVenta.save();
        res.status(201).json(actualizarDetalleVenta);
    } catch (err) {
        res.status(500).json(err);
    }
} 


//DELETE

// export const drop = async (req, res) => {
//     const { AutoparteCodeAutoparte,VentumCodeVenta } = req.body;
//     try {
//         const eliminarDetalleVenta = DetalleVenta.destroy({ where: { [Op.and]: [{AutoparteCodeAutoparte}, {VentumCodeVenta}] } });
//         res.status(201).json('SE ELIMINO CON EXITO');

//     } catch (err) { 
//         res.status(500).json(err);
//     }
// }


//GET

export const getOne = async (req, res) => {
    const { AutoparteCodeAutoparte, VentumCodeVenta } = req.body;
    try {
        const nuevoDetalleVenta = await DetalleVenta.findOne({ where: { [Op.and]: [{AutoparteCodeAutoparte}, {VentumCodeVenta}] } });
        res.status(201).json(nuevoDetalleVenta);

    } catch (err) { 
        res.status(500).json(err);  
    }
}

//GETS Status Activo

export const getAllActivo = async (req, res) => {
    try {
        req.body.StatusId = 1;
        const detallVenta = await DetalleVenta.findAll({ where:{ StatusId : 1 } });
        res.status(201).json(detallVenta);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Inactivo

export const getAllInactivo = async (req, res) => {
    try {
        req.body.StatusId = 2;
        const detallVenta = await DetalleVenta.findAll({ where:{ StatusId : 2 } });
        res.status(201).json(detallVenta);

    } catch (err) {
        res.status(500).json(err.message);
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


