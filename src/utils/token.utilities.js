import jwt from "jsonwebtoken";
import { JWT_KEY } from "./env.js";

export const generateToken = item =>
    jwt.sign(item, JWT_KEY, { expiresIn: '2d' });
export const validateToken = token => jwt.verify(token, JWT_KEY);
//this function returns the token
export const findToken = req => req.headers.authorization;