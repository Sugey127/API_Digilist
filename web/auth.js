import jwt from "jsonwebtoken";
import { validateRole } from "../src/validators/validateRole.js";
import { JWT_KEY } from "../src/utils/env.js";
import { Usuario } from "../src/models/usuario.js";
import { Op } from "sequelize";

export const webAuth = async (req, res, next) => {
    try {
        console.log(req.cookies)
        const token = req.cookies?.token;

        if (!token) { res.status(307).redirect('https://digilist.fly.dev/digilist/login'); return }

        const usuario = jwt.verify(token, JWT_KEY);

        console.log(usuario);

        const usuarioValido = await Usuario.findOne({ where: { [Op.and]: [{ email: usuario.email }, { StatusId: 1 }] } });
        if (!usuarioValido?.email) {
            res.status(404).render('404');
            return;
        }


        console.log('pasooooooooooooooooo')
        if(usuarioValido.role !== 'administrador') {
            res.status(401).render('401');
            return;
        }
        next();
    } catch (err) {

        console.log(err)
        res.render('500')
    }
}