const express = require('express')
const router = new express.Router()
const userlogin = require("../controllers/login.controller.js");
const auth = require('../middleware/auth')

router.get('/user',userlogin.loginUser)
router.post('/user',auth,userlogin.logoutUser)
module.exports = router