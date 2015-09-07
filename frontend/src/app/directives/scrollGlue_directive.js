angular.module('app')
  .directive('scrollGlue', function() {
    return {
      priority: 1,
      require: ['?ngModel'],
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        function fakeNgModel(initValue) {
          return {
            $setViewValue: function(value) {
              this.$viewValue = value;
            },
            $viewValue: initValue
          };
        }

        var el = element[0],
            ngModel = controller[0] || fakeNgModel(true),
            isScrollHorizontal = attrs.glueHorizontal || false;

        function scrollToBottom() {
          el.scrollTop = el.scrollHeight;
        }

        function scrollToRight() {
          el.scrollLeft = el.scrollWidth;
        }

        function shouldActivateAutoScroll(){
          // + 1 catches off by one errors in chrome
          if (isScrollHorizontal)
            return (el.scrollLeft + el.clientWidth + 1) >= el.scrollWidth;
          else
            return (el.scrollTop + el.clientHeight + 1) >= el.scrollHeight;
        }

        scope.$watch(function() {
          if (ngModel.$viewValue) {
            if (isScrollHorizontal)
              scrollToRight();
            else
              scrollToBottom();
          }
        });

        element.bind('scroll', function() {
          var activate = shouldActivateAutoScroll();
          if (activate !== ngModel.$viewValue){
            scope.$apply(ngModel.$setViewValue.bind(ngModel, activate));
          }
        });
      }
    };
  });
