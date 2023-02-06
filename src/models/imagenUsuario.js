import { DataTypes } from "sequelize";
import { sequelize } from "../config/DB.js";
import { Usuario } from "./usuario.js";
import { Imagenes } from "./imagenes.js";

export const ImagenUsuario = sequelize.define('ImagenUsuario', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    }
},{
    timestamps: false
});

ImagenUsuario.belongsTo(Imagenes);
Imagenes.hasMany(ImagenUsuario);

ImagenUsuario.belongsTo(Usuario);
Usuario.hasMany(ImagenUsuario);