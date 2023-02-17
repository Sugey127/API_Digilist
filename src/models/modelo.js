import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Years } from "./years.js";
import { Automovil } from "./automovil.js";

export const Modelo = sequelize.define('Modelo', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
}, { timestamps: false })

Modelo.belongsTo(Years, {
    foreignKey: {
        allowNull: false
    }
});

Years.hasMany(Modelo, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Modelo.hasMany(Automovil, {
    foreignKey:{
        allowNull:false
    }
})

Automovil.belongsTo(Modelo, {
    foreignKey:{
        allowNull:false
    }
});