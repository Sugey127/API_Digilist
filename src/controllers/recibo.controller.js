import { Op } from "sequelize";
import { Recibo } from "../models/recibo.js";
import { Venta } from "../models/venta.js";


//POST
export const post = async (req, res) => {
    const { Folio,cantidad, VentumCodeVenta } = req.body;
    try {
        const nuevoRecibo = await Recibo.create({
            Folio, cantidad, VentumCodeVenta
        });
        res.status(201).json(nuevoRecibo);

    } catch (err) {
        res.status(500).json(err);
    }
}

//PUT

/* export const put = async (req, res) => {
    const { Folio, cantidad } = req.body;
    try {
        const actualizarRecibo = await Recibo.findOne( { where: { Folio } })
        actualizarRecibo.cantidad = cantidad;
        await actualizarRecibo.save();
        res.status(201).json(actualizarRecibo);
    } catch (err) {
        res.status(500).json(err);
    }
} */


//DELETE

/* export const drop = async (req, res) => {
    const { Folio } = req.body;
    try {
        const eliminarRecibo = Recibo.destroy({ where: { Folio } });
        res.status(201).json('SE ELIMINO CON EXITO');

    } catch (err) {
        res.status(500).json(err);
    }
} */


//GET

export const getOne = async (req, res) => {
    const { Folio } = req.body;
    try {
        const nuevoRecibo = await Recibo.findOne( { where:{ Folio } });
        res.status(201).json(nuevoRecibo);

    } catch (err) {
        res.status(500).json(err);
    }
}


//GETS

export const getAll = async (req, res) => {
    try {
        const recibos = await Recibo.findAll({limit: 10});
        res.status(201).json(recibos);

    } catch (err) {
        res.status(500).json(err);
    }
}

