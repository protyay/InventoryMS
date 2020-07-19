const bcrypt = require('bcryptjs');
const jwt   =   require('jsonwebtoken')
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
     firstName: {
        type: Sequelize.STRING,
        allowNull:false
     },
     lastName: {
        type: Sequelize.STRING,
     },
     email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
     password:{
        type: Sequelize.STRING,
        allowNull:false
    },
    },{
      hooks : {
          beforeCreate : (User  ) => {
              {
                User.password = User.password && User.password != "" ? bcrypt.hashSync(User.password, 8) : "";
              }
          }
      }
    });
  
   User.prototype.toJSON = function(){

    const userObject = Object.assign({},this.get())
    delete userObject.password

    return userObject
          
   }

    User.prototype.validPassword = async function(password) {
      return await bcrypt.compare(password, this.password)
  }

  User.prototype.generateAuthToken = function(){
    const user = this
    const token = jwt.sign({id:user.id.toString()},process.env.JWT_SECRET,{expiresIn: 3600})
    return token
  }

    return User;
  };