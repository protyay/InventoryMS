const db = require("../models")
const Customer = db.customer
const Contacts = db.contacts
const Op = db.Sequelize.Op;
const commonvalidation = require('../middleware/commonValidations');
const { default: validator } = require("validator");


exports.create = async(req,res) =>{
    try{
        const customer  = await Customer.findOne({ where:{customerCode : req.body.customerCode} });
        if(!customer){
            return res.status(404).send({success:false,error:{reason:'Invalid Customer!'}})
        }
        //to check duplicate contact number
        const contactNo = await Contacts.findOne({where : {contactNumber : req.body.contactNumber}})
        if(contactNo){
            return res.status(400).send({success:false,error:{reason:'Contact Number already exists!'}})
        }
        if(commonvalidation.checkEmptyString(req.body.contactPerson)){
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
        const customerId = customer.customerId
        req.body.fk_customerid = customerId
        const contact = await Contacts.create(req.body)
        res.status(201).send({ success: true, data: { message:'Contact Detail Created Successfully!'}})
    }catch(err){
        res.status(500).send({ success: false, error: { reason: 'Error Occurred while saving' }});
    }
}

exports.findAll = async (req, res) => {
    try {
        const customer  = await Customer.findOne({ where:{customerCode : req.params.id} })
        if(!customer){
            return res.status(400).send({success:false,error:{reason:'Invalid Customer!'}})
        }
      const customerId = customer.customerId
      const contacts = await Contacts.findAll({
        where: {
            fk_customerid:customerId
        }
      });
     res.send({ success: true, data: contacts })
    } catch (err) {
        res.status(500).send({ success: false, error: {reason:'Error Occurred while fetching'}})
    }
  
  }

// exports.update = async(req,res)=>{
//     const updates = Object.keys(req.body)
//     const updatesAllowed = ['contactPerson','contactNumber','email']
//     const isValidUpdate = updates.every((update) => updatesAllowed.includes(update))
//     if (!isValidUpdate) {
//         return res.status(400).send({ success: false, error: { reason: 'Invalid Update found' }});
//     }
//     try{
//         const contactNumber = req.params.contactNo
//         const contactDtls = await Contacts.findOne({where : { contactNumber }})
//         if(!contactDtls){
//             return res.status(400).send({success:false,error:{reason:'Contact Dtls Does not Exist!'}})
//         }
        
//         if(commonvalidation.checkEmptyString(req.body.contactPerson)){
//             return res.status(400).send({success:false,error:{reason:'Contact Person is required'}})
//         }else if(!commonvalidation.allowNameWithSpace(req.body.contactPerson)){
//             return res.status(400).send({success:false,error:{reason:'Invalid entry for Contact Person'}})
//         }else if(commonvalidation.checkEmptyString(req.body.contactNumber)){
//             return res.status(400).send({success:false,error:{reason:'Contact Number is required'}})
//         }else if(!commonvalidation.checkNumericValue(req.body.contactNumber)){
//             return res.status(400).send({success:false,error:{reason:'Invalid entry for Contact Number'}})
//         }else if(req.body.email && !commonvalidation.checkValiEmail(req.body.email)){
//             return res.status(400).send({success:false,error:{reason:'Invalid Email'}})
//         }
        
//         const contact = await Contacts.update(req.body,{
//             where:{
//                 contactNumber
//             }
//         })
//         if (contact == 0) {
//             return res.status(404).send({ success: false, error: { reason: `No Contact Detail updated `}});
//           }
//           res.send({ success: true, data: { message: `Contact Detail Updated successfully!`}});

//     }catch(err){
//         res.status(500).send({ success: false, error: {reason:'Error Occurred while fetching'}})
//     }
// }

