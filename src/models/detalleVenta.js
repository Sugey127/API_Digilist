import { sequelize } from "../config/DB.js";
import { DataTypes, Sequelize } from "sequelize";
import { Autopartes } from "./autopartes.js";
import { Venta } from "./venta.js"


export const DetalleVenta = sequelize.define('DetalleVenta', {
    cantidadVenta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precioVenta: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    unique: {
        fields: ['idVenta', 'idAutopartes'],
    },
    timestamps: false

});

Autopartes.belongsToMany(Venta, {
    through: DetalleVenta, 
    foreignKey: {
        allowNull: false
    }
});
Venta.belongsToMany(Autopartes, {
    foreignKey: {
        allowNull: false
    },
    through: DetalleVenta,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});