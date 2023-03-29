import { validateRole } from '../validators/validateRole.js'

export const authorization = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        validateRole(token, "administrador", "role", "no eres admin");
        next();
    } catch (err) {
        res.status(500).json(err.message)
    }
}

export const authentification = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        validateRole(token, 'administrador', "role", "no eres admin");
        next();
    } catch (err) {
        res.status(500).json(err.message); 
    }
}