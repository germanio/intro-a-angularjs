angular.
  module('ptfApp').
  filter('porEstacion', function() {
    return function(estaciones, consulta) {
        //si no hay ninguna consulta, devolver toda la lista
        if (!consulta) return estaciones;
        
        var estacionesFiltradas = [];
        
        //recorremos las estaciones para ver cual se queda y cual se va
        angular.forEach(estaciones, function(estacion) {
            //obtenemos el valor de cada atributo, o un string vacío, para evitar problemas
            var nombre = estacion.EstacionNombre || '';
            var direccion = estacion.Lugar || '';
            
            //si el valor de la consulta existe dentro del atributo, va a ser `true`
            var nombreValido = nombre.indexOf(consulta) != -1;
            var direccionValida = direccion.indexOf(consulta) != -1;

            //si el nombre o la direccion contienen a la consulta, entonces agrego la estación
            if (nombreValido || direccionValida) {
                estacionesFiltradas.push(estacion);
            }
        });
        return estacionesFiltradas;
    };
  });