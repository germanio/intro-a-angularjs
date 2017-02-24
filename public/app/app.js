// Definimos el módulo para la aplicación
var ptfApp = angular.module('ptfApp', []);

// Definimos el controlador `ListaEstacionesController` en el módulo `ptfApp`
ptfApp.controller('ListaEstacionesController', function ListaEstacionesController($scope) {
    $scope.estaciones = [{
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
    }];
});
