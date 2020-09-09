const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port:dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.customer = require("./customer.model.js")(sequelize, Sequelize);
db.contacts = require("./contacts.model.js")(sequelize, Sequelize);
<<<<<<< HEAD
db.stateMst = require("./statemst.model.js")(sequelize, Sequelize);
=======
db.stateMst = require("./statemaster.model.js")(sequelize, Sequelize);
>>>>>>> 46541ce533daa30e8e36e58d85ce4333f2038dc4

db.customer.hasMany(db.contacts, {foreignKey: 'fk_customerid', sourceKey: 'customerId'});
db.contacts.belongsTo(db.customer, {foreignKey: 'fk_customerid', targetKey: 'customerId'});

module.exports = db;