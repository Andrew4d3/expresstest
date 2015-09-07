var sequelize = require('./initdb');
var Sequelize = require('sequelize');
var User = require('./User')

var Holding = sequelize.define('holding', {
   name: {
      type: Sequelize.STRING(45)
   }
},
   {
      freezeTableName: true // Model tableName will be the same as the model name
   }
);


Holding.hasMany(User,{ foreignKey: { name:"holding_id", allowNull: false}, onDelete: 'CASCADE' });

module.exports = Holding;
