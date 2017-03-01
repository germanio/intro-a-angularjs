angular.
  module('ptfApp').
  component('detalleEstacion', {
    templateUrl: 'detalle-estacion.template.html',
    controller: ['$routeParams', 'Estacion',
      function detalleEstacionController($routeParams, Estacion) {
        this.id = $routeParams.id;
        this.estacion = Estacion.get(this.id);
      }
    ]
  });
