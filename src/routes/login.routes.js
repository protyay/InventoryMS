const express = require('express')
const router = new express.Router()
const userlogin = require("../controllers/login.controller.js");
const auth = require('../middleware/auth')

router.post('/user/session',userlogin.loginUser);
router.delete('/user/session',auth,userlogin.logoutUser);
module.exports = router;
