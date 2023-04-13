import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Proveedor } from "./proveedor.js";
import { Modelo } from "./modelo.js";

export const Entradas = sequelize.define('Entradas', {
    idEntradas: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
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
    fechaEntrada:{
        type:DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
},{
    timestamps: false
});


Modelo.hasMany(Entradas, {
    foreignKey:{
        allowNull:false
    }
})

Entradas.belongsTo(Modelo, {
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
Entradas.belongsTo(Proveedor, {
    foreignKey:{
        allowNull:false
    }
});