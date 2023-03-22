import { validateToken } from '../utils/token.utilities.js';
export const validateRole = (token, condition, parametro, msg) => {
    const decodificado = validateToken(token)
    if (decodificado[`${parametro}`] != condition) throw new Error(msg);
}

