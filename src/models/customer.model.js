module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
      customerId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      customerCode: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      address: {
        type: Sequelize.TEXT
      },
      contactPerson: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          is:/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/
        }
      },
      contactNumber: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          isNumeric: true
        }
      },
      email: {
        type: Sequelize.STRING,
        validate:{
          isEmail: true
        }
      },
      gstin: {
        type: Sequelize.STRING
      },
      customerStatus:{
         type: Sequelize.BOOLEAN,
         defaultValue:true
      }
    });
  
    return Customer;
  };