const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index')
})
  
router.get('/recuperacion', (req, res) => {
     res.render('recuperacion');
})

router.get('/reestablecer', (req, res) => {
    res.render('reestablecer');
})

router.get('/inicio', (req, res) => {
    res.render('inicio');
})

module.exports = router;