import sharp from "sharp";
import fs from 'fs';

export const RenderizadorImagen = (filePath, size = 200) => sharp(filePath).resize(size, size).toBuffer().then(data => fs.writeFile(filePath, data, err => new Error(err)))