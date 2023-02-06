import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";

export const Automovil = sequelize.define('Automovil',{
    idAutomovil:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    modelo: {
        type: DataTypes.STRING(45),
        allowNull:false
    },
    año:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    marca:{
        type: DataTypes.STRING(50),
        allowNull:false
    },
    fechaRegistroAuto:{
        type:DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
},{
    timestamps: false
});
