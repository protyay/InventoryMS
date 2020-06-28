const express = require('express')
const router = new express.Router()
const userregistration = require("../controllers/registration.controller.js");

router.post("/api/createUser", userregistration.create);
//router.get("/",userregistration.findAll)
module.exports = router
  