angular.module ('app')
  .config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push(['$q', '$location', '$log', function($q, $location, $log) {
      return {
        request: function (config) {
          // $log.info(config);
          return config || $q.when(config);
        },

        response: function (response) {
          // $log.info(response);
          return response || $q.when(response);
        },

        responseError: function (rejection) {
          $log.error('Failed with', rejection.status, 'status');
          return $q.reject(rejection);
        }
      };
    }]);
  });
