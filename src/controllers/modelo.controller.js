import { Op } from "sequelize";
import { Modelo } from "../models/modelo.js";
import { Status } from "../models/status.js";

//POST

// * un tip señorita: si solo es de esta modelo, puedo enviar el req.body, ya que contiene todos los datos que esta destructurando, ojo, solo cuando sea un model
export const post = async (req, res) => {
    const { MarcaMarca,modelo,YearYear, StatusId } = req.body;
    try {
        // const nuevomodelo = await Modelo.create({
        //     StatusId, modelo,YearYear,MarcaMarca
        // });

        //alternativa aquivalente a la de arriba
        const nuevomodelo = await Modelo.create(req.body);
        res.status(201).json(nuevomodelo);

    } catch (err) {
        res.status(500).json(err.message);
    }
} 

//PUT



 export const put = async (req, res) => {
    const { modelo, StatusId } = req.body;
    try {
        const actualizarStatusmodelo = await Modelo.findOne( { where: { modelo } })
        actualizarStatusmodelo.StatusId = StatusId;
        await actualizarStatusmodelo.save();
        res.status(201).json(actualizarStatusmodelo);
    } catch (err) {
        res.status(500).json(err.message);
    }
} 


//DELETE

/* export const drop = async (req, res) => {
    const { modelo } = req.body;
    try {
        const eliminarModelo = Modelo.destroy({ where: { modelo } });
        res.status(201).json('SE ELIMINO CON EXITO');

    } catch (err) {
        res.status(500).json(err.message);
    }
} */


//GET

export const getOne = async (req, res) => {
    const { modelo } = req.body;
    try {
        const nuevomodelo = await Modelo.findOne( { where:{ modelo } });
        res.status(201).json(nuevomodelo);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GET year

export const getYear = async (req, res) => {
    const { YearYear } = req.params;
    try {
        const nuevomodelo = await Modelo.findAll( { where:{ YearYear } });
        res.status(200).json(nuevomodelo);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GET Marca

export const getMarca = async (req, res) => {
    const { MarcaMarca } = req.params;
    try {
        const nuevoModelo = await Modelo.findAll( { where:{ MarcaMarca } });
        res.status(201).json(nuevoModelo);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Activo

export const getAllActivo = async (req, res) => {
    try {
        const { StatusId } = req.body;
        const year = await Modelo.findAll({ where:{ StatusId : 1 } });
        res.status(201).json(year);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Inactivo

export const getAllInactivo = async (req, res) => {
    try {
        const { StatusId } = req.body;
        const year = await Modelo.findAll({ where:{ StatusId : 2 } });
        res.status(201).json(year);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS

export const getAll = async (req, res) => {
    try {
        const modelo = await Modelo.findAll({limit: 40});
        res.status(201).json(modelo);

    } catch (err) {
        res.status(500).json(err.message);
    }
}
