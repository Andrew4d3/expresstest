angular.module('app')

  // 3.5
  // => 3 1/2
  // 1.3333
  // => 1 1/3
  .filter('fraction', function() {
    return function(value) {
      return Ratio.parse(value, true)
              .simplify()
              .toQuantityOf(2, 3, 4, 5, 8, 16, 32, 40)
              .toLocaleString();
    };
  });


