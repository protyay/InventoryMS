const db = require("../models");
const UserRegister = db.userregistration;

exports.create = async(req, res) => {
  try{
    const user = await UserRegister.create(req.body);
    res.status(201).send(user);
   }catch(err){
    res.status(500).send(err);
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
