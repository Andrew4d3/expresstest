angular.module('app')
  .run(function($rootScope, $http, $log, $window) {
    // Checking internet connection
    $rootScope.online = navigator.onLine;
    $window.addEventListener('offline', function () {
      $rootScope.$apply(function() {
        $rootScope.online = false;
      });
    }, false);

    $window.addEventListener('online', function () {
      $rootScope.$apply(function() {
        $rootScope.online = true;
      });
    }, false);
  });
