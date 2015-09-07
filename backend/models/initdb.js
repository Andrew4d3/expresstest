var config = require('../config');
var Sequelize = require('sequelize');

module.exports = new Sequelize(config.dbconnection.database,config.dbconnection.username,config.dbconnection.password, {
   host: config.dbconnection.host,
   dialect: config.dbconnection.dialect,
   logging: false,
   dialectOptions: {
    multipleStatements: true
  }
});
