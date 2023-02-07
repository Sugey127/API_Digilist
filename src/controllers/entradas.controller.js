import { Op } from "sequelize";
import { Automovil } from "../models/automovil.js";
import { Entradas } from "../models/entradas.js";
import { Proveedor } from "../models/proveedor.js";


//POST
export const post = async (req, res) => {
    const { nombreAutoparte, stock, precio, code_entrada,AutomovilIdAutomovil,ProveedorIdTipoProveedor } = req.body;
    try {
        const nuevaEntrada = await Entradas.create({
            nombreAutoparte, stock, precio, code_entrada, AutomovilIdAutomovil, ProveedorIdTipoProveedor
        });
        res.status(201).json(nuevaEntrada);

    } catch (err) {
        // res.status(500).json(err); 
        res.status(500).json(err);
    }
}

//PUT

export const put = async (req, res) => {
    const { nombreAutoparte, stock, precio, code_entrada } = req.body;
    try {
        const actualizarEntrada = await Entradas.findOne( { where: { code_entrada } })
        actualizarEntrada.nombreAutoparte = nombreAutoparte;
        actualizarEntrada.stock = stock;
        actualizarEntrada.precio = precio;
        await actualizarEntrada.save();
        res.status(201).json(actualizarEntrada);
    } catch (err) {
        res.status(500).json(err);
    }
}


//DELETE

export const drop = async (req, res) => {
    const { code_entrada } = req.body;
    try {
        const eliminarEntrada = Entradas.destroy({ where: { code_entrada } });
        res.status(201).json('SE ELIMINO CON EXITO LA PIEZA');

    } catch (err) { 
        res.status(500).json(err);
    }
}


//GET

export const getOne = async (req, res) => {
    const { code_entrada } = req.body;
    try {
        const nuevoEntrada = await Entradas.findOne( { where:{ code_entrada } });
        res.status(201).json(nuevoEntrada);

    } catch (err) {
        res.status(500).json(err);
    }
}


//GETS

export const getAll = async (req, res) => {
    try {
        const entradas = await Entradas.findAll();
        res.status(201).json(entradas);

    } catch (err) {
        res.status(500).json(err);
    }
}


