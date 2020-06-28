module.exports = (sequelize, Sequelize) => {
    const Visit = sequelize.define("visit", {
      visitDate: {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.NOW
      },
      visitor: {
        type: Sequelize.STRING,
        allowNull:false
      },
      visitCost: {
        type: Sequelize.DECIMAL(10,2)
      },
      
    });
  
    return Visit;
  };