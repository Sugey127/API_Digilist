import multer from 'multer'
import path from 'path';
import { JWT_KEY } from '../utils/env.js';
import jwt from 'jsonwebtoken';
import cloud from 'cloudinary'
import { CLOUDINARY_API_SECRET, CLOUDINARY_CLOUDNAME, CLOUDINARY_KEY } from '../utils/env.js';

export const cloudinary = cloud.v2;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUDNAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

export const subirImagen = multer({ storage: multer.memoryStorage() });

