import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
<<<<<<< HEAD
=======
import { Automovil } from "./automovil.js";
>>>>>>> origin/main

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

<<<<<<< HEAD
=======
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
>>>>>>> origin/main
