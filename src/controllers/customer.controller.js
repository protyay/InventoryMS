const db = require("../models");
const Customer = db.customer;
const Visit = db.visits;
const Op = db.Sequelize.Op;


exports.create = async(req, res) => {
  try{
    const customer = await Customer.create(req.body);
    res.status(201).send(customer)
  }catch(err){
    res.status(400).send(err)
  }
}

exports.findAll = async(req,res)=>{
  try{
    const customers = await Customer.findAll({
      where :{
        customerStatus : true
      }
    });
    res.send(customers)
  }catch(err){
    res.status(500).send(err)
  }

}

exports.findOne = async(req, res) => {
  try{
    const customer  = await Customer.findByPk(req.params.id)
    if(!customer){
      return res.status(404).send('Customer not found')
    } 
    res.send(customer)

  }catch(err){
    res.status(500).send(err)
  }
}

exports.update = async(req, res) => {
  try{
     const customer = await Customer.update(req.body, {
      where: {
        customerId: req.params.id
      }
    })
    if(customer == 0){
        return res.status(404).send('Customer not found')
      } 
   res.send("customer updated successfully") 
  }catch(err){
    res.status(500).send(err)
  }
}


// exports.init = (req, res) => {  
  
//   //   Validate request
// if (!req.body.customerName) {
//   res.status(400).send({
//     message: "Content can not be empty!"
//   });
//   return;
// }

// Customer.build(req.body, {
//   include: [ Visit ]
// }).save()
// .then(customer => {
//   res.send('Customer ID '+customer.customerId+' Created Successfully');
// }).catch(err => {
//        res.status(500).send({
//          message:
//            err.message || "Some error occurred while creating the Customer."
//        });
//      });
// };



// Find a single Customer with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;
//     Customer.findByPk(id)
//         .then(data => {
//         res.send(data);
//         })
//         .catch(err => {
//         res.status(500).send({
//             message: "Error retrieving Customer with id=" + id
//         });
//         });
// };

// // Update a Customer by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id;
 
//   Customer.update(req.body,{
//     where: { customerId: id }
//    }).then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Customer was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Customer with id=" + id
//       });
//     });
// };



// // Retrieve all Customers from the database with visits.
// exports.findAll = (req, res) => {
//   Customer.findAll({
//     attributes: [['customerId', 'customerId'], 'customerName', 'address'],
//     include: [{
//       model: Visit,
//       where: { fk_customerid: db.Sequelize.col('customer.customerId')},
//       attributes: ['visitDate', 'visitor']
//     }]
//   }).then(customers => {
//      res.send(customers);
//   }).catch(err => {
//          res.status(500).send({
//            message:
//              err.message || "Some error occurred while fetching customers."
//          });
//        });
// };