import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";

export const Años= sequelize.define('Años',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    año: {
        type: DataTypes.INTEGER
    }
}, { timestamps: false })