angular.module('app')
  .factory('valuesService', function(RESTful,$q) {
    return {
      holdings: function(){
         var deferred = $q.defer();

         RESTful.get('holding/list')
         .then(function(response){
            deferred.resolve(response);
         },function(err){
            console.log(err);
            alert("Server Error\nTry Again later");
            deferred.reject(err);
         });

         return deferred.promise;
      },
      profiles: function(){
         var deferred = $q.defer();

         RESTful.get('profile/list')
         .then(function(response){
            deferred.resolve(response);
         },function(err){
            console.log(err);
            alert("Server Error\nTry Again later");
            deferred.reject(err);
         });

         return deferred.promise;
      }
    };
  });
