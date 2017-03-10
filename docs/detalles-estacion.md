# Ver detalles de una estación

 Hasta ahora sólo tenemos una lista de estaciones, donde mostramos todos los datos que tenemos.
 Cuantos más datos necesitemos agregar, más complicada se verá la lista, especialmente en términos de usabilidad o experiencia de usuario.
 Estaría buenísimo poder mostrar una lista con ciertos datos básicos, y después poder mostrar el detalle de cada estación si el usuario lo pide.

## Paso 1: Layout template

 Para mostrar distintas vistas en una aplicación que tiene una única página (SPA o Single Page Application en inglés), necesitamos un mecanismo que
 permita vincular una vista con una URL. Al mismo tiempo, como ya vimos anteriormente, las vistas están asociadas a los controladores que las manejan
 mediante el concepto de _Componente_, por lo tanto resulta cómodo relacionar en el componente también la URL.

 Por eso, el primer paso es convertir el template base `index.html` en un _layout template_, que significa que va a ser usado tanto por la vista de la lista de estaciones como por la de detalles, o cualquier otra que agreguemos.
 Con la directiva `ngView` aplicada a una etiqueta html, le vamos a decir a nuestra aplicación que queremos mostrar ahí la vista asociada con esa url.
 El cuerpo del panel parece el lugar ideal para ésto:

     <div class="panel-body" ng-view>
         <!-- lo dejamos vacío para que pueda ser completado por cada view -->
     </div>

 El siguiente paso es poder vincular las urls con las vistas, para eso, necesitamos usar un módulo llamado `ngRoute`, que generalmente se lo encuentra asociado a `ngView`.

## Paso 2: El módulo `ngRoute`

 Este módulo nos va a permitir asociar la url, la vista y el controlador en el componente. El objetivo es hacer dos cosas:
