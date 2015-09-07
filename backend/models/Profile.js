var sequelize = require('./initdb');
var Sequelize = require('sequelize');
var User = require('./User')

var Profile = sequelize.define('profile', {
   name: {
      type: Sequelize.STRING(45)
   }
},
{
   freezeTableName: true // Model tableName will be the same as the model name
}
);

Profile.hasMany(User,{ foreignKey: { name:"profile_id", allowNull: false}, onDelete: 'CASCADE' });

module.exports = Profile;
