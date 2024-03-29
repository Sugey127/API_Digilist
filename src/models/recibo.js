import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Venta } from "./venta.js";

export const Recibo = sequelize.define('Recibo', { 
    idRecibo: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    Folio:{
        type:DataTypes.STRING,
        primaryKey: true
    },
    cantidad:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    fechaRecibo:{
        type:DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
},{
    timestamps: false
})

Recibo.belongsTo(Venta, {
    foreignKey: {
        allowNull: false
    }
});

Venta.hasMany(Recibo, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})