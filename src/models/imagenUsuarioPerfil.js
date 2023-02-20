import { DataTypes } from "sequelize";
import { sequelize } from "../config/DB.js";
import { Usuario } from "./usuario.js";

export const ImagenUsuarioPerfil = sequelize.define('ImagenUsuarioPerfil', {
    code: {
        type: DataTypes.INTEGER,
        autoIncrement: true
    }, 
    imagenPerfil: {
        type: DataTypes.STRING,
        primaryKey: true
    }
},{
    timestamps: false
});

ImagenUsuarioPerfil.belongsTo(Usuario);
Usuario.hasMany(ImagenUsuarioPerfil);