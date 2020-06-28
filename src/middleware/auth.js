const db = require("../models");
const UserRegister = db.userregistration;
const jwt   =   require('jsonwebtoken')

const auth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decode = jwt.verify(token,'thisisInventoryMSApp')
        next()
    }catch(err){
        res.status(401).send({error:'Please authenticate'})
    }

}

module.exports = auth