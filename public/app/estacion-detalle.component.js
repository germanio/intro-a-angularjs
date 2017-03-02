angular.
  module('ptfApp').
  component('detalleEstacion', {
    templateUrl: 'detalle-estacion.template.html',
    controller: ['$routeParams', 'Estacion',
        function detalleEstacionController($routeParams, Estacion) {
            self = this;
            self.id = $routeParams.id;
            self.estacion = null;
            Estacion.obtenerUno(self.id, function(estacion) {
                self.estacion = estacion;
            });
        }
    ]
  });
