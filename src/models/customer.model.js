module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
      customerId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      customerCode: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      state:{
        type: Sequelize.STRING,
        allowNull:false
      },
      officeAddress: {
        type: Sequelize.TEXT
      },
      factoryAddress: {
        type: Sequelize.TEXT
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