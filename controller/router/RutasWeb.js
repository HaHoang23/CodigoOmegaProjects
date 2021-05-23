const express = require('express');
const router = express.Router();
const passport = require('passport');
const nodemailer = require('nodemailer');
//OBJETO PARA VERIFICAR SI ESTÁ LOGGED EL USER
const { isLoggedIn } = require('../../model/auth');
const pool = require('../../model/database');
const helpers = require('../../model/helpers');


router.get('/', (req, res) => {
    res.render('auth/signin')
})


router.get('/recuperacion', (req, res) => {
    res.render('recuperacion');
})

//RECUPERACION ENVIO DEL EMAIL
router.post('/send-email', async (req, res, next) => {
    const { txt_Email } = req.body;

    content = `
    <h1> Correo de Recuperación de Contraseña</h1>
    <ul>
        <li>Acceda al siguiente enlace para cambiar su contraseña: http://localhost:3000/restablecer</li>
    </ul>`;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'omega.projects.adm@gmail.com',
            pass: 'admin14502'
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const info = await transporter.sendMail({
        from: "'Omega Projects' <omega.projects.adm@gmail.com>",
        to: txt_Email,
        subject: 'Recuperación de Contraseña Omega Projects',
        text: 'Hola',
        html: content
    });

    console.log('Message sent', info.messageId);
    res.redirect('/signin');
});


router.get('/restablecer', (req, res) => {
    res.render('restablecer');
})


//CAMBIAR CONTRASEÑA
router.post('/restablecer', async (req, res) =>{
    const { txt_Contrasenia } = req.body;

    await pool.query('UPDATE usuarios_login SET contrasena = ? WHERE id = ?',[await helpers.encryptPassword(txt_Contrasenia),4]);

    res.redirect('/signin');
});

router.get('/inicio', isLoggedIn, (req, res) => {
    res.render('inicio');
})

module.exports = router;