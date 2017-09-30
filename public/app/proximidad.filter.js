angular.
  module('ptfApp').
  filter('porProximidad', function() {
    
    //`coordenadas` es un objeto que tiene latitud y longitud como atributos, con valores en radianes
    function calcular_distancia(coordenadas){
        //calculamos la distancia al centro usando pitágoras
        return Math.sqrt(Math.pow(coordenadas.latitud, 2) + Math.pow(coordenadas.longitud, 2));
    }
    
    function radianes_a_metros(radian){
        const RAD = 0.000008998719243599958;
        return Math.round(radian / RAD);
    }
    
    return function(estaciones, activarFiltro, centro_coords, distanciaMaxima) {
        var estacionesFiltradas = [];
        
        if ( !activarFiltro ){
            return estaciones;
        }
        
        if ( centro_coords.latitud == undefined || centro_coords.longitud == undefined ){
            return estaciones;
        }
        
        //recorremos las estaciones para ver cual se queda y cual se va
        angular.forEach(estaciones, function(estacion) {
            //obtenemos el valor de latitud y longitud:
            var estacion_coords = {
                latitud: parseFloat(estacion.Latitud),
                longitud: parseFloat(estacion.Longitud)
            };
            
            //armamos un objeto donde la latitud y longitud son la diferencia entre el centro y la estación
            var distancia = calcular_distancia({
                latitud: radianes_a_metros(centro_coords.latitud) - radianes_a_metros(estacion_coords.latitud),
                longitud: radianes_a_metros(centro_coords.longitud) - radianes_a_metros(estacion_coords.longitud)
            });
            
            //éste valor debe ser menor que la distancia máxima
            if (distancia < distanciaMaxima) {
                estacionesFiltradas.push(estacion);
                
                //guardamos la distancia para poder ordenar por proximidad
                estacion.distancia = distancia;
            }
        });
        //ahora si, antes de devolver las estaciones filtradas, tenemos que ordenarlas por proximidad
        return estacionesFiltradas.sort(function(e1, e2) {
            return e1.distancia - e2.distancia;
        });
    };
  });