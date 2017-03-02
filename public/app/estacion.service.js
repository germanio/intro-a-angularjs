// Registra el servicio de estaciones, donde están los datos de prueba
angular.
    module('ptfApp').
    factory('Estacion', ['$http', function($http) {
        //para guardar la lista de estaciones una vez obtenida
        var cache = {
            estaciones : []
        }
        var service = {
            //para pedir todas las estaciones al servidor
            obtenerTodos : function(callback) {
                return $http({ url: '../data/estaciones.json', method: 'GET' }).then(function(response) {
                    cache.estaciones = response.data;
                    callback(cache.estaciones);
                })
            },
            //para filtrar una estación de la lista guardada, según su ID
            obtenerUno : function(id, callback) {
                var estacion = cache.estaciones.find(function(estacion) {
                    return estacion.EstacionId === id
                });

                callback(estacion);
            }
        };
        return service;
    }]);
