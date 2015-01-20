(function () {

  var app = angular.module('fracher', [
    'ngRoute'

  ]);

  app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/acerca', {
        templateUrl : 'views/acerca.html'
      })
      .when('/servicios', {
        templateUrl : 'views/servicios.html',
        controller 	: 'servicesController'
      })
      .when('/contacto', {
        templateUrl : 'views/contacto.html',
      })
      .when('/proyectos', {
        templateUrl: 'views/proyectos.html',
        controller: 'projectController'
      })
      .when('/terminos', {
        templateUrl: 'views/terminos.html'
      })
      .when('/legal', {
        templateUrl: 'views/legal.html'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

})();
