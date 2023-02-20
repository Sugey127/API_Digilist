import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Proveedor } from "./proveedor.js";
import { Automovil } from "./automovil.js";

export const Entradas = sequelize.define('Entradas', {
    idEntradas: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false
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
        primaryKey: true
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