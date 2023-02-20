import { DataTypes } from "sequelize";
import { sequelize } from "../config/DB.js";
import { Usuario } from "./usuario.js";


export const ImagenUsuarioFondo = sequelize.define('ImagenUsuarioFondo', {
    code: {
        type: DataTypes.INTEGER,
        autoIncrement: true
    }, 
    imagenFondo: {
        type: DataTypes.STRING,
        primaryKey: true
    }
},{
    timestamps: false
});

ImagenUsuarioFondo.belongsTo(Usuario);
Usuario.hasMany(ImagenUsuarioFondo);