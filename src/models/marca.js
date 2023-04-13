import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Modelo } from "./modelo.js"; 

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


Marca.hasMany(Modelo, {
    foreignKey:{
        allowNull:false
    }
})

Modelo.belongsTo(Marca, {
    foreignKey:{
        allowNull:false
    }
});
Modelo.belongsTo(Marca, {
    foreignKey:{
        allowNull:false
    }
});