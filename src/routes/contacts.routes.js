const express = require('express')
const router = require("express").Router();
const contacts = require("../controllers/contacts.controller.js");
const auth = require('../middleware/auth')

 // Create a new Contact Details
 router.post("/contacts",auth, contacts.create);
// Retrieve all Contact Details
router.get("/contacts/:id",auth,contacts.findAll);
// update contact details
// router.patch("/contacts/:contactNo",auth,contacts.update);


module.exports = router