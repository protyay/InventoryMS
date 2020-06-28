const express = require('express')
const router = new express.Router()
const userlogin = require("../controllers/login.controller.js");
const auth = require('../middleware/auth')

router.get("/validateLogin",userlogin.findOne)
router.post('/logout',auth,userlogin.logoutUser)
module.exports = router