import { Op } from "sequelize";
import { Proveedor } from "../models/proveedor.js";



//POST
export const post = async (req, res) => {
    const { nombreProveedor } = req.body; 
    try { 
        const nuevoProveedor = await Proveedor.create({
            nombreProveedor
        });
        console.log(body);
        res.status(201).json(nuevoProveedor);

    } catch (err) {
        res.status(500).json(err); 
    }
}

//PUT

export const put = async (req, res) => {
    const { nombreProveedor, idTipoProveedor, nombreProveedorNuevo } = req.body;
    try {
        const actualizarProveedor = await Proveedor.findOne( { where: { [Op.and]: [{idTipoProveedor}, {nombreProveedor} ] } })
        actualizarProveedor.nombreProveedor = nombreProveedorNuevo;
        await actualizarProveedor.save();
        res.status(201).json(actualizarProveedor);
    } catch (err) {
        res.status(500).json(err);
    }
}


//DELETE

export const drop = async (req, res) => {
    const {idTipoProveedor} = req.body;
    try {
        const eliminarProveedor = Proveedor.destroy({ where: { idTipoProveedor } });
        res.status(201).json('SE ELIMINO EL PROVEEDOR'); 

    } catch (err) {
        res.status(500).json(err);
    }
}


//GET

export const getOne = async (req, res) => {
    const { nombreProveedor} = req.body;
    try {
        const proveedor = await Proveedor.findOne( { where:   {nombreProveedor}  });
        res.status(201).json(proveedor);

    } catch (err) {
        res.status(500).json(err);
    }
}


//GETS

/* export const getAllCoditional = async (req, res) => {
    const { nombreProveedor, idTipoProveedor} = req.body;
    try {
        const proveedores = await Proveedor.findAll( { where: { [Op.or]: [{idTipoProveedor}, {nombreProveedor} ] } });
        res.status(201).json(proveedores);

    } catch (err) {
        res.status(500).json(err);
    }
} */



//GETS

export const getAll = async (req, res) => {
    try {
        const proveedores = await Proveedor.findAll();
        res.status(201).json(proveedores);

    } catch (err) {
        res.status(500).json(err);
    }
}


