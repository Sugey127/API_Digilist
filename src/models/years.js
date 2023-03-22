import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Automovil } from "./automovil.js";

export const Years = sequelize.define('Years',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, { timestamps: false });

Years.hasMany(Automovil, {
    foreignKey:{
        allowNull:false
    }
})

Automovil.belongsTo(Years, {
    foreignKey:{
        allowNull:false
    }
});