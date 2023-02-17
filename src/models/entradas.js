import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Proveedor } from "./proveedor.js";
import { Years } from "./years.js";
import { Marca } from "./marca.js";
import { Modelo } from "./modelo.js";

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

Years.hasMany(Entradas, {
    foreignKey:{
        allowNull:false
    }
})

Entradas.belongsTo(Years, {
    foreignKey:{
        allowNull:false
    }
});

Marca.hasMany(Entradas, {
    foreignKey:{
        allowNull:false
    }
})

Entradas.belongsTo(Marca, {
    foreignKey:{
        allowNull:false
    }
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