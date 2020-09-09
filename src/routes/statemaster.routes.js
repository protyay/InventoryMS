const states = require("../controllers/statemaster.controller.js")
const express = require('express')
const router = require("express").Router()
const auth = require('../middleware/auth')

// Retrieve all States
router.get("/states",auth,states.findAll);

module.exports = router