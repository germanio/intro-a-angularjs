// Registra el servicio de estaciones, donde están los datos de prueba
angular.
    module('ptfApp').
    factory('Estacion', function() {
        return {
            estaciones: [{
                id: '1',
                nombre: 'Facultad de Derecho',
                ubicacion: 'Figueroa Alcorta y Pueyrredón',
                bicicletas_disponibles: 9,
                anclajes_disponibles: 19
            }, {
                id: '2',
                nombre: 'Retiro',
                ubicacion: 'Libertador altura Retiro',
                bicicletas_disponibles: 15,
                anclajes_disponibles: 20
            }]
        };
    });
