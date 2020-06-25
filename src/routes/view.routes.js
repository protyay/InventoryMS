const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')

//public route to render to login
router.get('/login',(req,res)=>{
    res.render('login')
})

//public route to render to registration
router.get('/register',(req,res)=>{
    res.render('register')
})

router.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})



module.exports = router