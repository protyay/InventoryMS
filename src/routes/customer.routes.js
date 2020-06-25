const express = require('express')
const router = require("express").Router();
const customers = require("../controllers/customer.controller.js");
const auth = require('../middleware/auth')

 // Create a new Customer
 router.post("/createCustomer",auth, customers.create);
// Retrieve all Customers
router.get("/findCustomers",auth,customers.findAll);
// Retrieve a single customer with id
router.get("/findCustomer/:id",auth, customers.findOne);
// Update a Customer with id
router.patch("/updateCustomer/:id",auth, customers.update);

module.exports = router