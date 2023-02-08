import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Automovil } from "./automovil.js";
import { Proveedor } from "./proveedor.js";

export const Entradas = sequelize.define('Entradas', {
    idEntradas: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    nombreAutoparte: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    code_entrada: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    fechaEntrada:{
        type:DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
},{
    timestamps: false
});

Automovil.hasMany(Entradas, {
    foreignKey:{
        allowNull:false
    }
})

Entradas.belongsTo(Automovil, {
    foreignKey:{
        allowNull:false
    }
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