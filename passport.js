const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy;

const pool = require('./database');
const helpers = require('./helpers');
//VALIDACIÓN DEL SIGNIN
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
}, async (req, username, password, done) =>{
    console.log(req.body);
    
    //VALIDACION DE CONTRASEÑA
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    

    if( rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword){
            done(null, user, req.flash('success','Welcome '+ user.username));
            console.log('user correcto');
        }else{
            done(null, false, req.flash('message','Incorrect Password'));
            console.log('user incorrecto');
        }
    }else{
        console.log('user no existe');
        return done(null, false, req.flash('message','Username no existe'));
        
    }
    
}  ));

//SIGNUP
passport.use('local.signup', new LocalStrategy({

    usernameField: 'username', //Recibe desde signup el campo de username
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done)=> {
    //CREAR NUEVO USUARIO
    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    //SE CIFRA PASSWORD
    newUser.password = await helpers.encryptPassword(password);

    //SE GUARDA EN LA BD
    const result =  await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    console.log(result);
    return done(null, newUser);

}));

//GUARDAR ID
passport.serializeUser((user, done) =>{
    done(null, user.id);
});

//TOMANDO EL ID PARA OBTENER LOS DATOS
passport.deserializeUser(async (id, done)=>{
    const rows = await pool.query('SELECT * FROM users Where id= ?',[id]);
    done(null, rows[0]);
});



