import { DataTypes } from "sequelize";
import { sequelize } from "../config/DB.js";
import { Autopartes } from "./autopartes.js";
 

export const ImagenAutopartes = sequelize.define('ImagenAutopartes', {
    code: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    }, 
    imagenAutoparte: {
        type: DataTypes.STRING,
        primaryKey: true
    }
},{
    timestamps: false
});

ImagenAutopartes.belongsTo(Autopartes);
Autopartes.hasMany(ImagenAutopartes);