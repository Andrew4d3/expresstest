angular.module ('app')
.config(function($stateProvider, $urlRouterProvider) {
   $stateProvider
   .state('login', {
      url: '/',
      controller: 'LoginController',
      templateUrl: 'app/views/login/login.tpl.html',
      title: 'Login',
      data: {
         restrict_access: "only_nouser"
      }
   })
   .state('dashboard', {
      url: '/dashboard',
      controller: 'DashboardController',
      templateUrl: 'app/views/dashboard/dashboard.tpl.html',
      title: 'Dashboard',
      data: {
         restrict_access: "only_user"
      }
   });

   $urlRouterProvider.otherwise('/');
});
