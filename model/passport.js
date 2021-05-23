const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./database');
const helpers = require('./helpers');

//VALIDACIÓN DEL SIGNIN
passport.use('local.signin', new LocalStrategy({
    usernameField: 'txt_Email',
    passwordField: 'txt_Contrasenia',
    passReqToCallback: true
}, async (req, txt_Email, txt_Contrasenia, done) => {
    console.log(req.body);

    //VALIDACION DE CONTRASEÑA
    const rows = await pool.query('SELECT * FROM usuarios_login WHERE correo = ?', [txt_Email]);

    //SE SACA EL USER DEL ARRAY
    if (rows.length >= 0) {
        const user = rows[0];
        console.log(user.contrasena);
        console.log(txt_Contrasenia);
        const validPassword = await helpers.matchPassword(txt_Contrasenia, user.contrasena);
        if (validPassword) {
            done(null, user, req.flash('success_msg', 'Bienvenido ' + user.nom_usuario));
            console.log('user correcto');
        } else {
            done(null, false, req.flash('message', 'Contraseña Incorrecta'));
            console.log('user incorrecto');
        }
    } else {
        console.log('user no existe');
        return done(null, false, req.flash('message', 'El correo ingresado no existe'));
    }
}));

//SIGNUP
passport.use('local.signup', new LocalStrategy({

    usernameField: 'correo', //Recibe desde signup el campo de username
    passwordField: 'contrasena',
    passReqToCallback: true

}, async (req, correo, contrasena, done) => {
    //CREAR NUEVO USUARIO
    const { nom_usuario } = req.body;
    const { tipo_usuario } = req.body;
    const { area_pertenencia } = req.body;
    const newUser = {
        correo,
        contrasena,
        nom_usuario,
        tipo_usuario,
        area_pertenencia
    };
    
    //SE CIFRA PASSWORD
    newUser.contrasena = await helpers.encryptPassword(contrasena);

    //SE GUARDA EN LA BD
    const result = await pool.query('INSERT INTO usuarios_login SET ?', [newUser]);
    newUser.id = result.insertId;
    console.log(result);
    return done(null, newUser);

}));

//GUARDAR ID
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//TOMANDO EL ID PARA OBTENER LOS DATOS
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM usuarios_login WHERE id = ?', [id]);
    done(null, rows[0]);
});



