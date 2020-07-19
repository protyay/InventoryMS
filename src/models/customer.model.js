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
        allowNull:false
     },
      contactNumber: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
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