import jwt from 'jsonwebtoken';
import { validateRole } from '../validators/validateRole.js'
import dotenv from 'dotenv';
import { Usuario } from "../models/usuario.js";
import { validateUsuario } from '../validators/validateUsuario.js';
dotenv.config({ path: './.env' });

//autentificacion de los usuariso
export const authorization = (req, res, next) => {

    let token = req.rawHeaders.find(x => x.split(' ').includes('Bearer'));
    token = token.split(' ').pop();

    // console.log(token, 'holi')
    try {
        validateRole(token, "administrador", "role", "no eres admin");
        next();
    } catch (err) {
        res.status(500).json(err.message)
        // console.log(err.message)
    }
}

export const authentification = (req, res, next) => {
    // const token = req.rawHeaders[11].split(' ').pop();
    let token = req.rawHeaders.find(x => x.split(' ').includes('Bearer'));
    // console.log("-----------------------------------", token);
    token = token.split(' ').pop();
    console.log(token);
    try {
        //console.log("---")
        // console.log(process.env.JWT_KEY)
        const user = jwt.verify(token, process.env.JWT_KEY);
        //console.log("+++")

        console.log(user, 'fdkjufh laedfiadjslofjadsifjñasdfijñfjds');
        validateUsuario(user.email, user.password, "No estas regsitrado");
        next();
    } catch (err) {
        res.status(500).json(err.message); 
    }
}