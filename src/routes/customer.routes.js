const express = require('express')
const router = require("express").Router();
const customers = require("../controllers/customer.controller.js");
const auth = require('../middleware/auth')

 // Create a new Customer
 router.post("/customer",auth, customers.create);
// Retrieve all Customers
router.get("/customers",auth,customers.findAll);
// Retrieve a single customer with id
router.get("/customers/customer/:id",auth, customers.findOne);
// Update a Customer with id
router.patch("/customer/:customerCode",auth, customers.update);

module.exports = router