angular.
  module('ptfApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/estaciones', {
          template: '<estaciones></estaciones>'
        }).
        when('/estaciones/:id', {
          template: '<detalle-estacion></detalle-estacion>'
        }).
        otherwise('/estaciones');
    }
  ]);
