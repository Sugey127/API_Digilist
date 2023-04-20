import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Proveedor } from "./proveedor.js";


export const Entradas = sequelize.define('Entradas', {
    idEntradas: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: { 
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    fechaEntrada:{
        type:DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
},{
    timestamps: false
});

Proveedor.hasMany(Entradas, {
    foreignKey:{
        allowNull:false
    }
})

Entradas.belongsTo(Proveedor, {
    foreignKey:{
        allowNull:false
    }
});
