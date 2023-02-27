import multer from  'multer'
import path from 'path';
import { JWT_KEY } from '../utils/env.js';
import jwt from 'jsonwebtoken';

const dir = path.join(import.meta.url, '../../uploads').split('file:\\').pop();

const storage = multer.diskStorage({
    destination: function(req, file, cb)  {
        cb(null, dir)
    },
    filename: function(req, file, cb) {
        // const extension = file.originalname.split('.').pop();
        // const uniqueSuffix = Date.now();
        // cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
        cb(null, `${file.fieldname}-${jwt.verify(req.headers.authorization, JWT_KEY).ImagenId}.jpg`);
    }
});

export const subirImagen = multer({
    storage,
    limits: {
        fieldSize: 1024 * 1024 * 100, //10mb
        files: 3
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
});

const dirAutopartes = path.join(import.meta.url, '../../uploads/autopartes').split('file:\\').pop();

const storageAutoparte = multer.diskStorage({
    destination: function(req, file, cb)  {
        cb(null, dirAutopartes)
    },
    filename: function(req, file, cb) {
        // const extension = file.originalname.split('.').pop();
        // const uniqueSuffix = Date.now();
        // cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
        cb(null, `${file.fieldname}-${req.params.code}.jpg`);
    }
});

export const subirImagenAutoparte = multer({
    storageAutoparte,
    limits: {
        fieldSize: 1024 * 1024 * 100, //10mb
        files: 3
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
});