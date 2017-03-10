# Mejoras a la aplicación

## Profundizando sobre el `scope`

 Hasta acá tenemos los componentes básicos del patrón de diseño MVC: el modelo, la vista y el controlador que une ambos.
 Armamos una versión básica de nuestra aplicación, usando datos de prueba, y probamos el mapeo que se hace entre modelo y vista usando el scope.

 Lo interesante de ésto es que así como una etiqueta html puede agregarse dentro de otra, un controlador también se puede asociar en la vista dentro de otro, donde _el scope del interno hereda los atributos del externo_ y todos heredan de un scope padre o raíz.
 Esto permite reducir la complejidad de los controladores, donde cada uno se ocupa de hacer el binding con el modelo que le corresponde.

 Sin embargo, conforme la complejidad de una aplicación aumenta, empiezan a aparecer problemas de mantenimiento:
 1. por un lado, dados por la herencia de los scopes: un cambio en el scope padre puede impactar el funcionamiento de un controlador usado dentro porque hereda el cambio en su propio scope, haciendo difícil identificar el problema;
 1. y por otro, aparecen parejas vista/controlador que se comportan como una "unidad" o "funcionalidad" independiente, y que está bueno reutilizar para simplificar el desarrollo, pero tenemos que copiar el template completo en cada lugar donde querramos reusar dicha funcionalidad.
 Recordemos:

 > Duplicar código siempre trae problemas de mantenimiento.

 *Nota*: esto seguramente es difícil de ver en una aplicación chica como la que estamos desarrollando, pero es una preocupación válida en aplicaciones más grandes.

## Paso 1: Componentes!

 La solución que propone AngularJS es crear _componentes_, que por un lado unen el template y el controller en un sólo lugar y por otro porque tienen un scope aislado del resto.
 Nosotros vamos a crear un componente para la lista de estaciones, la primera versión va a ser así:

{% raw %}
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
{% endraw %}

 Paso por paso, estamos haciendo lo siguiente:

    angular.module('ptfApp')

 Con ésto, estamos llamando al módulo principal de nuestra aplicación. También podemos usar la variable que creamos antes, pero a veces no es conveniente, dado que AngularJS tiende a modularizar cada parte en un archivo distinto, por eso es útil la variable global `angular`.

 Después llamamos al método `.component(nombre, objeto)`, donde `nombre` es el nombre del componente que va a usarse en el html y `objeto` tiene dos atributos: `template`, que es un string con el html que usa de view (puede verse el `ul` y el `ngRepeat` en el `li`) y `controller`, la función que construye el controlador.

 Cosas a notar: El controlador no recibe más `$scope`, sino que utiliza `this`. El template no usa directamente `estaciones`, sino que lo hace a través de una variable llamada `$ctrl`, que hace referencia al controlador asociado.

 Y cómo queda la vista? así:

    <body>
        <estaciones></estaciones>
    </body>

 Donde `<estaciones/>` hace referencia al nombre del componente. Una vez que la aplicación se cargó en el navegador, se puede ver con las herramientas del navegador cómo queda armado el html.

 Para seguir mejorando la aplicación, vamos a aplicar el [principio de responsabilidad única](https://es.wikipedia.org/wiki/Principio_de_responsabilidad_%C3%BAnica), el cual establece que nuestros módulos o clases deben cumplir un único objetivo, proporcionar una única funcionalidad, que debe quedar totalmente encapsulada, para minimizar el esfuerzo de mantenimiento. Por eso, y arriesgándonos a sobre-dimensionar un poco nuestra aplicación (después va a tener más sentido, créanme), vamos a separar el modelo del controlador usando un nuevo tipo de elemento en AngularJS.

## Paso 2: Servicios

 Los servicios son similares a los controladores, con la diferencia que no se usan para mostrar el modelo en la vista, no tienen $scope (como los controladores originales), y no se vinculan con el html. Sino que son clases que se usan para encapsular funcionalidades que puedan ser reutilizadas.

 En nuestro caso, vamos a crear un servicio que provea las estaciones. Por ahora sólo va a proveer los datos de prueba, pero después lo vamos a modificar para que vaya a buscar los datos reales.

    angular.module('ptfApp').
        factory('Estacion', function() {
            return {
                estaciones: [{
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
                }]
            };
        });

 De nuevo, acá podríamos usar la variable `ptfApp`, pero como vemos en el código, estamos separando todo en distintos archivos, así que usando

    angular.module('ptfApp')

 es más conveniente para poder acceder al módulo que va a contener nuestro nuevo servicio.
 Después usamos un factory method `.factory(nombre, función)`, donde `nombre` es el nombre que lleva el servicio y `función` es la función que crea el servicio. Nuestra función simplemente devuelve un objeto con un atributo llamado `estaciones`, que contiene los datos de prueba.

 Cómo usamos el servicio en nuestro controlador?

## Paso 3: inyección de dependencias!

 AngularJS provee [inyección de dependencias](https://es.wikipedia.org/wiki/Inyecci%C3%B3n_de_dependencias) para facilitar el mantenimiento y ayudar a los desarrolladores a probar su código. La idea es simple, si tu controlador o servicio necesita de otro servicio, simplemente declará la dependencia y AngularJS te lo provee listo para que lo uses.
 El controlador de las estaciones (dentro del componente) se va a ver de la siguiente forma con el uso del servicio:

    controller: ['Estacion', function EstacionesController(Estacion) {
        this.estaciones = Estacion.estaciones;
    }]

 Qué cambió? El atributo `controller` ahora es un Array, donde el primer elemento es el nombre del servicio que queremos inyectar, y el segundo la función que construye el controlador, que ahora recibe por parámetro el servicio. Y las estaciones del controlador ahora se las pide a dicho servicio en lugar de tenerlas ahí dentro.
 Respecto de la inyección de dependencias, en realidad la convención es así: podemos inyectar cuantos servicios necesitemos, siempre agregando un string al array con el nombre del servicio, el último elemento del array siempre va a ser la función que construye el controlador (o el servicio), mientras que todos los anteriores son las dependencias. Por ejemplo, si quisieramos agregar un servicio de `Bicicletas`, sería así:

    controller: ['Estacion', 'Bicicleta', function EstacionesController(Estacion, Bicicleta) {
        this.estaciones = Estacion.estaciones;
        // hacer algo con el servicio de Bicicletas
    }]

 Nótese que en ningún momento usamos `new` para crear ni servicios, ni controladores, ni nada.

## Cómo quedó?

<script async src="//jsfiddle.net/germanio/4y93nzxh/10/embed/js,html,result/"> </script>

## Paso 4: ahora te toca a vos!

1. Ejercicio: Estaría buenísimo tener un componente para mostrar una única estación, que se pueda usar dentro del `ngRepeat`. Para eso, vas a necesitar revisar la [documentación del sitio oficial](https://code.angularjs.org/1.6.2/docs/guide/component).
1. Ejercicio: Implementa un componente que muestre la cantidad de estaciones disponibles, inyectando el servicio de Estaciones para obtener los datos.
