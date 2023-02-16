import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Años } from "./años.js";


export const Modelo= sequelize.define('Modelo',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    modelo: {
        type: DataTypes.STRING
    }
}, { timestamps: false })

Modelo.belongsTo(Años, {
    foreignKey: {
        allowNull: false
    }
});

Años.hasMany(Modelo, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})