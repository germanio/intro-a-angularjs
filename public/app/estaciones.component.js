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
    controller: ['Estacion', function EstacionesController(Estacion) {
        this.estaciones = Estacion.estaciones;
    }]
});
