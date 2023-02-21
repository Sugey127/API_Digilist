import { body } from "express-validator";
import { Op } from "sequelize";
import { Proveedor } from "../models/proveedor.js";
  


//POST
export const post = async (req, res) => {
    const { nombreProveedor, direccionProveedor, RfcProveedor, telefonoProveedor, emailProveedor, StatusId } = req.body; 
    console.log(req.body);
    try { 
        const nuevoProveedor = await Proveedor.create({
            nombreProveedor, direccionProveedor, RfcProveedor, telefonoProveedor, emailProveedor, StatusId
        });
        
        res.status(201).json(nuevoProveedor);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//PUT

export const put = async (req, res) => {
    const { nombreProveedor, RfcProveedor,StatusId,direccionProveedor, telefonoProveedor, emailProveedor } = req.body;
    console.log(req.body);
    try {
        const actualizarProveedor = await Proveedor.findOne( { where: {RfcProveedor } })
        actualizarProveedor.nombreProveedor = nombreProveedor;
        actualizarProveedor.StatusId=StatusId;
        actualizarProveedor.direccionProveedor=direccionProveedor;
        actualizarProveedor.telefonoProveedor=telefonoProveedor;
        actualizarProveedor.emailProveedor=emailProveedor;
        await actualizarProveedor.save();
        res.status(201).json(actualizarProveedor);
    } catch (err) {
        res.status(500).json(err);
    }
}


//DELETE

// export const drop = async (req, res) => {
//     const {RfcProveedor} = req.body;
//     console.log(req.body);
//     try {
//         const eliminarProveedor = Proveedor.destroy({ where: { RfcProveedor } });
//         res.status(201).json('SE ELIMINO EL PROVEEDOR'); 

//     } catch (err) {
//         res.status(500).json(err);
//     }
// }


//GET

export const getOne = async (req, res) => {
    const { RfcProveedor} = req.body;
    console.log(req.body);
    try {
        const proveedor = await Proveedor.findOne( { where:   {RfcProveedor}  });
        res.status(201).json(proveedor);

    } catch (err) {
        res.status(500).json(err);
    }
}

//GETS Status Activo

export const getAllActivo = async (req, res) => {
    try {
        const { StatusId } = req.body;
        const proveedor = await Proveedor.findAll({ where:{ StatusId : 1 } });
        res.status(201).json(proveedor);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Inactivo

export const getAllInactivo = async (req, res) => {
    try {
        const { StatusId } = req.body;
        const proveedor = await Proveedor.findAll({ where:{ StatusId : 2 } });
        res.status(201).json(proveedor);

    } catch (err) {
        res.status(500).json(err.message);
    }
}


//GETS

/* export const getAllCoditional = async (req, res) => {
    const { nombreProveedor, RfcProveedor} = req.body;
    try {
        const proveedores = await Proveedor.findAll( { where: { [Op.or]: [{RfcProveedor}, {nombreProveedor} ] } });
        res.status(201).json(proveedores);

    } catch (err) {
        res.status(500).json(err);
    }
} */

  

//GETS

export const getAll = async (req, res) => {
    try {
        const proveedores = await Proveedor.findAll();
        console.log(req.body);
        res.status(201).json(proveedores);

    } catch (err) {
        res.status(500).json(err);
    }
}


