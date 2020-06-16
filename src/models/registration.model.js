const bcrypt = require('bcryptjs');
module.exports = (sequelize, Sequelize) => {
    const UserRegistration = sequelize.define("registeruser", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
      firstName: {
        type: Sequelize.STRING,
        allowNull:false,
        validate: {
          isAlpha: true
        }
      },
      lastName: {
        type: Sequelize.STRING,
        validate: {
          isAlpha: true,
        }
     },
     email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
        validate:{
          isEmail: true
        }
      },
      password:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          min: 8
        }
      },
    }, {
      hooks : {
          beforeCreate : (UserRegistration , options) => {
              {
                UserRegistration.password = UserRegistration.password && UserRegistration.password != "" ? bcrypt.hashSync(UserRegistration.password, 10) : "";
              }
          }
      }
    });
  
    return UserRegistration;
  };