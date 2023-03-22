import { Op, where } from "sequelize";
import { sequelize } from "../config/DB.js";
import { Autopartes } from "../models/autopartes.js";
import { ImagenesAutopartes } from "../models/imagenesAutopartes.js";
import { RenderizadorImagen } from "../utils/RenderizadorImagenes.js";


//todo: tengo que hacer esto
// ? deberia hacer esto?
// * hola como estas
// ! no tocar


//POST
export const post = async (req, res) => {
    try {
        const nuevaAutoparte = await Autopartes.create(req.body);
        console.log(nuevaAutoparte.dataValues)
        res.status(201).json(nuevaAutoparte.dataValues);

    } catch (err) {
        res.status(500).json(err);
    }
}

//PUT

export const put = async (req, res) => {
    const { description, stock, precio, Imagen, code_autoparte, StatusId } = req.body;
    console.log(req.body)
    try {
        const actualizarAutoparte = await Autopartes.findOne({ where: { code_autoparte } })
        actualizarAutoparte.description = description;
        actualizarAutoparte.stock = stock;
        actualizarAutoparte.precio = precio;
        actualizarAutoparte.StatusId = StatusId;
        await actualizarAutoparte.save();
        res.status(201).json(actualizarAutoparte);
    } catch (err) {
        console.error(err);
    }
}


//DELETE

// export const drop = async (req, res) => {
//     const {code_autoparte} = req.body;
//     try {
//         const eliminarAutopartes = Autopartes.destroy({ where: { code_autoparte } });
//         res.status(201).json('SE ELIMINO LA PIEZA');

//     } catch (err) {
//         console.error(err);
//     }
// }


//GET

export const getOne = async (req, res) => {
    const { code_autoparte } = req.body;
    try {
        const nuevoAutopartes = await Autopartes.findOne({ where: { code_autoparte } });
        res.status(201).json(nuevoAutopartes);

    } catch (err) {
        console.error(err);
    }
}

//GETS Status Activo

export const getAllActivo = async (req, res) => {
    try {
        req.body.StatusId = 1;
        const year = await Autopartes.findAll({ where: { StatusId: 1 } });
        res.status(201).json(year);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Inactivo

export const getAllInactivo = async (req, res) => {
    try {
        req.body.StatusId = 2;
        const year = await Autopartes.findAll({ where: { StatusId: 2 } });
        res.status(201).json(year);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS

export const getAll = async (req, res) => {
    try {
        const autopartes = await Autopartes.findAll();

        res.status(201).json(autopartes);

    } catch (err) {
        console.error(err);
    }
}

export const agregarImagenAutoparte = async (req, res, next) => {
    try {
        const { code } = req.params;
        req.files.forEach(x => {
            RenderizadorImagen(x.path, 500);
            ImagenesAutopartes.create({
                AutoparteCodeAutoparte: code,
                url: req.protocol + "://" + req.get('host') + '/imagenes/autopartes/' + x.filename,
            });
        });
    } catch (err) {
        res.send("hola")
    }
}