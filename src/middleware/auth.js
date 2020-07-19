const jwt   =   require('jsonwebtoken')
const auth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        next()
    }catch(err){
        res.status(401).send({success:false,data:{reason:'Please authenticate'}})
    }

}

module.exports = auth
