import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Entradas } from "./entradas.js";
import { Modelo } from "./modelo.js";

export const Autopartes = sequelize.define('Autopartes', {
    nombreAutoparte: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stockInventario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    code_autoparte: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    descuento:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaRegistroAutoparte: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: false
});
Autopartes

Autopartes.hasMany(Entradas, {
    foreignKey: {
        allowNull: false
    }
})

Entradas.belongsTo(Autopartes, {
    foreignKey: {
        allowNull: false
    }
});

Modelo.hasMany(Autopartes, {
    foreignKey: {
        allowNull: false
    }
})

Autopartes.belongsTo(Modelo, {
    foreignKey: {
        allowNull: false
    }
});