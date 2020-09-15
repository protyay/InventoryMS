const db = require("../models");
const Customer = db.customer;
const Op = db.Sequelize.Op;
const requestValidator = require('../middleware/commonValidations');
const {default: validator} = require("validator");

exports.create = async (req, res) => {
    try {

        if (requestValidator.checkEmptyString(req.body.customerName)) {
            res.status(400).send({success: false, error: {reason: 'Customer Name is required'}});
            return;
        }
        if (requestValidator.checkEmptyString(req.body.state)) {
            res.status(400).send({success: false, error: {reason: 'State is required'}});
            return;
        }
        const noOfCustomers = await Customer.count();
        req.body.customerCode = 'CDC' + req.body.state + parseInt(noOfCustomers + 1);
        const customer = await Customer.create(req.body);
        res.status(201).send({success: true, data: {message: 'Customer Created Successfully!'}})
    } catch (err) {
        console.log(err);
        res.status(500).send({success: false, error: {reason: 'Error Occurred while saving'}});
    }
}

exports.findAll = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.send({success: true, data: customers})
    } catch (err) {
        console.log(err);
        res.status(500).send({success: false, error: {reason: 'Error Occurred while fetching'}});
    }

}

exports.findOne = async (req, res) => {
    try {
        const customerCode = req.params.id;
        const customer = await Customer.findOne({where: {customerCode}});
        if (!customer) {
            return res.status(404).send({success: false, error: {reason: 'Invalid CustomerCode. Please try again'}});
        }
        res.send({success: true, data: customer})
    } catch (err) {
        console.log(err);
        res.status(500).send({success: false, error: {reason: 'Error Occurred while fetching'}});
    }
}

exports.update = async (req, res) => {

    const updates = Object.keys(req.body);
    const updatesAllowed = ['customerName', 'officeAddress', 'factoryAddress', 'gstin', 'customerStatus'];
    const isValidUpdate = updates.every((update) => updatesAllowed.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({success: false, error: {reason: 'Invalid Update found'}});
    }
    try {

        if (requestValidator.checkEmptyString(req.body.customerName)) {
            return res.status(400).send({success: false, error: {reason: 'Customer Name is required'}})
        }
        const customer = await Customer.update(req.body, {
            where: {
                customerCode: req.params.id
            }
        });
        if (customer === 0) {
            return res.status(404).send({success: false, error: {reason: `No Customer updated `}});
        }
        res.send({success: true, data: {message: `Customer Updated successfully!`}});
    } catch (err) {
        console.log(err);
        res.status(500).send({success: false, error: {reason: 'Error occurred while updating. Please try again'}});
    }
}

