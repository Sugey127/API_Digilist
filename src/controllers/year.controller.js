import { Op } from "sequelize";
import { Years } from '../models/years.js'  

//POST
export const post = async (req, res) => { 
    const { year, StatusId } = req.body;
    try {
        const newYear = await Years.create({
            StatusId, year
        });
        res.status(201).json(newYear);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//PUT

 export const put = async (req, res) => {
    const { year, StatusId } = req.body;
    try {
        const actualizarStatusYear = await Years.findOne( { where: { year } })
        actualizarStatusYear.StatusId = StatusId;
        await actualizarStatusYear.save();
        res.status(201).json(actualizarStatusYear);
    } catch (err) {
        res.status(500).json(err.message);
    }
} 


//DELETE

/* export const drop = async (req, res) => {
    const { year } = req.body;
    try {
        const eliminarYears = Years.destroy({ where: { year } });
        res.status(201).json('SE ELIMINO CON EXITO');

    } catch (err) {
        res.status(500).json(err.message);
    }
} */


//GET

export const getOne = async (req, res) => {
    const { year } = req.body;
    try {
        const nuwYear = await Years.findOne( { where:{ year } });
        res.status(201).json(nuwYear);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Activo

export const getAllActivo = async (req, res) => {
    try {
        req.body.StatusId = 1;
        const year = await Years.findAll({ where:{ StatusId : 1 } });
        res.status(201).json(year);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Inactivo

export const getAllInactivo = async (req, res) => {
    try {
        req.body.StatusId = 2;
        const year = await Years.findAll({ where:{ StatusId : 2 } });
        res.status(201).json(year);

    } catch (err) {
        res.status(500).json(err.message);
    }
}


//GETS

export const getAll = async (req, res) => {
    try {
        const year = await Years.findAll({limit: 40});
        res.status(201).json(year);

    } catch (err) {
        res.status(500).json(err.message);
    }
}
