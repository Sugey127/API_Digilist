import jwt from 'jsonwebtoken';
import { validateRole } from '../validators/validateRole.js'
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const authorization = (req, res, next) => {

    const token = req.headers.authorization;

    try {
        validateRole(token.split(' ').pop(), "administrador", "role", "no eres admin");
        next();
    } catch (err) {
        res.status(500).json(err.message)
    }
}

export const authentification = (req, res, next) => {
    
    let token = req.headers.authorization;
    token = token.split(' ').pop();
    console.log(token);
    try {
        const user = jwt.verify(token, process.env.JWT_KEY);
        validateRole(token, 'administrador', "role", "no eres admin");
        next();
    } catch (err) {
        res.status(500).json(err.message); 
    }
}