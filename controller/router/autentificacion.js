const express = require('express');
const router = express.Router();

const passport = require('passport');
//OBJETO PARA VERIFICAR SI ESTÁ LOGGED EL USER
const { isLoggedIn } = require('../../model/auth');
const { isNotLoggedIn } = require('../../model/auth');

router.get('/signup',  isNotLoggedIn, (req,res)=>{
    res.render('auth/signup')
});

//AL HACER UN SIGNUP VIAJA A PASSPORT.JS A PASSPORT
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup',{
    successRedirect: '/inicio',
    failureRedirect: '/singup',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res)=>{
    res.render('auth/signin');
});

//AL HACER UN SIGNIN VIAJA A PASSPORT.JS A PASSPORT
router.post('/signin',  isNotLoggedIn, (req, res, next)=>{
    passport.authenticate('local.signin',{
        //REDIRECCIONA SI FUE CORRECTO O NO
        successRedirect: '/inicio',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req,res)=>{
    res.render('profile');
});

//CERRAR SESIÓN
router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;