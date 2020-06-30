//const path = require('path')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// const publicDirectoryPath   =  path.join(__dirname,'/public')
// const viewsPath             =  path.join(__dirname,'/public/views')

// app.set('view engine','hbs')
// app.set('views',viewsPath)

//Set up Static Views Location
//app.use(express.static(publicDirectoryPath))


const db = require("./src/models");
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// route

const login = require('./src/routes/login.routes')
const register = require('./src/routes/registration.routes')
const customer =require("./src/routes/customer.routes") 
//const viewRouters = require("./src/routes/view.routes") 

app.use('/api',login)
app.use('/api',register)
app.use('/api',customer)

//app.use(viewRouters)

// app.get('/customer',(req,res)=>{
//   res.render('customerrecords')
// })
  

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});