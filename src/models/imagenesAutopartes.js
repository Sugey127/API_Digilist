import { DataTypes } from "sequelize";
import { sequelize } from "../config/DB.js";
import { Autopartes } from "./autopartes.js";

export const ImagenesAutopartes = sequelize.define('ImagenesAutopartes', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    publicId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

Autopartes.hasMany(ImagenesAutopartes);
ImagenesAutopartes.belongsTo(Autopartes);
