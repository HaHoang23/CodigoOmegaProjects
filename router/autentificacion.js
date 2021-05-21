const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/signup',(req,res)=>{
    res.render('auth/signup')
});

//AL HACER UN SIGNUP VIAJA A PASSPORT.JS A PASSPORT
router.post('/signup', passport.authenticate('local.signup',{

    successRedirect: '/inicio',
    failureRedirect: '/singup',
    failureFlash: true
}));

router.get('/signin', (req, res)=>{
    res.render('auth/signin');
});

//AL HACER UN SIGNIN VIAJA A PASSPORT.JS A PASSPORT
router.post('/signin', (req, res, next)=>{
    passport.authenticate('local.signin',{
        successRedirect: '/inicio',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

module.exports = router;