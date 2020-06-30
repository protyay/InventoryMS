const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    DB: 'imsdev',
    USER: process.env.DB_USER_NAME,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };