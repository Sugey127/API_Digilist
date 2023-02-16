import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Autopartes } from "./autopartes.js";
import { Usuario } from "./usuario.js";
import { Marca } from "./marca.js";
import { Venta } from "./venta.js";
import { Recibo } from "./recibo.js";
import { Proveedor } from "./proveedor.js";
import { Modelo } from "./modelo.js";
Env
export const Status = sequelize.define('Status', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.ENUM('activo, inactivo')
    }
}, { timestamps: false });


Autopartes.belongsTo(Status, {
    foreignKey: {
        allowNull: false
    }
});

Status.hasMany(Autopartes, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


A.belongsTo(Status, {
    foreignKey: {
        allowNull: false
    }
});

Status.hasMany(A, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
