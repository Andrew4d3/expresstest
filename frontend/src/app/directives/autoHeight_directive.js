angular.module('app')
  .directive('autoHeight', function($window) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var autoHeight = attrs.autoHeight && scope.$eval(attrs.autoHeight) || 0;
        var autoHeightFixed = attrs.autoHeightFixed && scope.$eval(attrs.autoHeightFixed) || false;

        if (_.isString(autoHeight))
          autoHeight = 0;

        var setHeight = function() {
          var newHeight = Math.abs($window.innerHeight - autoHeight);
          element.css('max-height', newHeight);
          if (autoHeightFixed) {
            element.css('min-height', newHeight);
          }
        };

        angular.element($window).bind('resize', function() {
          setHeight();
        });

        angular.element(document).ready(function() {
          setHeight();
        });
      }
    };
  });
