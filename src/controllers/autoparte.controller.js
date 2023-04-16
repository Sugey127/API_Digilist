import { Op, where } from "sequelize";
import { sequelize } from "../config/DB.js";
import { Autopartes } from "../models/autopartes.js";
import { ImagenesAutopartes } from "../models/imagenesAutopartes.js";
import { RenderizadorImagen } from "../utils/RenderizadorImagenes.js";
import { cloudinary } from "../middlewares/subirImagen.js";
import sharp from "sharp";

//todo: tengo que hacer esto
// ? deberia hacer esto?
// * hola como estas
// ! no tocar

//POST
export const post = async (req, res, next) => {
    try {
        console.log('ya tengo sueño', req.files)
        req.query.StatusId = 1;
        const autoparte = await Autopartes.create(req.query);
       
        req.files.forEach(async img => {
            console.log('YAREMI QUI ESSSSSSSSSSSSSSSSSSSSSSSSSSSSS', img.buffer);
            
            const buffer = await sharp(img.buffer).resize(250, 250).png({ quality: 100 }).toBuffer();
            cloudinary.uploader.upload_stream({ folder: 'autopartes' }, async (err, result) => {
                if (err) res.status(400).json('no se pudo subir la imagen')
                else {
                    console.log(result)
                    await ImagenesAutopartes.create({
                        url: result.url,
                        publicId: result.public_id,
                        AutoparteCodeAutoparte: autoparte.code_autoparte
                    })
                }
            }).end(buffer)
        })
        res.status(201).json({ autoparte })
    } catch (err) {
        console.log('marinetteeeeeeeeeeeeeeeeeeee', err)
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
        const autopartes = await Autopartes.findAll({
            include: {
                model: ImagenesAutopartes,
                attributes: { exclude: ['AutoparteCodeAutoparte', 'publicId'] }
            }
        });

        res.status(201).json({ autopartes });

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

// definicion

//cmniar bd

// 