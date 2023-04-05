import { Op } from "sequelize";
import { Entradas } from "../models/entradas.js";
import { Marca } from "../models/marca.js";
import { Modelo } from "../models/modelo.js";
import { Proveedor } from "../models/proveedor.js";
import { Autopartes } from "../models/autopartes.js";

//POST
export const post = async (req, res) => {
    const { nombreAutoparte, stock, precio, AutoparteCodeAutoparte,ModeloCodeAuto,ProveedorRfcProveedor,StatusId } = req.body;
    try {
        const nuevaEntrada = await Entradas.create({
            nombreAutoparte, stock, precio,AutoparteCodeAutoparte,ModeloCodeAuto,ProveedorRfcProveedor,StatusId
        });

        // Actualizar el inventario del producto correspondiente
        const producto = await Autopartes.findByPk(nuevaEntrada.AutoparteCodeAutoparte);
        if (producto) {
            const cantidadActual = producto.stockInventario;
            const cantidadNueva = cantidadActual + nuevaEntrada.stock;
            await producto.update({ stockInventario: cantidadNueva });
          } else {
            console.error(`El producto con ID ${nuevaEntrada.AutoparteCodeAutoparte} no existe.`);
          }

        res.status(201).json(nuevaEntrada);
 
    } catch (err) {
        res.status(500).json(err.message);
    }
}

//PUT

export const put = async (req, res) => {
    const { nombreAutoparte, stock, precio, idEntradas ,StatusId} = req.body;
    try {
        const actualizarEntrada = await Entradas.findOne( { where: { idEntradas } })
        actualizarEntrada.nombreAutoparte = nombreAutoparte;
        actualizarEntrada.stock = stock;
        actualizarEntrada.precio = precio;
        actualizarEntrada.StatusId=StatusId;
        await actualizarEntrada.save();
        res.status(201).json(actualizarEntrada);
    } catch (err) {
        res.status(500).json(err.message);
    }
}


//DELETE

// export const drop = async (req, res) => {
//     const { code_entrada } = req.body;
//     try {
//         const eliminarEntrada = Entradas.destroy({ where: { code_entrada } });
//         res.status(201).json('SE ELIMINO CON EXITO LA PIEZA');

//     } catch (err) { 
//         res.status(500).json(err.message);
//     }
// }


//GET

export const getOne = async (req, res) => {
    const { idEntradas } = req.body;
    try {
        const nuevoEntrada = await Entradas.findOne( { where:{ idEntradas } });
        res.status(201).json(nuevoEntrada);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Activo

export const getAllActivo = async (req, res) => {
    try {
        req.body.StatusId = 1;
        const entrada = await Entradas.findAll({ where:{ StatusId : 1 } });
        res.status(201).json(entrada);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Inactivo

export const getAllInactivo = async (req, res) => {
    try {
        req.body.StatusId = 2;
        const entrada = await Entradas.findAll({ where:{ StatusId : 2 } });
        res.status(201).json(entrada);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS

export const getAll = async (req, res) => {
    try {
        const entradas = await Entradas.findAll();
        res.status(201).json(entradas);

    } catch (err) {
        res.status(500).json(err.message);
    }
}


