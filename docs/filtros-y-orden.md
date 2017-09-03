# Filtros y ordenamiento de las estaciones

 Ya tenemos nuestra lista de estaciones que vienen de nuestro servidor (en el archivo `estaciones.json`), y que nos muestra los detalles al hacer click en cada una.
 En éste capítulo vamos a trabajar con la lista completa. Para poder mostrar mejor el valor que agregan las funcionalidades que vamos a desarrollar a continuación.
 Nota: La fuente original de las estaciones viene del GCBA y está en formato XML. Por simplicidad, nosotros la convertimos a JSON y la tenemos en un archivo en nuestro servidor, pero bien podríamos tenerla en una base de datos o pedirla desde nuestro servidor a la fuente original. No la usamos directamente porque por seguridad el navegador no lo permite (es un mecanismo conocido como [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)).

## Paso 1: Filtro de texto para búsquedas

 Si queremos buscar por texto y listar sólo aquellas estaciones que cumplen con ciertas palabras, AngularJS ofrece una funcionalidad muy potente: los filtros de ngRepeat.
 Para implementarlo, especificamos un filtro en el template de la lista de estaciones, de ésta forma:

        ng-repeat="estacion in $ctrl.estaciones | filter: $ctrl.busqueda"

 Y después agregamos en el template un input html asociado al modelo `$ctrl.busqueda` del componente.

        <div class="input-group" style="padding-bottom: 9px; border-bottom: 1px solid #eee; margin-bottom: 9px;">
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
            </span>
            <input ng-model="$ctrl.busqueda" type="text" class="form-control" placeholder="Buscar...">
        </div>

 Entonces, cada vez que el usuario modifique el contenido del input, como Angular tiene un binding entre el input html y el modelo y éste es usado para filtrar el ngRepear, se va a recorrer la lista de estaciones y usar el contenido del input para dejar sólo aquellas estaciones que tengan un texto que cumpla con el mismo. Esto hace que la búsqueda y filtrado sea muy fácil de hacer.
 
 Ahora, tal vez estén pensando: *ese filtro hace referencia a un modelo que no tenemos declarado en nuestro controlador, igual que el input*. 
 No importa, Angular además se encarga de crearlo en el modelo y usarlo sin que tengamos que declararlo explícitamente en el controlador.

## Paso 2: Mejoras al filtro

 Si hacemos búsquedas como `Pueyrredón`, obtenemos dos resultados, porque esa palabra se encuentra en el nombre de una estación y en la dirección de otra. Eso se ve bien, porque está filtrando por Nombre y Dirección.
 
 ![Filtro genérico](https://raw.githubusercontent.com/germanio/intro-a-angularjs/master/docs/capturas/filtro-generico.png)

 Pero pronto nos damos cuenta que aparecen resultados inesperados:
 
 ![Filtro erróneo](https://raw.githubusercontent.com/germanio/intro-a-angularjs/master/docs/capturas/filtro-erroneo.png)

 Parece que también filtra por ID, porque devuelve Aime Paine, pero qué pasa con la estación Rincón? Porqué aparece después del filtro?
 al ver los datos de la estación, encontramos que `151` es parte de la latitud:

        {
            "EstacionId":"106",
            "EstacionNombre":"Rincón",
            "BicicletaDisponibles":"3",
            "EstacionDisponible":"SI",
            "Latitud":"-34.615164",
            "Longitud":"-58.395904",
            "Numero":"2091",
            "Lugar":"BALVANERAS",
            "Piso":"",
            "AnclajesTotales":"20",
            "AnclajesDisponibles":"17"
        },

 El problema es que el filtro que estamos usando busca en todos los atributos de la estación. Lo que necesitamos hacer es un filtro a medida de nuestras necesidades. Un filtro que permita hacer búsquedas por Nombre y Dirección, pero no por otros campos.
 
 AngularJS brinda la posibilidad de incorporar nuestros propios filtros. En nuestro caso, tenemos que implementar un nuevo archivo javascript (`app/estacion.filter.js`) con lo siguiente:
 
        angular.
          module('ptfApp').
          filter('porEstacion', function() {
            return function(estaciones, consulta) {
                //si no hay ninguna consulta, devolver toda la lista
                if (!consulta) return estaciones;

                var estacionesFiltradas = [];

                //recorremos las estaciones para ver cual se queda y cual se va
                angular.forEach(estaciones, function(estacion) {
                    //obtenemos el valor de cada atributo, o un string vacío, para evitar problemas
                    var nombre = estacion.EstacionNombre || '';
                    var direccion = estacion.Lugar || '';

                    //si el valor de la consulta existe dentro del atributo, va a ser `true`
                    var nombreValido = nombre.indexOf(consulta) != -1;
                    var direccionValida = direccion.indexOf(consulta) != -1;

                    //si el nombre o la direccion contienen a la consulta, entonces agrego la estación
                    if (nombreValido || direccionValida) {
                        estacionesFiltradas.push(estacion);
                    }
                });
                return estacionesFiltradas;
            };
          });
 
 En el módulo `ptfApp`, creamos un `filter`: le definimos el nombre y simplemente le asociamos una función, que es la encargada de instanciar el filtro. El filtro no es más ni menos que otra función javascript, que recibe el array con las estaciones y la consulta que el usuario está haciendo en ese momento (o sea, el contenido de `$ctrl.busqueda`).
  Es interesante notar que el filtro puede o no recibir parámetros desde el template. En éste caso recibe la consulta del usuario, para poder comparar. Y para hacerlo se usa la siguiente sintaxis:
        
        ng-repeat="elemento in listaElementos | miFiltro:parametro1:parametro2:..."
 
 No hay que olvidarse que también hay que modificar el template para usar nuestro filtro:
 
        ng-repeat="estacion in $ctrl.estaciones | porEstacion: $ctrl.busqueda"
        
 Y agregar la referencia al nuevo archivo (`app/estacion.filter.js`) en el `index.html`. Sino no va a funcionar.

 Nota: Es posible aplicar filtros a modelos que no sean arrays, fuera del ngRepeat, así como también concatenar filtros.
 
 ## Ahora te toca a vos!

1. Ejercicio: Modificá el filtro para poder buscar independientemente si se usa mayúsculas/minúsculas.
1. Ejercicio: Aplicá un filtro al campo de nombre en el template, para pasarlos a mayúsculas. Ejemplo: `Retiro` pasaría a mostrarse como `RETIRO`. 
 
 