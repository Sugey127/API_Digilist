import { Op } from "sequelize";
import { Automovil } from "../models/automovil.js";


//POST
export const post = async (req, res) => {
    const { modelo, año, marca } = req.body;
    try {
        const nuevaAutomovil = await Automovil.create({
            modelo, año, marca
        });
        res.status(201).json(nuevaAutomovil);

    } catch (err) {
        res.status(500).json(err);
    }
}

//PUT

export const put = async (req, res) => {
    const { modelo, año, marca, idAutomovil } = req.body;
    try {

        console.log(modelo, año, marca, idAutomovil);

        const actualizarAutomovil = await Automovil.findOne({ where: { idAutomovil } })
        actualizarAutomovil.modelo = modelo;
        actualizarAutomovil.año = año;
        actualizarAutomovil.marca = marca;
        await actualizarAutomovil.save();
        res.status(201).json(actualizarAutomovil);
    } catch (err) {
        res.status(500).json(err);
    }
}


//DELETE

export const drop = async (req, res) => {
    const { idAutomovil } = req.body;
    try {
        const eliminarAutomovil = Automovil.destroy({ where: { idAutomovil } });
        res.status(201).json('SE ELIMINO EL AUTOMOVIL');

    } catch (err) {
        res.status(500).json(err);
    }
}


//GET

export const getOne = async (req, res) => {
    const { idAutomovil } = req.body;
    try {
        const nuevoAutomovil = await Automovil.findOne({ where: { idAutomovil } });
        res.status(201).json(nuevoAutomovil);

    } catch (err) {
        res.status(500).json(err);
    }
}


//GETS

export const getAll = async (req, res) => {
    try {
        const entradas = await Automovil.findAll();
        res.status(201).json(entradas);

    } catch (err) {
        res.status(500).json(err);
    }
}


