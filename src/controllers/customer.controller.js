const db = require("../models");
const Customer = db.customer;
const Visit = db.visits;
const Op = db.Sequelize.Op;
const commonvalidation = require('../middleware/commonValidations');
const { default: validator } = require("validator");

exports.create = async (req, res) => {
  try {
    
    if(commonvalidation.checkEmptyString(req.body.customerName)){
      return res.status(400).send({success:false,error:{reason:'Customer Name is required'}})
    }else if(commonvalidation.checkEmptyString(req.body.contactPerson)){
      return res.status(400).send({success:false,error:{reason:'Contact Person is required'}})
    }else if(!commonvalidation.allowNameWithSpace(req.body.contactPerson)){
      return res.status(400).send({success:false,error:{reason:'Invalid entry for Contact Person'}})
    }else if(commonvalidation.checkEmptyString(req.body.contactNumber)){
      return res.status(400).send({success:false,error:{reason:'Contact Number is required'}})
    }else if(!commonvalidation.checkNumericValue(req.body.contactNumber)){
      return res.status(400).send({success:false,error:{reason:'Invalid entry for Contact Number'}})
    }else if(req.body.email && !commonvalidation.checkValiEmail(req.body.email)){
      return res.status(400).send({success:false,error:{reason:'Invalid Email'}})
    }

    const customer = await Customer.create(req.body)
    res.status(201).send({ success: true, data: { message:'Customer Created Successfully!'}})
  } catch (err) {
    res.status(500).send({ success: false, error: { reason: 'Error Occurred while saving' }});
  }
}

exports.findAll = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      where: {
        customerStatus: true
      }
    });
    res.send({ success: true, data: customers })
  } catch (err) {
    res.status(500).send({ success: false, error: {reason:'Error Occurred while fetching'}})
  }

}

exports.findOne = async (req, res) => {
  try {
    const customerCode = req.params.id
    const customer = await Customer.findOne({ where: { customerCode } })
    if (!customer) {
      return res.status(404).send({ success: false, error: { reason: 'Invalid CustomerCode. Please try again' } });
    }
    res.send({ success: true, data: customer })
  } catch (err) {
    res.status(500).send({ success: false, error: {reason:'Error Occurred while fetching'}});
  }
}

exports.update = async (req, res) => {

  const updates = Object.keys(req.body);
  const updatesAllowed = ['customerName', 'address', 'contactPerson', 'contactNumber', 'email', 'gstin']
  const isValidUpdate = updates.every((update) => updatesAllowed.includes(update))
  if (!isValidUpdate) {
    return res.status(400).send({ success: false, error: { reason: 'Invalid Update query found' }});
  }
  try {
    
    if(commonvalidation.checkEmptyString(req.body.customerName)){
      return res.status(400).send({success:false,error:{reason:'Customer Name is required'}})
    }else if(commonvalidation.checkEmptyString(req.body.contactPerson)){
      return res.status(400).send({success:false,error:{reason:'Contact Person is required'}})
    }else if(!commonvalidation.allowNameWithSpace(req.body.contactPerson)){
      return res.status(400).send({success:false,error:{reason:'Invalid entry for Contact Person'}})
    }else if(commonvalidation.checkEmptyString(req.body.contactNumber)){
      return res.status(400).send({success:false,error:{reason:'Contact Number is required'}})
    }else if(!commonvalidation.checkNumericValue(req.body.contactNumber)){
      return res.status(400).send({success:false,error:{reason:'Invalid entry for Contact Number'}})
    }else if(req.body.email && !commonvalidation.checkValiEmail(req.body.email)){
      return res.status(400).send({success:false,error:{reason:'Invalid Email'}})
    }

    const customer = await Customer.update(req.body, {
      where: {
        customerCode: req.params.customerCode
      }
    });
    if (customer == 0) {
      return res.status(404).send({ success: false, error: { reason: `No Customer updated with Customer Code ${req.params.customerCode}` } });
    }
    res.send({ success: true, data: { message: `Customer successfully updated with ${req.params.customerCode}` } });
  } catch (err) {
    res.status(500).send({ success: false, error: { reason: 'Error occurred while updating. Please try again' } });
  }
}
