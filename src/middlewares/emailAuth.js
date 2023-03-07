import nodemailer from 'nodemailer';
import { EMAILER_PASS, EMAIL_ACCOUNT } from '../utils/env';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        Usuario: EMAIL_ACCOUNT, //la cuenta que creaste para enviar notificaciones
        pass: EMAILER_PASS
    }
});

export const emailAuth = async (req, res) => {
    try {
        const UsuarioExist = await Usuario.findOne({ where: { email: req.body.email } });
        if (UsuarioExist?.dataValues) throw new Error('Esta cuenta ya esta registrada').message;
        const verificationCode = generateCode();
        const info = await transporter.sendMail({
            from: 'digilist.refaccionaria@gmail.com',
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
                <h2 style="text-align: center; color=#FA8802"> Bienvenido ${req.body.UsuarioNombre} ${req.body.usuarioApellido}!</h2>
                <h3 style="text-align: center; background: #FA8802; padding: 10px; border-radius: 10px;">Tu codigo es: ${verificationCode}</h3>
                <h4 style="text-align: center;">if you have not solicitated the message<br>please ignore this email</h4>
                <h5 style="text-align: center">Digilist Refaccionaria</h5>
            </body> 
            </html>
            `
        });
        req.body.verificationCode = verificationCode;
        console.log(await PreRegister.create(req.body));
        res.send('Email enviado');
    } catch (err) {
        res.status(403).json(err);
        console.log(err);
    }
};

export const verifyCode = async (req, res, next) => {
    try {
        const { verificationCode } = req.params;
        const Usuario = await PreRegister.findOne({ where: { verificationCode } });
        if (!Usuario?.dataValues?.id) throw new Error('Codigo Incorrecto').message;
        req.body = Usuario.dataValues;
        await PreRegister.destroy({ where: { email: Usuario.dataValues.email } });
        await transporter.sendMail({
            from: 'digilist.refaccionaria@gmail.com',
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
                <style> body > * {text-align: center;} </style>
                <h2 style="text-align: center; color=#F4EDED"> Bienvedido ${req.body.Usuarioname} ${req.body.lastname}!</h2>
                <h5 style="text-align: center">Digilist Refaccionaria</h5>
            </body>
            </html>`
        });
        next();
    } catch (err) {
        console.log(err);
        res.send(err);
    }
};


export const regenerateCode = async (req, res) => {
    try {
        const Usuario = await PreRegister.findOne({ where: { email: req.params.email } });
        const verificationCode = generateCode();
        await PreRegister.update({ verificationCode }, { where: { email: req.params.email } })
        
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
            <body style="background-color: rgb(11, 21, 29); color: rgb(255, 255, 255)">
                <style> body > * {text-align: center;} </style>
                <h2 style="text-align: center; color:#FA8802"> Bienvenido ${Usuario.dataValues.Usuarioname} ${Usuario.dataValues.lastname}!
                </h2>
                <h3">Tu codigo es: ${verificationCode}</h3>
                <h4>si no ha solicitado el mensaje<br>ignora este email</h4>
                <h5>Digilist Refaccionaria</h5>
            </body>
            </html>`
        });
        res.send('se envio el codigo');
    } catch (err) {
        res.send(err);
        console.log(err);
    }
};

export const forgotPassword = async (req, res, next) => {
    try {
        const Usuario = validateToken(req.headers.authorization);
        if (await ForgotPassword.findOne({ where: { email: Usuario.email } })?.id)
            res.status(401).send('Esta cuenta ya esta registrada')
        else {
            const forgotPass = await ForgotPassword.create({ password: req.query.password, email: Usuario.email });
            await transporter.sendMail({
                from: 'digilist.refaccionaria@gmail.com',
                to: Usuario.email,
                subject: '¿Estas intentando cambiar tu contraseña?',
                html: `
            <body>
                <h1>Bienvenido ${Usuario.Usuarioname} ${Usuario.lastname}</h1>
                <h2>¿Intentas recordar la contraseña?</h2>
                <a href="https://apidigilist-production.up.railway.app/usuario/olvidarContraseña/${forgotPass.dataValues.token}"><button>Confirmar cambios</button></a>
            </body>`
            });
            res.send('se envio el email');
        }
    } catch (err) {
        res.send(err);
        console.log(err);
    }
};