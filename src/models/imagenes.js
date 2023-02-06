import { DataTypes } from "sequelize";
import { sequelize } from "../config/DB.js";
import { Usuario } from "./usuario.js";

export const Imagenes = sequelize.define('Imagenes', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

/* Usuario.belongsTo(Imagenes);
Imagenes.hasMany(Usuario); */