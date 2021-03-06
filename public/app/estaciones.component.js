// Registra el componente Estaciones, junto con su controller y template (view)
angular.
  module('ptfApp').
  component('estaciones', {
    //Nota: la url de éste template es relativa a index.html
    templateUrl: 'lista-estaciones.template.html',
    controller: ['Estacion', function EstacionesController(Estacion) {
        var self = this;
        
        self.estaciones = [];
        self.busqueda = '';
        self.posicion = { };
        
        Estacion.obtenerTodos(function(estaciones) {
            self.estaciones = estaciones;
        });
        
        //si tenemos datos de geolocalización en el navegador...
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(posicion){
                self.posicion.latitud = posicion.coords.latitude;
                self.posicion.longitud = posicion.coords.longitude;
                
                console.log("posicion: [" + self.posicion.latitud + " : " + self.posicion.longitud + "]");
            }, function(error) {
                console.log("error: " + error);
            });
        }
    }]
});
