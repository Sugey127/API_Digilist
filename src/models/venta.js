import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Usuario } from "./usuario.js";

export const Venta = sequelize.define('Venta', {
    idVenta: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,

        primaryKey: true,
        allowNull: false
    },

    fechaVenta:{
        type:DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false
});

Usuario.hasMany(Venta, {
    foreignKey:{
        allowNull:false
    }
})

Venta.belongsTo(Usuario, {
    foreignKey:{
        allowNull:false
    }
});