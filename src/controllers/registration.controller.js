const db = require("../models");
const User = db.user;
const requestValidator = require('../middleware/commonValidations');

exports.create = async(req, res) => {
  try{
   
    if(!await requestValidator.checkValidName(req.body.firstName)){
      return res.status(400).send({success:false,error:{reason:'Invalid First Name'}})
    }else if(req.body.lastName && !await requestValidator.checkValidName(req.body.lastName)){
      return res.status(400).send({success:false,error:{reason:'Invalid Last Name'}})
    }else if(!await requestValidator.checkValiEmail(req.body.email)){
      return res.status(400).send({success:false,error:{reason:'Invalid Email'}})
    }else if (!await requestValidator.checkPasswordLength(req.body.password)){
      return res.status(400).send({success:false,error:{reason:'Password Length must between 12-15 chars'}})
    }
   const user = await User.create(req.body);
    res.status(201).send({success:true,data:{message: `User Id ${req.body.email} created successfully`}});
}catch(err){
    res.status(500).send({success:false,error:{reason : 'Error Occurred while saving'}})
  }
}

exports.checkDuplicateEmail = async(req,res)=>{
  const email = req.body.email;
  try{
    const user = await User.findOne({where:{email}});
    if(user){
      return res.status(400).send({success:false,error:{reason:'Email Already Exists'}});
    }
    res.send()
   }catch(err){
    res.status(500).send({success:false,error:{reason:'Some Error Occurred'}});
  }
}