const express = require("express");
const app = express();

const port = process.env.PORT || 3000;


//motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");



//RUTA PUBLICA
app.use(express.static(__dirname + "/public"));

//LLAMAR A LAS RUTAS DESDE ROUTER
app.use('/', require('./router/RutasWeb'));
app.use('/mascotas', require('./router/Mascotas'));



//ERROR
app.use((req, res, next) => {
   res.status(404).render('404', {
      titulo: "404",
      descripcion: "Titulo del sitio web"
   });
})


app.listen(port, () => {
   console.log(`Estas con express`);
})

