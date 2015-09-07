angular.module('app')
  .factory('usersService', function(RESTful,$q) {
    return {
      create: function(user){

         var deferred = $q.defer();
         RESTful.post('users',user)
         .then(function(response){
            deferred.resolve(response);
         },function(err){
            console.log(err);
            deferred.reject(err);
         });
         return deferred.promise;

      },
      login: function(credentials){

         var deferred = $q.defer();
         RESTful.post('users/login',credentials)
         .then(function(response){
            deferred.resolve(response);
         },function(err){
            console.log(err);
            deferred.reject(err);
         });
         return deferred.promise;

      },

      logout: function(){

         var deferred = $q.defer();
         RESTful.post('users/logout')
         .then(function(response){
            deferred.resolve(response);
         },function(err){
            console.log(err);
            deferred.reject(err);
         });
         return deferred.promise;

      },

      list: function(){

         var deferred = $q.defer();
         RESTful.get('users/list')
         .then(function(response){
            deferred.resolve(response);
         },function(err){
            console.log(err);
            deferred.reject(err);
         });
         return deferred.promise;

      },

      update: function(payload){

         var deferred = $q.defer();
         RESTful.put('users',payload)
         .then(function(response){
            deferred.resolve(response);
         },function(err){
            console.log(err);
            deferred.reject(err);
         });
         return deferred.promise;

      },

      delete: function(id){

         var deferred = $q.defer();
         RESTful.delete('users/'+id)
         .then(function(response){
            deferred.resolve(response);
         },function(err){
            console.log(err);
            deferred.reject(err);
         });
         return deferred.promise;

      },

      session: function(){

         var deferred = $q.defer();
         RESTful.get('users/session')
         .then(function(response){
            deferred.resolve(response);
         },function(err){
            console.log(err);
            deferred.reject(err);
         });
         return deferred.promise;

      }



    };
  });
