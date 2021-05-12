// INICIALIZACION
const express = require("express");
const app = express();

const morgan = require('morgan');

//CONFIGURACION PUERTO
const port = process.env.PORT || 3000;

//MOTOR DE PLANTILLAS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//MIDDLEWARES

app.use(morgan('dev'));

//RUTA PUBLICA
app.use(express.static(__dirname + "/public"));

//LLAMAR A LAS RUTAS DESDE ROUTER
app.use('/', require('./router/RutasWeb'));
app.use('/mascotas', require('./router/Mascotas'));



//ERROR 404
app.use((req, res, next) => {
   res.status(404).render('404', {
      titulo: "404",
      descripcion: "Titulo del sitio web"
   });
})


app.listen(port, () => {
   console.log(`Estas con express`);
})

