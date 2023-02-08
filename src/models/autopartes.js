import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Entradas } from "./entradas.js";

export const Autopartes = sequelize.define('Autopartes', {
    idAutopartes: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true 
    },
    description:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    Imagen:{
        type: DataTypes.STRING
    },
    fechaRegistroAutoparte:{
        type:DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
},{
    timestamps: false
});


Entradas.hasMany(Autopartes, {
    foreignKey:{
        allowNull:false
    }
})

Autopartes.belongsTo(Entradas, {
    foreignKey:{
        allowNull:false
    }
});