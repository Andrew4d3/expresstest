var sequelize = require('./initdb');
var Sequelize = require('sequelize');
var Holding = require('./Holding');
//var Profile = require('./Profile');

var User = sequelize.define('user', {
   email: {
      type: Sequelize.STRING(45),
      unique: true,
      allowNull: false,
      validate: {
         isEmail: true
      }
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false
   },
   name: {
      type: Sequelize.STRING(45),
      allowNull: false
   },
   last_name: {
      type: Sequelize.STRING(45),
      allowNull: false
   }
},
{
   freezeTableName: true // Model tableName will be the same as the model name*/
}
);


//
//User.belongsTo(Profile, {foreignKey : 'profile_id', as: 'Profile'});

module.exports = User;
