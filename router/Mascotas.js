const express = require('express');
const router = express.Router();

router.get('/', (req,res) =>{
    res.render("mascotas",{
        arrayMascotas: [
            {id: 'asdasdaa', nombre: 'rex', descripcion: 'rex descripcion'},
            {id: 'a232daa', nombre: 'rex1', descripcion: 'rex1 descripcion'},
            {id: 'as34344', nombre: 'rex2', descripcion: 'rex2 descripcion'},
        ]
    })
})

router.get('/crear',(req,res)=>{
    res.render('crear');
})

module.exports = router;