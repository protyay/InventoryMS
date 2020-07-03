const db = require("../models");
const Customer = db.customer;
const Visit = db.visits;
const Op = db.Sequelize.Op;

exports.create = async(req, res) => {
  try{
    const customer = await Customer.create(req.body)
    res.status(201).send({success : true,data:{customerCode: customer.customerCode}});
  }catch(err){
    res.status(500).send({success:false,error :{errorReason: "Error Occurred while saving"}});
  }
}

exports.findAll = async(req,res)=>{
  try{
    const customers = await Customer.findAll({
      where :{
        customerStatus : true
      }
    });
    res.send({success:true,data:customers})
  }catch(err){
    res.status(500).send({success:false,data: err})
  }

}

exports.findOne = async(req, res) => {
  try{
    const customerCode = req.params.id
    const customer = await Customer.findOne({where:{customerCode}})
    if(!customer){
      return res.status(404).send({success:false,data:{}})
    } 
   res.send({success:true,data:customer})
}catch(err){
    res.status(500).send({success:false,data:err})
  }
}

exports.update = async(req, res) => {
  
  const updates = Object.keys(req.body)
    const updatesAllowed = ['customerName','address','contactPerson','contactNumber','email','gstin']
    const isValidUpdate = updates.every((update)=> updatesAllowed.includes(update))
    if(!isValidUpdate){
       return res.status(400).send({success:false,data:{}})
    }
  
  try{
     const customer = await Customer.update(req.body, {
      where: {
        customerId: req.params.id
      }
    })
    if(customer == 0){
        return res.status(404).send({success:false,data : {}})
      } 
   res.send({success:true,data : {}}) 
  }catch(err){
    res.status(500).send({success:false,data : err})
  }
}
