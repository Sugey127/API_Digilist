import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Automovil } from "./automovil.js"; 

export const Marca= sequelize.define('Marca',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
}, { timestamps: false })

Marca.hasMany(Automovil, {
    foreignKey:{
        allowNull:false
    }
})

Automovil.belongsTo(Marca, {
    foreignKey:{
        allowNull:false
    }
});