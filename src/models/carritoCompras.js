import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Usuario } from "./usuario.js";

export const CarritoCompra = sequelize.define('CarritoCompra', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    productos: {
        type: DataTypes.JSONB,
        primaryKey: true
    },
}, {
    timestamps: false
});

Usuario.hasOne(CarritoCompra, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
});

CarritoCompra.belongsTo(Usuario);