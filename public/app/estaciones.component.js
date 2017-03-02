// Registra el componente Estaciones, junto con su controller y template (view)
angular.
  module('ptfApp').
  component('estaciones', {
    //Nota: la url de éste template es relativa a index.html
    templateUrl: 'lista-estaciones.template.html',
    controller: ['Estacion', function EstacionesController(Estacion) {
        var self = this;
        self.estaciones = [];
        Estacion.obtenerTodos(function(estaciones) {
            self.estaciones = estaciones;
        });
    }]
});
