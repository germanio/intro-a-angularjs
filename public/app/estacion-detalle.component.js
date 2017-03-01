angular.
  module('ptfApp').
  component('detalleEstacion', {
    template: '<span>{{$ctrl.id}}</span>',
    controller: ['$routeParams',
      function detalleEstacionController($routeParams) {
        this.id = $routeParams.id;
      }
    ]
  });
