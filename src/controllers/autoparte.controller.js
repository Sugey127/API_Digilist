import { Op } from "sequelize";
import { Autopartes } from "../models/autopartes.js";



//POST
export const post = async (req, res) => {
    const { description, stock, precio, Imagen, EntradaIdEntradas } = req.body;
    try {
        const nuevaAutoparte = await Autopartes.create({
            description, stock, precio, Imagen, EntradaIdEntradas
        });

        console.log(nuevaAutoparte.dataValues)
        res.status(201).json(nuevaAutoparte.dataValues);

    } catch (err) {
        res.status(500).json(err);
    }
}

//PUT

export const put = async (req, res) => {
    const { description, stock, precio, Imagen, idAutopartes} = req.body;
    console.log(req.body)
    try {
        const actualizarAutoparte = await Autopartes.findOne( { where:  {idAutopartes} })
        actualizarAutoparte.description = description;
        actualizarAutoparte.stock = stock;
        actualizarAutoparte.precio = precio;
        actualizarAutoparte.Imagen = Imagen;
        await actualizarAutoparte.save();
        res.status(201).json(actualizarAutoparte);
    } catch (err) {
        console.error(err);
    }
}


//DELETE

export const drop = async (req, res) => {
    const {idAutopartes} = req.body;
    try {
        const eliminarAutopartes = Autopartes.destroy({ where: { idAutopartes } });
        res.status(201).json('SE ELIMINO LA PIEZA');

    } catch (err) {
        console.error(err);
    }
}


//GET

export const getOne = async (req, res) => {
    const { precio, idAutopartes} = req.body;
    try {
        const nuevoAutopartes = await Autopartes.findOne( { where: { idAutopartes } });
        res.status(201).json(nuevoAutopartes);

    } catch (err) { 
        console.error(err);
    }
}


//GETS

export const getAll = async (req, res) => {
    try {
        const autopartes = await Autopartes.findAll();

        console.log(autopartes);

        res.status(201).json(autopartes);

    } catch (err) {
        console.error(err);
    }
}


