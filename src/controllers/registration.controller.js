const db = require("../models/dbIndex");
const UserRegister = db.userregistration;

exports.create = (req, res) => {
    
    UserRegister.create(req.body).then(user =>{
        res.status(201).send(user)
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
    
}

exports.findAll = (req,res)=>{
  db.sequelize.query('SELECT * FROM registerusers',{ model: UserRegister }).then(user =>{
   res.send(user)
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  });
}
