angular.module('app')
.controller('LoginController', function($scope,$location,valuesService,usersService,SweetAlert) {

   valuesService.holdings()
   .then(function(holdings){
      $scope.holdings = holdings;
   });

   valuesService.profiles()
   .then(function(profiles){
      $scope.profiles = profiles;
   });

   $scope.create_user = function(){

      var errors="";

      if(!validator.isEmail($scope.register.email)){
         errors+="- Debe ingresar un correo electronico valido.\n";
      }

      if(!validator.isLength($scope.register.name,1,45)){
         errors+="- Nombre debe contar entre 1 y 45 caracteres.\n";
      }

      if(!validator.isLength($scope.register.last_name,1,45)){
         errors+="- Apellido debe contar entre 1 y 45 caracteres.\n";
      }

      if(!validator.isLength($scope.register.password,1,45)){
         errors+="- Contraseña debe contar entre 1 y 45 caracteres.\n";
      }

      if(!($scope.register.password == $scope.register.repassword)){
         errors+="- Las contraseñas ingresadas no coinciden.\n";
      }

      if(errors){
         SweetAlert.swal("Errores",errors);
         return;
      }

      usersService.create($scope.register)
      .then(function(response){
         SweetAlert.swal("Todo Bien","Has sido registrado en el sistema");
         usersService.login({email:$scope.register.email,password:$scope.register.password})
         .then(function(response){
            if(response.msg=="authorized"){
               $location.path("/dashboard");
            }
         });

      },function(err){
         if(err.fields.email){
            SweetAlert.swal("Error","Ya existe este correo electronico registrado");
         }
      });
   };

   $scope.login = function(){

      usersService.login($scope.credentials)
      .then(function(response){
         if(response.msg=="authorized"){
            $location.path("/dashboard");
         }
         else if(response.msg=="not_exist"){
            SweetAlert.swal("Error","Este correo electronico no se encuentra registrdo");
         }
         else if(response.msg=="password_incorrect"){
            SweetAlert.swal("Error","Contraseña Incorrecta");
         }

      },function(err){
         alert("Server Error");
      });

   }

});
