import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Years } from "./years.js";

export const Modelo = sequelize.define('Modelo', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    codeAuto: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    fechaRegistroAuto: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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

Automovil.belongsTo(Modelo, {
    foreignKey:{
        allowNull:false
    }
});