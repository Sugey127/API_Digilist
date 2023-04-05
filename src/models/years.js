import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";

export const Years = sequelize.define('Years',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, { timestamps: false });

