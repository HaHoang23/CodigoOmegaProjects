// INICIALIZACION
const express = require("express");
const app = express();

const morgan = require('morgan');

//CONFIGURACION 
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");

//MOTOR DE PLANTILLAS
app.set("views", __dirname + "/views");


//MIDDLEWARES

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//VARIABLES
app.use((req,res,next)=>{

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

