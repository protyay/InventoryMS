module.exports = {
    DB: 'inventorymsdev',
    USER: 'imsdev',
    PASSWORD: 'InventoryMS@11',
    HOST: 'db4free.net',
    PORT:'3306',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };