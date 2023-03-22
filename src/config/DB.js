import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

// console.log(process.env.DB_PASS);

/**Base de datos local */

// export const sequelize = new Sequelize('digilist', 'postgres', process.env.DB_PASS, {
//     host: 'localhost',
//     dialect: 'postgres'
// });   

/**Base de datos en la nube */
export const sequelize = new Sequelize(process.env.DB_URI);
