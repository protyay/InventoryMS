module.exports = (sequelize, Sequelize) => {
    const StateMst = sequelize.define("state_master", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false
      },
      stateCode: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      stateName: {
        type: Sequelize.STRING,
        allowNull:false
      }
      
    });
  
    return StateMst;
  };