import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Automovil } from "./automovil.js";
import { Proveedor } from "./proveedor.js";

export const Entradas = sequelize.define('Entradas', {
    idEntradas: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    nombreAutoparte: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    code_entrada: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
    },
    fechaEntrada:{
        type:DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
},{
    timestamps: false
});

Automovil.hasMany(Entradas, {
    // foreignKey:{
    //     name:"idAutomovil",
    //     allowNull:false
    // }
})

Entradas.belongsTo(Automovil, {
    // foreignKey:{
    //     name:"idAutomivil",
    //     allowNull:false
    // }
});

Proveedor.hasMany(Entradas, {
    // foreignKey:{
    //     name:"idProveedor",
    //     allowNull:false
    // }
})

Entradas.belongsTo(Proveedor, {
    // foreignKey:{
    //     name:"idProveedor",
    //     allowNull:false
    // }
});