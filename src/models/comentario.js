import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Usuario } from "./usuario.js";
import { Autopartes } from "./autopartes.js";

export const Comentario = sequelize.define('Comentario', {
    idComentario: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    comentario:{
        type:DataTypes.STRING(250),
        allowNull:false
    },
    fechaComentario:{
        type:DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }

},{
    timestamps: false
});


Comentario.belongsTo(Usuario);
Usuario.hasMany(Comentario, {
    foreignKey: {
        allowNull: true
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Comentario.belongsTo(Autopartes);
Autopartes.hasMany(Comentario, {
    // foreignKey: {
    //     name:"idAutoparte",
    //     allowNull: true
    // },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



