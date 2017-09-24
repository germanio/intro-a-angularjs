angular.
  module('ptfApp').
  filter('porProximidad', function() {
    
    function radianes_a_metros(coordenadas){
        const RAD = 0.000008998719243599958;
        //calculamos la distancia al centro usando pitágoras
        return Math.round(Math.sqrt(Math.pow(coordenadas.latitud, 2) + Math.pow(coordenadas.longitud, 2)) / RAD);
    }
    
    return function(estaciones) {
        var estacionesFiltradas = [];
        
        //coordenadas a Plaza Houssay, sacadas de Google Maps
        var centro_coords = {
            latitud: -34.5989141,
            longitud: -58.3999595
        };
        
        //distancia máxima en metros
        var distanciaMaxima = 1000;
        
        //recorremos las estaciones para ver cual se queda y cual se va
        angular.forEach(estaciones, function(estacion) {
            //obtenemos el valor de latitud y longitud:
            var estacion_coords = {
                latitud: parseFloat(estacion.Latitud),
                longitud: parseFloat(estacion.Longitud)
            };
            
            var distancia = radianes_a_metros({
                latitud: centro_coords.latitud - estacion_coords.latitud,
                longitud: centro_coords.longitud - estacion_coords.longitud
            });
            
            //éste valor debe ser menor que el cuadrado de la distancia máxima
            if (distanciaMaxima > distancia) {
                estacionesFiltradas.push(estacion);
                
                //guardamos la distancia entre el centro y la estación para poder ordenar por proximidad
                estacion.distancia = distancia;
            }
        });
        //ahora si, antes de devolver las estaciones filtradas, tenemos que ordenarlas por proximidad
        return estacionesFiltradas.sort(function(e1, e2) {
            return e1.distancia - e2.distancia;
        });
    };
  });