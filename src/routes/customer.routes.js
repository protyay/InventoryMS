const express = require('express');
const router = express.Router();
const customers = require("../controllers/customer.controller.js");
const auth = require('../middleware/auth');

// Create a new Customer
router.post("/customers",auth, customers.create);
// Retrieve all Customers
router.get("/customers",auth,customers.findAll);
// Retrieve a single customer with id
router.get("/customers/customer/:id",auth, customers.findOne);
// Update a Customer with id
router.patch("/customers/:id",auth, customers.update);

module.exports = router;