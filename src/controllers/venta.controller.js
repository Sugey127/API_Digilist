import { Op } from "sequelize";
import { Venta } from "../models/venta.js";


//POST
export const post = async (req, res) => {
    const { idUsuario } = req.body;
    
    try {
        
        const nuevaVenta = await Venta.create({
             idUsuario: req.body.idUsuario
        });   
        console.log(req.body);
        res.status(201).json(nuevaVenta);

    } catch (err) { 
        res.status(500).json(err);
    }
}


//PUT

export const put = async (req, res) => {
    const { fechaVenta, idVenta } = req.body;
    try {
        const actualizarVenta = await Venta.findOne( { where: { [Op.or]: [{idVenta}, {fechaVenta}] } })
        actualizarVenta.fechaVenta = fechaVenta;
        await actualizarVenta.save();
        res.status(201).json(actualizarVenta);
    } catch (err) {
        console.error(err);
    }
}


//DELETE

export const drop = async (req, res) => {
    const {idVenta} = req.body;
    try {
        const eliminarVenta = Venta.destroy({ where: { idVenta } });
        res.status(201).json('SE ELIMINO CON EXITO LA VENTA');

    } catch (err) {
        console.error(err);
    }
}


//GET

export const getOne = async (req, res) => {
    const { idVenta} = req.body;
    try {
        const venta = await Venta.findOne( { where: {idVenta } });
        res.status(201).json(venta);

    } catch (err) {
        console.error(err);
    }
}


//GETS

/* export const getAllCoditional = async (req, res) => {
    const { fechaVenta, idVenta} = req.body;
    try {
        const ventas = await Venta.findAll( { where: { [Op.or]: [{idVenta}, {fechaVenta} ] } });
        res.status(201).json(ventas);

    } catch (err) {
        console.error(err);
    }
} */



//GETS

export const getAll = async (req, res) => {
    try {
        const ventas = await Venta.findAll();
        res.status(201).json(ventas);

    } catch (err) {
        console.error(err);
    }
}


