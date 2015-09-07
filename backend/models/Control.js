var sequelize = require('./initdb');
var Sequelize = require('sequelize');

module.exports = sequelize.define('control', {
  name: {
    type: Sequelize.STRING,
  },
}, {
  freezeTableName: false // Model tableName will be the same as the model name
});
