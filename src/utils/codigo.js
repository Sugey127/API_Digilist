import crypto from 'crypto';

export const generateCode = () => crypto.randomBytes(2).toString('hex').toUpperCase();