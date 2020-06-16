module.exports = {
    DB: 'imsdev',
    USER: 'root',
    PASSWORD: 'ImsDev@11',
    HOST: 'localhost',
    PORT:'8080',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };