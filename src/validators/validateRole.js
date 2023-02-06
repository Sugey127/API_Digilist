import jwt from 'jsonwebtoken';
export const validateRole = (token, condition, parametro, msg) => {
    const decodificado = jwt.verify(token, process.env.JWT_KEY);
    if (decodificado[`${parametro}`] != condition) throw new Error(msg);
}

