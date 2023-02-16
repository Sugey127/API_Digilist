import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";

export const Marca= sequelize.define('Marca',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    marca: {
        type: DataTypes.STRING
    }
}, { timestamps: false })