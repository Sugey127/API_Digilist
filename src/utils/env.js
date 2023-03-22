import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export const PORT = process.env.PORT ?? 4001;
export const DB_URI = process.env.DB_URI;
export const JWT_KEY = process.env.JWT_KEY;
export const SALT = process.env.SALT;
export const PROTOCOL = process.env.PROTOCOL ?? 'http';
export const DOMAIN = process.env.DOMAIN || 'localhost'; 
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_CLOUDNAME = process.env.CLOUDINARY_CLOUDNAME;
export const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
export const EMAIL_ACCOUNT = process.env.EMAIL_ACCOUNT 
export const EMAILER_PASS = process.env.EMAILER_PASS