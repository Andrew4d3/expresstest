angular.module('app')

  // [1, 2, 3, 4]
  // => [4, 3, 2, 1]
  .filter('reverseArray', function() {
    return function(items) { return items.slice().reverse(); };
  })

  // [1, 2, 3, 1, 1]
  // => [1, 2, 3]
  .filter('unique', function() {
    return function(collection, keyname) {
      var output = [],
      keys = [];

      angular.forEach(collection, function(item) {
        var key = item;
        if (keyname)
          key = item[keyname];

        if (keys.indexOf(key) === -1) {
          keys.push(key);
          if (key || (angular.isNumber(key) && key === 0))
            output.push(item);
        }
      });
      return output;
    };
  });