1. cuando el usuario navega a `/index.html` va a ser dirigido a `/index.html#!/estaciones` y se le va a mostrar la lista de estaciones con datos básicos
1. cuando el usuario haga click en una estación de la lista, la URL cambia a `/index.html#!/estaciones/<id>` donde `<id>` es el id de la estación seleccionada, y se le va a mostrar el detalle de la estación con todos los datos que ésta tiene.

 Para poder usar el módulo, primero tenemos que referenciarlo en el html, agregando justo debajo de la referencia a la librería de AngularJS:

    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-route.js"></script>

 Después tenemos que configurar nuestra aplicación para que lo use, ésto lo hacemos en `public/app/app.js`:

    var ptfApp = angular.module('ptfApp', ['ngRoute']);

 Los corchetes que pasamos como segundo parámetro son el array de nombres de módulos que son dependencias de nuestra aplicación. En los próximos capítulos vamos a agregar otros.

 Después agregamos la configuración de las rutas en `public/app/app.config.js` usando el método `/config()` de nuestro módulo principal:

    angular.module('ptfApp').
        config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/estaciones', {
                    template: '<estaciones></estaciones>'
                }).
                when('/estaciones/:id', {
                    template: '<detalle-estacion></detalle-estacion>'
                }).
                otherwise('/estaciones');
            }
        ]);

 Este código quiere decir que en el momento en que se configura el módulo principal, se usa el proveedor (`$routeProvider`) que va a configurar el servicio `$route` con las rutas que le definimos acá: para cada ruta ('.when()') usa un template (que va a cargar el componente que corresponda), y si el usuario escribe cualquier cosa en la barra de navegación, la aplicación lo va a redirigir para mostrarle la lista de estaciones (`.otherwise()`).
 En el caso de la ruta que va a mostrar el detalle de una estación, se indica con `:id` que esa parte es variable, o sea, depende de la estación. Eso va a servir para indicarle al controlador qué estación mostrar cada vez que el usuario haga click para ver alguna en particular.

 Nota: se le configura también el símbolo que va a usar en los links de las rutas que maneje, en éste caso `!`. No es necesario pero es una buena práctica. Las razones de ésto exceden el alcance del tutorial, pero siempre pueden consultar [la documentación oficial](https://code.angularjs.org/1.6.1/docs/api/ng/provider/$locationProvider) al respecto.

## Paso 3: el componente para los detalles de una estación

 Creamos el componente en `public/app/estacion-detalle.component.js` así:

    angular.module('ptfApp').
        component('detalleEstacion', {
            template: '<span>{{$ctrl.id}}</span>',
            controller: ['$routeParams', function detalleEstacionController($routeParams) {
                this.id = $routeParams.id;
            }]
        });

 O sea, le pedimos a Angular el módulo principal, e invocamos `.component()` para declarar un nuevo componente. Le ponemos un nombre y le pasamos un objeto donde se define el template y el controller, donde por ahora, sólo mostramos el ID de la estación, que viene como parámetro de la url y que podemos obtener directamente, mediante el servicio `routeParams` (por eso se lo inyecta como dependencia en el controlador).

 No nos olvidemos de agregar los nuevos archivos en el flamante layout template `index.html`, después de la referencia a `Angular Route` deberían quedar así:

    <script src="../app/app.js"></script>
    <script src="../app/app.config.js"></script>
    <script src="../app/estaciones.component.js"></script>
    <script src="../app/estacion-detalle.component.js"></script>
    <script src="../app/estacion.service.js"></script>

 *Nota*: en el tutorial oficial de AngularJS se usa un módulo para cada controlador además del módulo principal. En éste tuturial, sólo usamos el módulo principal con el fin de hacerlo (al tutorial) un poco más simple de entender.

## Paso 4: Link a la vista de detalles

 Hasta acá todo bien, pero no estamos accediendo a los detalles todavía. Se puede acceder escribiendo la url con el ID de la estación, pero también podemos hacerlo agregando un botón, para redireccionar automáticamente al usuario a la url de detalles de cada estación.
 Esto lo hacemos en `/public/html/lista-estaciones.template.html`:

 {% raw %}
    <a type="button" class="btn btn-primary" href="#!/estaciones/{{estacion.id}}">Ver Detalle</a>
 {% endraw %}

 Ahora, al probar cómo quedó, la lista va a tener un botón "Ver detalle" por cada estación listada, que al clickear, va a llevar a la vista de detalles de dicha estación (donde sólo tenemos el ID), sin que la página cambie.

 Pero cómo accedemos a los datos de la estación seleccionada?

## Paso 5: Mostrando los datos de la estación

 Necesitamos que nuestro controlador del detalle de la estación busque en los datos de las estaciones y lo haga disponible para la vista.
 Entonces, primero inyectamos el servicio de Estaciones como dependencia de nuestro controlador, al lado de `$routeParams`:

     controller: ['$routeParams', 'Estacion',
       function detalleEstacionController($routeParams, Estacion) {
         this.id = $routeParams.id;
         this.estacion = Estacion.get(this.id);
       }
     ]

 En la función de inicialización del controlador, ahora recibimos por parámetro el servicio `Estacion`.
 Ahora hay que obtener todas las estaciones y buscar aquella que tenga el ID que recibimos en la url.
 Pero no lo vamos a hacer acá, sino internamente en el mismo servicio, y acá sólo vamos a llamar a la función que hace eso.
 De ésta forma, el servicio es responsable por manejar los datos, mientras que el controlador se hace cargo de proveerle a la vista los datos que ella necesite.
 En el servicio de Estaciones entonces tenemos:

     angular.module('ptfApp').
         factory('Estacion', function() {
             var estaciones = [ ... ];
             return {
                 estaciones: estaciones,
                 get : function(id) {
                     return estaciones.find(function(estacion) {
                         return estacion.id === id
                     });
                 }
             };
         });

 Lo importante acá es la función `.get()` que estamos devolviendo. Cabe notar que ahora los datos están en una variable y no en el objeto que se devuelve, esto es así para que `.get()` pueda acceder a los datos también. La función `.find()` es una función de los Arrays de javascript que devuelve el primer elemento del array que cumple con la expresión ([docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/find)).

 Y por último, vamos a modificar el template para tenerlo en un archivo y que sea más complejo. Lo vamos a guardar en `public/html/detalle-estacion.template.html`:

 {% raw %}
     <h4>
         {{$ctrl.estacion.nombre}}
         <small>ID: {{$ctrl.estacion.id}}</small>
     </h4>
     <p>
         <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
         Bicicletas disponibles <span class="badge">{{$ctrl.estacion.bicicletas_disponibles}}</span>
     </p>
     <p>
         <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
         Anclajes disponibles <span class="badge">{{$ctrl.estacion.anclajes_disponibles}}</span>
     </p>
     <p>
         <span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
         {{$ctrl.estacion.ubicacion}}
     </p>
     <a type="button" class="btn btn-default" href="#!/estaciones">Volver</a>
 {% endraw %}

 Y queda modificar el componente para que acceda a dicho template:

    templateUrl: 'detalle-estacion.template.html',

 Y reducir lo que mostramos en la lista, donde podemos dejar el nombre y la ubicación.

## Cómo se ve ahora la aplicación?

La lista de estaciones se ve así:

![Lista de estaciones](https://raw.githubusercontent.com/germanio/intro-a-angularjs/master/docs/capturas/detalle-estacion-lista.png)

Mientras que el detalle de una estación (en éste caso la de ID 1):

![Detalle de estación 1](https://raw.githubusercontent.com/germanio/intro-a-angularjs/master/docs/capturas/detalle-estacion-detalle.png)
## Ahora te toca a vos!

1. Ejercicio: agregá otro botón en cada estación de la lista, que lleve a una imagen de la estación, que debe quedar guardada en `public/img`. Ayuda: que los nombres de las imágenes tengan el `id` de la estación, así te va a resultar muy fácil pedirlas al servidor.
