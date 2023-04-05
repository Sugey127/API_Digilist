import nodemailer from 'nodemailer';
import { PreResgistro } from '../models/PreRegistro.js';
import { RecordarPassword } from '../models/RecordarPass.js';
import { Usuario } from '../models/usuario.js';
import { generateCode } from '../utils/codigo.js';
import { EMAILER_PASS, EMAIL_ACCOUNT } from '../utils/env.js';
import { validateToken } from '../utils/token.utilities.js';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_ACCOUNT, //la cuenta que creaste para enviar notificaciones
        pass: EMAILER_PASS
    }
});

export const emailAuth = async (req, res) => {
    try {
        const UsuarioExist = await Usuario.findOne({ where: { email: req.body.email } });
        if (UsuarioExist?.dataValues) throw new Error('Esta cuenta ya esta registrada').message;

        const verificationCode = generateCode();
        req.body.codigo = verificationCode;
        await transporter.sendMail({
            from: EMAIL_ACCOUNT,
            to: req.body.email,
            subject: 'verificacion de tu cuenta',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verificacion de tu Codigo</title>
            </head>
            <body style="background-color: rgb(11, 21, 29)">
                <h2 style="text-align: center; color: white;"> Bienvenido ${req.body.userNombre} ${req.body.usuarioApellido}!</h2>
                <h3 style="text-align: center; background: #FA8802; padding: 10px; border-radius: 10px; color: white;">Tu codigo es: ${verificationCode}</h3>
                <h4 style="text-align: center; color: white;">if you have not solicitated the message<br>please ignore this email</h4>
                <h5 style="text-align: center; color: white;">Digilist Refaccionaria</h5>
            </body>

            </html>
            `
        });
        req.body.verificationCode = verificationCode;
        console.log(await PreResgistro.create(req.body)); //pre-registro del usuario
        res.send(`Su código ha sido enviado al email ${req.body.email}`);
    } catch (err) {
        res.status(403).json(err);
        console.log(err);
    }
};

export const verifyCode = async (req, res, next) => {
    try {
        const { codigo } = req.params;
        const usuario = await PreResgistro.findOne({ where: { codigo } });
        if (!usuario?.dataValues?.codigo) throw new Error('Codigo Incorrecto').message;
        console.log('ahhhh', usuario.dataValues)
        req.body = usuario.dataValues;
        await PreResgistro.destroy({ where: { email: usuario.dataValues.email } });
        await transporter.sendMail({
            from: EMAIL_ACCOUNT,
            to: req.body.email,
            subject: 'Su cuenta se ha registrado correctamente',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verificacion de tu Codigo</title>
            </head>
            <body style="background-color: rgb(11, 21, 29)">
                <h2 style="color: #FFFFFF; text-align: center;">Bienvenido ${req.body.userNombre} ${req.body.usuarioApellido}!</h2>
                <h5 style="color: #FFFFFF; text-align: center;">Digilist Refaccionaria</h5>
            </body>

          
            </html>`
        });
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

export const regenerateCode = async (req, res) => {
    try {
        const Usuario = await PreResgistro.findOne({ where: { email: req.params.email } });
        const verificationCode = generateCode();
        await PreResgistro.update({ verificationCode }, { where: { email: req.params.email } })

        await transporter.sendMail({
            from: 'digilist.refaccionaria@gmail.com',
            to: Usuario.dataValues.email,
            subject: 'verificacion de tu cuenta',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verificacion de tu Codigo</title>
            </head>
            <body style="background-color: rgb(11, 21, 29); color: #fff;">
                <style> body > * {text-align: center;} </style>
                <h2 style="text-align: center; color:#FA8802"> Bienvenido ${Usuario.dataValues.userNombre} ${Usuario.dataValues.lastname}!</h2>
                <h3>Tu codigo es: ${verificationCode}</h3>
                <h4>si no ha solicitado el mensaje<br>ignora este email</h4>
                <h5>Digilist Refaccionaria</h5>
            </body>

            </html>`
        });
        res.status(200).send('se envio el codigo');
    } catch (err) {
        res.send(err);
        console.log(err);
    }
};

//! ☠️☠️☠️☠️☠️☠️☠️☠️ Recuperar Contraseña ☠️☠️☠️☠️☠️☠️☠️☠️ NO TOCAR O SUGEY TE MATA
export const forgotPassword = async (req, res, next) => {
    try {

        const usuario = await Usuario.findOne({ where: { email: req.query.email } });

        if (await RecordarPassword.findOne({ where: { email: req.query.email } })?.codigo)
            res.status(401).send('Esta cuenta esta siendo verficada en este momento')
        else {
            const forgotPass = await RecordarPassword.create(req.query);
            console.log('data', forgotPass);
            await transporter.sendMail({
                from: 'digilist.refaccionaria@gmail.com',
                to: req.query.email,
                subject: '¿Estas intentando cambiar tu contraseña?',
                html: `
                <body style="background-color: rgb(11, 21, 29); color: #FFFFFF;">
                    <h1>Bienvenido ${usuario.dataValues.userNombre} ${usuario.dataValues.usuarioApellido}</h1>
                    <h2>¿Estás intentando recuperar tu contraseña?</h2>
                    <a href="https://digilist.fly.dev/usuario/recuperarContrasena/${forgotPass.dataValues.codigo}">
                    <button type="button" style="font-size: 24px; width: 200px;">Sí</button>
                    </a>
             </body>`
            });
            res.send('se envio el email');
        }
    } catch (err) {
        res.send(err);
        console.log(err);
    }
};