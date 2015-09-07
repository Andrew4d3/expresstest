angular.module('app')
.controller('DashboardController', function($scope,$location,$filter,usersService,SweetAlert,valuesService) {

   $scope.all_users = [];
   $scope.holdings = [];
   $scope.profiles = [];

   valuesService.holdings()
   .then(function(holdings){
      $scope.holdings = holdings;
   });

   valuesService.profiles()
   .then(function(profiles){
      $scope.profiles = profiles;
   });

   $scope.showName = function(id,dataset) {

      var found = false;
      dataset.forEach(function(item,i){
         if(item.id==id){
            found = true;
            index = i;
         }
      });
      return found ? dataset[index].name : "Empty";

   };

   var loadUsers = function(){
      usersService.list()
      .then(function(users){
         console.log(users);
         $scope.all_users = users;
      });
   }

   loadUsers();

   $scope.logout = function(){
      usersService.logout()
      .then(function(){
         $location.path("/");
      });
   };

   $scope.delete = function(id){

      SweetAlert.swal({
         title: "Confirmacion",
         text: "¿Esta seguro de querer borrar este usuario?",
         showCancelButton: true,
         cancelButtonText: "Cancelar",
         closeOnConfirm: false,
         closeOnCancel: true },
         function(isConfirm){
            if (isConfirm) {
               usersService.delete(id)
               .then(function(response){
                  if(response.error){
                     SweetAlert.swal("Error","No puede borrar este usuario\nSe encuentra en sesion con el.");
                  }
                  else{
                     SweetAlert.swal("Todo Bien","Usuario eliminado exitosamente");
                     loadUsers();
                  }
               });

            }
         });


   };

});
