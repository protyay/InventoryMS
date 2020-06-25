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

db.userregistration = require("./registration.model.js")(sequelize, Sequelize);
db.customer = require("./customer.model.js")(sequelize, Sequelize);
db.visits = require("./custvisit.model.js")(sequelize, Sequelize);

db.customer.hasMany(db.visits, {foreignKey: 'fk_customerid', sourceKey: 'customerId'});
db.visits.belongsTo(db.customer, {foreignKey: 'fk_customerid', targetKey: 'customerId'});

module.exports = db;