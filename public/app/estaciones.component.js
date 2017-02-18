// Registra el componente Estaciones, junto con su controller y template (view)
angular.
  module('ptfApp').
  component('estaciones', {
    template:
        '<ul>' +
            '<li ng-repeat="estacion in $ctrl.estaciones">' +
                '<span>ID: {{estacion.id}}</span>' +
                '<p>Nombre: {{estacion.nombre}}</p>' +
                '<p>Ubicación: {{estacion.ubicacion}}</p>' +
                '<p>Bicicletas disponibles: {{estacion.bicicletas_disponibles}}</p>' +
                '<p>Anclajes disponibles: {{estacion.anclajes_disponibles}}</p>' +
            '</li>' +
        '</ul>',
    controller: function EstacionesController() {
        this.estaciones = [{
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
    }
});
