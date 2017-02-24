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

 Paso por paso, estamos haciendo lo siguiente:

    angular.module('ptfApp')

 Con ésto, estamos llamando al módulo principal de nuestra aplicación. También podemos usar la variable que creamos antes, pero a veces no es conveniente, dado que AngularJS tiende a modularizar cada parte en un archivo distinto, por eso es útil la variable global `angular`.

 Después llamamos al método `.component(nombre, objeto)`, donde `nombre` es el nombre del componente que va a usarse en el html y `objeto` tiene dos atributos, `template`, un string con el html que usa de view y `controller`, la función que construye el controlador.

 Cosas a notar: El controlador no recibe más `$scope`, sino que utiliza `this`. El template no usa directamente `estaciones`, sino que lo hace a través de una variable llamada `$ctrl`, que hace referencia al controlador asociado.

 Y cómo queda la vista? así:

    <body>
        <estaciones></estaciones>
    </body>

 Donde `<estaciones/>` hace referencia al nombre del componente. Una vez que la aplicación se cargó en el navegador, se puede ver con las herramientas del navegador cómo queda armado el html.
