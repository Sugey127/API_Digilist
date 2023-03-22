import { Op } from "sequelize";
import { Status } from "../models/status.js";

//POST
export const post = async (req, res) => {

    try {
        const nuevoStatus = await Status.create(req.body);
        res.status(201).json(nuevoStatus);
    } catch (err) {
        res.status(500).json(err.message);    
    }
}

//PUT

 export const put = async (req, res) => {
    const { id, status } = req.body;
    try {
        const actualizarStatus = await Status.findOne( { where: { id } })
        actualizarStatus.status = status;
        await actualizarStatus.save();
        res.status(201).json(actualizarStatus);
    } catch (err) {
        res.status(500).json(err.message);    }
} 


//DELETE

/* export const drop = async (req, res) => {
    const { id } = req.body;
    try {
        const eliminarStatus = Status.destroy({ where: { id } });
        res.status(201).json('SE ELIMINO CON EXITO');

    } catch (err) {
        res.status(500).json(err.message);    }
} */


//GET

// export const getOne = async (req, res) => {
//     const { id } = req.body;
//     try {
//         const nuevoStatus = await Status.findOne( { where:{ id } });
//         res.status(201).json(nuevoStatus);

//     } catch (err) {
//         res.status(500).json(err.message);    }
// }


// //GETS

// export const getAll = async (req, res) => {
//     try {
//         const recibos = await Status.findAll({limit: 10});
//         res.status(201).json(recibos);

//     } catch (err) {
//         res.status(500).json(err.message);    }
// }