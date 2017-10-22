// Registra el componente Estaciones, junto con su controller y template (view)
angular.
  module('ptfApp').
  component('estaciones', {
    //Nota: la url de éste template es relativa a index.html
    templateUrl: 'lista-estaciones.template.html',
    controller: ['Estacion', '$localStorage', function EstacionesController(Estacion, $localStorage) {
        var self = this;
        
        self.estaciones = [];
        self.busqueda = '';
        self.posicion = { };
        self.storage = $localStorage;
        
        
        Estacion.obtenerTodos(function(estaciones) {
            self.estaciones = estaciones;
            
            //inicializo la lista de estaciones favoritas en el storage
            if (self.storage.favoritas === undefined) {
                self.storage.favoritas = [];
            } else {
                self.estaciones.filter(function(estacion) {
                    return self.storage.favoritas.indexOf(estacion.EstacionId) > -1;
                }).forEach(function(estacion) {
                    estacion.favorita = true;
                });
            }
        });
        
        //si tenemos datos de geolocalización en el navegador...
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(posicion) {
                self.posicion.latitud = posicion.coords.latitude;
                self.posicion.longitud = posicion.coords.longitude;
            }, function(error) {
                console.log("error: " + error);
            });
        }
        
        self.favorita = function(id) {
            self.estaciones.find(function(estacion) {
                if (estacion.EstacionId === id) {
                    //no fue definido el atributo de la estación
                    if (estacion.favorita === undefined) {
                        estacion.favorita = true;
                    } else {
                        // si ya fue definido, simplemente cambiamos su valor por el contrario
                        estacion.favorita = !estacion.favorita;
                    }
                    
                    if (estacion.favorita) {
                        //la agregamos a favoritas
                        self.storage.favoritas.push(estacion.EstacionId);
                    } else {
                        //la removemos de favoritas
                        self.storage.favoritas = self.storage.favoritas.filter(function(fav) {
                            return fav != estacion.EstacionId;
                        });
                    }
                }
            });
        };
    }]
});
