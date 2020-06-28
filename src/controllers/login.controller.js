const db = require("../models");
const UserRegister = db.userregistration;
const jwt   =   require('jsonwebtoken')

exports.findOne = async(req,res) =>{
    try{
        const email = req.body.email
        const password = req.body.password
        const user = await UserRegister.findOne({where:{email}})
        if(!user){
            res.status(401).send({msg:'unable to login'})
        }else if (!await user.validPassword(password)) {
            res.status(401).send({msg : 'unable to login'})
        }else{
            const token = await user.generateAuthToken()
            res.send({user,token})
        }
    }catch(err){
        res.status(500).send(err)
    }
}

exports.logoutUser = async(req,res)=>{
    try{
       res.send({message: 'Logged Out Successfully',token:''})
    }catch(err){
        res.status(500).send(err)
    }

    
}

