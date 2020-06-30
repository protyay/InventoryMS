const db = require("../models");
const User = db.user;

exports.create = async(req, res) => {
  try{
    const user = await User.create(req.body)
    res.status(201).send({success:true,data:user.email})
   }catch(err){
    res.status(500).send({success:false,data:err})
  }
}

// exports.findAll = (req,res)=>{
//   db.sequelize.query('SELECT * FROM registerusers',{ model: UserRegister }).then(user =>{
//    res.send(user)
//   }).catch(err => {
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while creating the User."
//     });
//   });
// }
