var sequelize = require('./models/initdb');
var Control = require('./models/Control');
var Holding = require('./models/Holding');
var Profile = require('./models/Profile');
var User = require('./models/User');



module.exports = {

   run:  function(){

      sequelize.sync()
      .then(function(responses){

         User.belongsTo(Holding,{ foreignKey: "holding_id"} );
         User.belongsTo(Profile,{ foreignKey: "profile_id"} );

         Control.find({
            where: {name: "initial_data_done"}
         })
         .then(function(found){
            if(!found){

               var actions = [
                  "insert into holding(name) values('LAN'),('TAM'),('Agence');",
                  "insert into profile(name) values('Admin'),('Supervisor'),('Focal Point'),('Read Only');"
               ];

               sequelize.query(actions[0]+actions[1]).then(function() {

                 Control.create({name:"initial_data_done"})
                 .then(function(){
                    console.log("Initial data created successfully...");
                 })
               });
            }
         })
         .catch(function(err){
            console.log(err);
         })

      }).catch(function(err){
         console.log(err);
      })
   }

}
