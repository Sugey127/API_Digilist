import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";

export const Proveedor = sequelize.define('Proveedor',{
    idTipoProveedor: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    nombreProveedor: {
        type: DataTypes.STRING,
        allowNull:false
    },
    fechaRegistroProveedor:{
        type:DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
},{
    timestamps: false
});

