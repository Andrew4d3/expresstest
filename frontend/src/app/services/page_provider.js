angular.module('app')
  .provider('PageService', function() {
    var _baseTitle = null;

    return {
      // Provider API
      setBaseTitle: function(title) {
        _baseTitle = title;
      },
      // Services API
      $get: ['$rootScope', '$state', function($rootScope, $state) {
        return {
          get: function() {
            if ($state.is($state.current.name)) {
              // globals setting for the current page
              $rootScope.gPage = {
                pageTitle : (_baseTitle ? _baseTitle + ' | ' : '') + $state.current.title,
                title     : $state.current.title,
                alias     : $state.current.alias,
                fullWidth : $state.current.fullWidth || false,
              };
            }
          },
        };
      }],
    };
  });
