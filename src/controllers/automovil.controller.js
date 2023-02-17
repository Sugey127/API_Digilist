import { Op } from "sequelize";
import { Automovil } from "../models/automovil.js";


//POST
export const post = async (req, res) => {
    const { ModeloModelo, YearYear, MarcaMarca, codeAuto, StatusId } = req.body;
    try {
        const nuevaAutomovil = await Automovil.create({
            ModeloModelo, YearYear, MarcaMarca,codeAuto,StatusId
        });
        res.status(201).json(nuevaAutomovil);

    } catch (err) {
        res.status(500).json(err);
    }
}

//PUT

export const put = async (req, res) => {
    const { codeAuto,StatusId} = req.body;
    try {

        const actualizarAutomovil = await Automovil.findOne({ where: { codeAuto } })
        actualizarAutomovil.StatusId = StatusId;
        await actualizarAutomovil.save();
        res.status(201).json(actualizarAutomovil);
    } catch (err) {
        res.status(500).json(err);
    }
}


//DELETE

// export const drop = async (req, res) => {
//     const { codeAuto } = req.body;
//     try {
//         const eliminarAutomovil = Automovil.destroy({ where: { codeAuto } });
//         res.status(201).json('SE ELIMINO EL AUTOMOVIL');

//     } catch (err) {
//         res.status(500).json(err);
//     }
// }


//GET

export const getOne = async (req, res) => {
    const { codeAuto } = req.body;
    try {
        const nuevoAutomovil = await Automovil.findOne({ where: { codeAuto } });
        res.status(201).json(nuevoAutomovil);

    } catch (err) {
        res.status(500).json(err);
    }
}

//GETS Status Activo

export const getAllActivo = async (req, res) => {
    try {
        const { StatusId } = req.body;
        const year = await Automovil.findAll({ where:{ StatusId : 1 } });
        res.status(201).json(year);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Inactivo

export const getAllInactivo = async (req, res) => {
    try {
        const { StatusId } = req.body;
        const year = await Automovil.findAll({ where:{ StatusId : 2 } });
        res.status(201).json(year);

    } catch (err) {
        res.status(500).json(err.message);
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


