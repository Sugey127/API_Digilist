import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";

export const RecordarPassword= sequelize.define('RecordarPassword',{
    codigo:{
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    password: {
        type:DataTypes.STRING,
        allowNull: false
    }
});