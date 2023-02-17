import { Op } from "sequelize";
import { Marca } from "../models/marca.js";
import { Status } from "../models/status.js";
//POST
export const post = async (req, res) => {
    const { marca, StatusId } = req.body;
    try {
        const nuevomarca = await Marca.create({
            StatusId, marca
        });
        res.status(201).json(nuevomarca);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//PUT

 export const put = async (req, res) => {
    const { marca, StatusId } = req.body;
    try {
        const actualizarStatusmarca = await Marca.findOne( { where: { marca } })
        actualizarStatusmarca.StatusId = StatusId;
        await actualizarStatusmarca.save();
        res.status(201).json(actualizarStatusmarca);
    } catch (err) {
        res.status(500).json(err.message);
    }
} 


//DELETE

/* export const drop = async (req, res) => {
    const { marca } = req.body;
    try {
        const eliminarMarca = Marca.destroy({ where: { marca } });
        res.status(201).json('SE ELIMINO CON EXITO');

    } catch (err) {
        res.status(500).json(err.message);
    }
} */


//GET

export const getOne = async (req, res) => {
    const { marca } = req.body;
    try {
        const nuevomarca = await Marca.findOne( { where:{ marca } });
        res.status(201).json(nuevomarca);

    } catch (err) {
        res.status(500).json(err.message);
    }
}


//GETS Status Activo

export const getAllActivo = async (req, res) => {
    try {
        const { StatusId } = req.body;
        const marca = await Marca.findAll({ where:{ StatusId : 1 } });
        res.status(201).json(marca);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Inactivo

export const getAllInactivo = async (req, res) => {
    try {
        const { StatusId } = req.body;
        const marca = await Marca.findAll({ where:{ StatusId : 2 } });
        res.status(201).json(marca);

    } catch (err) {
        res.status(500).json(err.message);
    }
}


//GETS 

export const getAll = async (req, res) => {
    try {
        const marca = await Marca.findAll({limit: 40});
        res.status(201).json(marca);

    } catch (err) {
        res.status(500).json(err.message);
    }
}