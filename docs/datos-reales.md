# Integramos datos reales!

 Hasta el capítulo anterior teníamos nuestra aplicación mostrando una lista de estaciones y el detalle de cada una, pero siempre
 usando datos de prueba. Es hora de ir a buscar los datos reales.

## Paso 1: Origen de los datos

 Los datos reales se encuentran en ésta url:

    https://recursos-data.buenosaires.gob.ar/ckan2/ecobici/estado-ecobici.xml

 Por cuestiones de claridad, vamos a pasar los datos a formato JSON y los vamos a guardar en un archivo en el proyecto (en `data/estaciones.json`). Dicho archivo va a ser entregado por nuestro servidor http.
 Después vamos a cambiar las referencias a los atributos de los objetos `estacion`, dado que son distintos. Esto afecta nuestros templates y algo de la lógica.
 Finalmente, vamos a hacer que PTF consulte ese archivo y guarde los datos que ésta devuelve.
 Para eso, AngularJS provee un servicio llamado $http, que tenemos que inyectar a nuestro servicio de Estaciones.

## Paso 2: Inyectar $http al servicio

 Vamos a cambiar un poco nuestro servicio, primero vamos a inyectar `$http`:

    angular.module('ptfApp').
        factory('Estacion', ['$http', function($http) {

            return {
                // acá va la definición del servicio
            };
        }]);

 Después vamos a cambiar los atributos del objeto que devolvíamos por dos funciones, una para la lista de estaciones y otra para buscar una estación en particular:

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

 Nótese el objeto adicional llamado `cache`, que va a ser el encargado de guardar la lista, para no tener que pedirla cada vez. Esto evita que el servidor tenga que mandar la lista completa cada vez que se quiere consultar una única estación.
 *Nota*: En una aplicación con un backend, podríamos implementar una llamada adicional para que sólo nos devuelva la estación que buscamos.

 Hasta acá el servicio, pero ahora necesitamos adaptar nuestros controladores para los nuevos métodos.

## Paso 3: Adaptar los controladores

 En el caso de la lista de estaciones, lo cambiamos de ésta forma:

    var self = this;
    self.estaciones = [];
    Estacion.obtenerTodos(function(estaciones) {
        self.estaciones = estaciones;
    });

 La idea es que cuando los datos estén listos (porque el pedido al servidor puede tardar, después de todo se están transfiriendo datos por internet), se ejecute la función callback, que asigna los datos (parámetro `estaciones`) en el controlador (`self.estaciones`).

 En el caso del detalle de la estación, lo cambiamos así:

    self = this;
    self.id = $routeParams.id;
    self.estacion = null;
    Estacion.obtenerUno(self.id, function(estacion) {
        self.estacion = estacion;
    });

 La lógica es la misma, le pasamos el ID y la función callback que queremos que llame cuando tenga la estación preparada.

## Ahora te toca a vos!

1. Ejercicio: Animate a agregar un atributo en el json de los datos, y mostrarlo en la vista de detalles (por ejemplo, horario de atención de la estación).
1. Ejercicio: En un capítulo anterior propusimos el ejercicio de agregar la cantidad de estaciones en algún lugar de dicha vista. Actualizá PTF para poder tener ese valor disponible desde el servicio.
1. Investigación: Explicar porqué usamos `self` en lugar de `this` en los controladores?
