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
 
## Paso 2: Resolución, parte I

 Por nuestro análisis, tenemos que implementar lo siguiente:
 
 1. filtrar por la `distancia` de cada estación al `centro`, descartando aquellas que están más allá de `distanciaMaxima`.
 1. ordenar las estaciones filtradas, también por la `distancia`.
 1. mostrar la distancia en metros al usuario (así sabe cuanto tiene que recorrer para llegar a cada una).
 
 Vamos a empezar por la primera parte, fijando la distancia máxima en 1000 metros y nuestra ubicación en Plaza Houssay. 
 Después vamos a permitir cambiar la distancia máxima al usuario y vamos a ver cómo obtener nuestra ubicación dinámicamente. 
 
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
        var distancia_rad = calcular_distancia({
            latitud: centro_coords.latitud - estacion_coords.latitud,
            longitud: centro_coords.longitud - estacion_coords.longitud
        });

        //después pasamos de radianes a metros
        var distancia = radianes_a_metros(distancia_rad);

        //éste valor debe ser menor que la distancia máxima
        if (distanciaMaxima > distancia) {
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
    //`coordenadas` es un objeto que tiene latitud y longitud como atributos, con valores en radianes
    function calcular_distancia(coordenadas){
        //calculamos la distancia al centro usando pitágoras
        return Math.sqrt(Math.pow(coordenadas.latitud, 2) + Math.pow(coordenadas.longitud, 2));
    }
    
    function radianes_a_metros(radian){
        const RAD = 0.000008998719243599958;
        return Math.round(radian / RAD);
    }
```
 
 (1) Digo *de forma muy simplificada* porque estoy simplificando los cálculos de geolocalización para que sea más fácil de entender, implementar y el código además sea más o menos simple. Si se quiere que el resultado sea preciso, hay que usar otros algoritmos y tomar otras hipótesis.
 
 Por ejemplo, consideramos la línea recta entre la estación y el centro como la distancia entre ambas, aunque el usuario en realidad no va a poder caminar directamente atravezando en diagonal las cuadras, sino doblando en las esquinas. Ésto lo hacemos porque simplifica mucho el filtrado: si tomamos las cuadras y las calles que debe recorrer el usuario, deberíamos tener en cuenta el diseño de las mismas para hacer los cálculos de las distancias mínimas (porque puede haber varios caminos para llegar entre un punto y otro). Para ésto necesitamos técnicas más complejas y mucha más información urbanística.
 
 También en éste caso, consideramos que las distancias son pequeñas y que a tales distancias La Tierra se puede pensar como plana y podemos usar Pitágoras para calcular distancias entre dos puntos usando coordenadas. Si las distancias son muy grandes, hay que considerarla como una esfera, y entonces hay que usar [la fórmula del semiverseno](https://es.wikipedia.org/wiki/F%C3%B3rmula_del_haversine) o alguna librería especializada que resuelva ésto por nosotros.
