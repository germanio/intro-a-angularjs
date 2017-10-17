angular.
  module('ptfApp').
  filter('favoritos', function() {
    return function(estaciones, activado) {
        //si no está activado, devolver toda la lista
        if (!activado) return estaciones;
        
        var estacionesFiltradas = [];
        
        //recorremos las estaciones para ver cual se queda y cual se va
        angular.forEach(estaciones, function(estacion) {
            if (estacion.favorita) {
                estacionesFiltradas.push(estacion);
            }
        });
        return estacionesFiltradas;
    };
  });