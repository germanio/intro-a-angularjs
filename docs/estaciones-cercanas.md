# Las estaciones más cercanas

 Imaginemos que estamos en un determinado lugar de la ciudad (Plaza Houssay, por ejemplo :D ) y queremos buscar una bicicleta lo más cerca a nosotros para trasladarnos a otro punto rápidamente, o incluso que ya tenemos la bicicleta y queremos saber cuáles son las estaciones más cercanas dónde poder dejarla. 
 
 Parece que poder saber qué estaciones tenemos cerca es una funcionalidad muy importante para nuestra aplicación, no?
 
 Entonces, cómo podemos hacer con nuestra lista de estaciones para obtener aquellas que están más cerca? Podría tener dicha lista ordenada por distancia? (las más cercanas primero). Necesito algún dato más?
 
## Paso 1: Analicemos el problema

 Necesitamos encontrar qué estaciones están *cerca de donde estamos*, en éste caso pongamos como ejemplo que estamos en [Plaza Houssay](https://www.google.com.ar/maps/place/Plaza+Dr.+Bernardo+Houssay/@-34.5989141,-58.3999595,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcca944582dea1:0x1187bb1c0c4c27b0!8m2!3d-34.5989141!4d-58.3977708?hl=es), pero podríamos estar en cualquier lugar (CMD, Escuela de Maestros, Usuaria, etc). Para lograrlo, nos conviene simplemente *filtrar* la lista original, tanto para mostrar sólo aquellas estaciones a *cierta distancia* de dónde estamos, así como también ordenar dichos resultados por esa distancia.
 
 Acá se nota que entran en juego dos datos que no tenemos (todavía):
 
 - nuestra ubicación cuando queremos buscar las estaciones, llamemoslo `centro`. El centro es simplemente nuestra posición en el mapa o *geolocalización*.
 - y hasta qué distancia filtramos. En otras palabras: hasta qué distancia consideramos una estación como *cercana*, o más bien, qué distancia estamos dispuestos a recorrer para llegar a la estación, llamemoslo `distanciaMaxima`. Dicha distancia va a ser configurada por el usuario (algunas personas sólo estarán dispuestas a recorrer hasta 300 metros, otras hasta 700 metros, otras quizá 1000 metros).
 
 De forma muy simplificada(1), podemos suponer lo siguiente para resolver el problema: con el centro y la distancia máxima, trazamos un círculo sobre el mapa, entonces aquellas estaciones que caigan dentro del círculo son las que están cerca y se van a mostrar en los resultados, y las que no, son las que están demasiado lejos y no las mostramos.
 
 ![Mapa de estaciones](https://raw.githubusercontent.com/germanio/intro-a-angularjs/master/docs/capturas/filtro-proximidad-mapa.png)
 
## Paso 2: Filtramos y ordenamos

 Por nuestro análisis, tenemos que implementar lo siguiente:
 
 1. calcular la `distancia` entre las estaciones y el `centro`, para todas las estaciones.
 1. filtrar por la `distancia` de cada estación al `centro`, descartando aquellas que están más allá de `distanciaMaxima`.
 1. ordenar las estaciones filtradas, también por la `distancia`.
 1. mostrar la distancia en metros al usuario (así sabe cuanto tiene que recorrer para llegar a cada una).
 
 Vamos a empezar por la primera parte, fijando la distancia máxima en 1000 metros y nuestra ubicación en Plaza Houssay. 
 Nota: Después vamos a permitir cambiar la distancia máxima al usuario y vamos a ver cómo obtener nuestra ubicación dinámicamente. 
 
 Creamos un nuevo filtro, llamado `proximidad.filter.js` (por ahora vacío) que va a filtrar y ordenar, todo al mismo tiempo:
 
```javascript
     angular.
      module('ptfApp').
      filter('porProximidad', function() {
        return function(estaciones) {

            return estaciones;
        };
      });
```
 
 Éste filtro va a recorrer las estaciones que recibe por parámetro, y para cada una calculará su distancia al centro. 
 Con dicha distancia verificará si es menor a la distancia máxima, y si es así la agregará a la lista de estaciones cercanas. 
 También agregará la distancia en metros al objeto, así podemos mostrarla al usuario.
 Finalmente, con la lista filtrada, la ordenamos por distancia antes de terminar el procesamiento:
 
```javascript
    var estacionesFiltradas = [];
        
    //ATENCION ésto está fijo por ahora: coordenadas a Plaza Houssay, sacadas de Google Maps
    var centro_coords = {
        latitud: -34.5989141,
        longitud: -58.3999595
    };

    //ATENCION ésto está fijo por ahora: distancia máxima en metros
    var distanciaMaxima = 1000;

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
```
 
Las funciones auxiliares `calcular_distancia()` y `radianes_a_metros()` son así:

```javascript
    //`coordenadas` es un objeto que tiene `latitud` y `longitud` como atributos, con valores en radianes
    function calcular_distancia(coordenadas){
        //calculamos la distancia al centro usando pitágoras
        return Math.sqrt(Math.pow(coordenadas.latitud, 2) + Math.pow(coordenadas.longitud, 2));
    }
    
    function radianes_a_metros(radian){
        const RAD = 0.000008998719243599958;
        return Math.round(radian / RAD);
    }
```
 
 Con el filtro implementado, ahora sólo queda usarlo en el template:

```html
    <li ng-repeat="estacion in $ctrl.estaciones | porProximidad | porEstacion: $ctrl.busqueda | orderBy : $ctrl.orden" class="list-group-item">
        <h4 class="list-group-item-heading">
            {{estacion.EstacionNombre}}
            <small>ID: {{estacion.EstacionId}}</small>
        </h4>
        <p>
            <span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
            {{estacion.Lugar}}
        </p>
        <p><small>Distancia al centro: {{estacion.distancia | number:0}} metros</small></p>
        <a type="button" class="btn btn-primary" href="#!/estaciones/{{estacion.EstacionId}}">Ver Detalle</a>
    </li>
```
 
 El primer filtro que agregamos va a ser el de proximidad, para poder usar los otros encima de ése.
 También agregamos un pequeño párrafo para mostrar la distancia al centro en metros, usando el filtro `number` para no mostrar los decimales.

## Parte 2: Los datos del usuario

 Es hora de tomar los datos de la ubicación del usuario y qué distancia máxima está dispuesto a recorrer.
 
### Geolocalización

 No hace falta preguntarle al usuario dónde está, su navegador lo sabe con bastante precisión. Para obtener los datos del navegador, hay que usar la API del navegador para obtener la geolocalización.
 
```javascript
    navigator.geolocation.getCurrentPosition(function(posicion){
    
        //hacer algo con la posición
    
    }
```
 
### Distancia máxima

 La distancia máxima ahora se la vamos a pedir al usuario modificando el template para ello:
 
```html
    <div class="input-group">
        <span class="input-group-addon">
            Filtrar por proximidad? <input type="checkbox" aria-label="..." ng-model="$ctrl.filtrarPorProximidad">
        </span>
        <input type="text" class="form-control" aria-label="..." placeholder="filtrar en un radio en metros de..." ng-model="$ctrl.distanciaMaxima">
    </div>
```

 También le vamos a permitir al usuario que active/desactive la búsqueda de estaciones cercanas, porque no necesariamente siempre va a querer buscar así. Eso lo hacemos con `ctrl.filtrarPorProximidad`. Después con `$ctrl.distanciaMaxima` guardamos lo que el usuario ingrese para usarlo como distancia máxima en el filtro.
 
 Todo ésto ahora lo pasamos al filtro desde el template así:

```javascript
    porProximidad:$ctrl.filtrarPorProximidad:$ctrl.posicion:$ctrl.distanciaMaxima
```

 Y en el filtro lo recibimos así:

```javascript
    // ésta es la función que devuelve el filtro
    
    return function(estaciones, activarFiltro, centro_coords, distanciaMaxima) {
        var estacionesFiltradas = [];
    
        // acá validamos si el filtro está activo, mapea con $ctrl.filtrarPorProximidad
        
        if ( !activarFiltro ){
            return estaciones;
        }
        
        // acá validamos que realmente tengamos las coordenadas del usuario
        
        if ( centro_coords.latitud == undefined || centro_coords.longitud == undefined ){
            return estaciones;
        }
        
        //recorremos las estaciones para ver cual se queda y cual se va
        angular.forEach(estaciones, function(estacion) {
        ...
        ...
        
```

 Nótese que borramos del filtro las coordenadas y la distancia máxima que habíamos hardcodeado en el paso anterior.
 
 Como último detalle, usamos la directiva ngShow para mostrar/ocultar la distancia de las estaciones según se active o no el filtro:
 
```html
    <p ng-show="$ctrl.filtrarPorProximidad"><small>Distancia al centro: {{estacion.distancia | number:0}} metros</small></p>
```
 
## Ahora te toca a vos!

1. Ejercicio: Si se elije ordenar por nombre o dirección cuando se está filtrando por proximidad, no se puede volver a ordenar por distancia. Actualizar la lista de radio buttons agregando una nueva opción para que, si está seleccionado el filtro por proximidad, se pueda elegir ordenar por distancia.
1. Ejercicio: Modificar la forma en que se muestra la distancia de las estaciones para que el usuario pueda elegir entre metros o kilómetros.


 (1) Digo *de forma muy simplificada* porque estoy simplificando los cálculos de geolocalización para que sea más fácil de entender, implementar y el código además sea más o menos simple. Si se quiere que el resultado sea preciso, hay que usar otros algoritmos y tomar otras hipótesis.
 
 Por ejemplo, consideramos la línea recta entre la estación y el centro como la distancia entre ambas, aunque el usuario en realidad no va a poder caminar directamente atravezando en diagonal las cuadras, sino doblando en las esquinas. Ésto lo hacemos porque simplifica mucho el filtrado: si tomamos las cuadras y las calles que debe recorrer el usuario, deberíamos tener en cuenta el diseño de las mismas para hacer los cálculos de las distancias mínimas (porque puede haber varios caminos para llegar entre un punto y otro). Para ésto necesitamos técnicas más complejas y mucha más información urbanística.
 
 También en éste caso, consideramos que las distancias son pequeñas y que a tales distancias La Tierra se puede pensar como plana y podemos usar Pitágoras para calcular distancias entre dos puntos usando coordenadas. Si las distancias son muy grandes, hay que considerarla como una esfera, y entonces hay que usar [la fórmula del semiverseno](https://es.wikipedia.org/wiki/F%C3%B3rmula_del_haversine) o alguna librería especializada que resuelva ésto por nosotros.
