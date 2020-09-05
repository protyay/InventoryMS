module.exports = (sequelize, Sequelize) => {
    const Contacts = sequelize.define("customer_contacts", {
      contactPerson: {
        type: Sequelize.STRING,
        allowNull:false
      },
      contactNumber: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      email: {
        type: Sequelize.STRING
      }
      
    });
  
    return Contacts;
  };