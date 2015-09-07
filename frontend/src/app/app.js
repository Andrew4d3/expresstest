// Angular APP
angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'oitozero.ngSweetAlert',
  'ngAnimate',
  'toastr',
  'xeditable'
]);

// _.str becomes a global variable if no module loading is detected
// Mix in non-conflict functions to Underscore namespace
_.mixin(_.str.exports());
