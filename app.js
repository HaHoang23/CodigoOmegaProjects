// INICIALIZACION
const express = require("express");
const app = express();
require('./passport');

const morgan = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const cookieParser = require('cookie-parser');
//const flash       = require('req-flash');

app.use(cookieParser());
app.use(session({ secret: '123', resave: true, saveUninitialized: true}));
app.use(flash());



//CONFIGURACION 
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");

//MOTOR DE PLANTILLAS
app.set("views", __dirname + "/views");

//MIDDLEWARES

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//VARIABLES
app.use((req,res,next)=>{
   app.locals.success = req.flash('success');
   app.locals.message = req.flash('message');
   next();
})

//RUTA PUBLICA
app.use(express.static(__dirname + "/public"));

//RUTAS WEB
app.use('/', require('./router/RutasWeb'));


//EJEMPLO
app.use('/links', require('./router/links'));
app.use('/', require('./router/autentificacion'));




//ERROR 404
app.use((req, res, next) => {
   res.status(404).render('404', {
      titulo: "404",
      descripcion: "Titulo del sitio web"
   });
})

//INCIAR SERVER
app.listen(port, () => {
   console.log(`Estas con express`);
})

