import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";

export const Proveedor = sequelize.define('Proveedor',{
    idTipoProveedor: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false
    },
    nombreProveedor: {
        type: DataTypes.STRING,
        allowNull:false
    },
    direccionProveedor: {
        type: DataTypes.STRING,
        allowNull:false
    },
    RfcProveedor: {
        type: DataTypes.STRING,
        allowNull:false,
        primaryKey: true
    },
    telefonoProveedor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    emailProveedor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaRegistroProveedor:{
        type:DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
},{
    timestamps: false
});

