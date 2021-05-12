const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', {titulo: "mi titulo dinamico"})
})
  
router.get('/recuperacion', (req, res) => {
     res.render('recuperacion', {tituloServicio: "Mensaje dinamico de servicios"});
})

router.get('/reestablecer', (req, res) => {
    res.render('reestablecer');
})

module.exports = router;