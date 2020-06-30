const express = require('express')
const router = new express.Router()
const userregistration = require("../controllers/registration.controller.js");

router.post("/user/new", userregistration.create);
router.post("/user/duplicate",userregistration.checkDuplicateEmail);
//router.get("/",userregistration.findAll)
module.exports = router
  