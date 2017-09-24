# Las estaciones más cercanas

 Imaginemos que estamos en un determinado lugar de la ciudad (Plaza Houssay, por ejemplo :D ) y queremos buscar una bicicleta lo más cerca a nosotros para trasladarnos a otro punto rápidamente, o incluso que ya tenemos la bicicleta y queremos saber cuáles son las estaciones más cercanas dónde poder dejarla. 
 
 Parece que poder saber qué estaciones tenemos cerca es una funcionalidad muy importante para nuestra aplicación, no?
 
 Entonces, cómo podemos hacer con nuestra lista de estaciones para obtener aquellas que están más cerca? Podría tener dicha lista ordenada por distancia? (las más cercanas primero). Necesito algún dato más?
 
## Paso 1: Analicemos el problema

 Necesitamos encontrar qué estaciones están *cerca de donde estamos*, en éste caso pongamos como ejemplo que estamos en [Plaza Houssay](https://www.google.com.ar/maps/place/Plaza+Dr.+Bernardo+Houssay/@-34.5989141,-58.3999595,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcca944582dea1:0x1187bb1c0c4c27b0!8m2!3d-34.5989141!4d-58.3977708?hl=es), pero podríamos estar en cualquier lugar (CMD, Escuela de Maestros, Usuaria, etc). Para lograrlo, nos conviene simplemente *filtrar* la lista original, tanto para mostrar sólo aquellas estaciones a *cierta distancia* de dónde estamos, así como también ordenar dichos resultados por esa distancia.
 
 Acá se nota que entran en juego dos datos que no tenemos (todavía):
 
 - nuestra ubicación cuando queremos buscar las estaciones, llamemoslo `centro`. El centro es simplemente nuestra posición en el mapa o *geolocalización*.
 - y hasta qué distancia filtramos. En otras palabras: hasta qué distancia consideramos una estación como *cercana*, o más bien, qué distancia estamos dispuestos a recorrer para llegar a la estación, llamemoslo `distancia_max`. Dicha distancia va a ser configurada por el usuario (algunas personas sólo estarán dispuestas a recorrer hasta 300 metros, otras hasta 700 metros, otras quizá 1000 metros).
 
 De forma muy simplificada(1), podemos suponer lo siguiente para resolver el problema: con el centro y la distancia máxima, trazamos un círculo sobre el mapa, entonces aquellas estaciones que caigan dentro del círculo son las que están cerca y se van a mostrar en los resultados, y las que no, son las que están demasiado lejos y no las mostramos.
 
 ![Mapa de estaciones](https://raw.githubusercontent.com/germanio/intro-a-angularjs/master/docs/capturas/filtro-proximidad-mapa.png)
 
## Paso 2: Resolución, parte I

 Por nuestro análisis, tenemos que implementar lo siguiente:
 
 1. filtrar por la `distancia` de cada estación al `centro`, descartando aquellas que están más allá de `distancia_max`.
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
 
 
 
 
 (1) Digo *de forma muy simplificada* porque estoy simplificando los cálculos de geolocalización para que sea más fácil de entender y el código sea simple. Si se quiere que el resultado sea preciso, hay que usar otros algoritmos y tomar otras hipótesis.
 Por ejemplo, en éste caso, consideramos que las distancias son pequeñas y que a tales distancias La Tierra se puede pensar como plana y podemos usar Pitágoras para calcular distancias entre dos puntos usando coordenadas. Sino hay que usar [la fórmula del semiverseno](https://es.wikipedia.org/wiki/F%C3%B3rmula_del_haversine) o alguna librería especializada que resuelva ésto por nosotros.
 