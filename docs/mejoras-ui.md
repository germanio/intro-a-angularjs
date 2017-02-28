# Más mejoras

## Repaso

 En el capítulo anterior estuvimos poniendo mucho foco en modularizar la aplicación.
 Como parte de dicha modularización, ahora tenemos distintos archivos donde cada uno tiene una parte, con una responsabilidad limitada (intentamos que sea única).

 En `public/app/` tenemos:

 `app.js`

    // Definimos el módulo para la aplicación
    var ptfApp = angular.module('ptfApp', []);

 `estaciones.component.js`

    {% raw %}
    // Registra el componente Estaciones, junto con su controller y template (view)
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
                controller: ['Estacion', function EstacionesController(Estacion) {
                    this.estaciones = Estacion.estaciones;
            }]
    });
    {% endraw %}

 `estacion.service.js`

    // Registra el servicio de estaciones, donde están los datos de prueba
    angular.
        module('ptfApp').
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

 Y en `public/html` tenemos el `index.html`:

     <!doctype html>
     <html lang="es" ng-app="ptfApp">
         <head>
             <title>Pedalear Trae Felicidad</title>
             <meta charset="utf-8">
             <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
             <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
         </head>
         <body>
             <estaciones></estaciones>

             <!-- Librerías acá -->
             <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
             <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
             <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.js"></script>
             <script src="../app/app.js"></script>
             <script src="../app/estaciones.component.js"></script>
             <script src="../app/estacion.service.js"></script>
         </body>
     </html>

## Extraemos los templates

 Pero nos queda algo más por separar: El archivo que declara el componente de la lista de estaciones tiene dos lenguajes distintos, uno para el template (html) y otro para la lógica (javascript). Mezclar multiples lenguajes en un mismo archivo no es una buena práctica y para peor en nuestro caso, estamos concatenando cadenas de caracteres para armar el html.
 Para solucionarlo, creamos el archivo `public/html/lista-estaciones.template.html` y guardamos ahí el html del componente, sin lo de javascript:

     `public/html/lista-estaciones.template.html`:

        {% raw %}
         <ul>
             <li ng-repeat="estacion in $ctrl.estaciones">
                 <span>ID: {{estacion.id}}</span>
                 <p>Nombre: {{estacion.nombre}}</p>
                 <p>Ubicación: {{estacion.ubicacion}}</p>
                 <p>Bicicletas disponibles: {{estacion.bicicletas_disponibles}}</p>
                 <p>Anclajes disponibles: {{estacion.anclajes_disponibles}}</p>
             </li>
         </ul>
         {% endraw %}

 Y en el componente, agregamos la referencia a dicho archivo, quedando así:

     `public/app/estaciones.component.js`:

         angular.
           module('ptfApp').
           component('estaciones', {
             //Nota: la url de éste template es relativa a index.html
             templateUrl: 'lista-estaciones.template.html',
             controller: ['Estacion', function EstacionesController(Estacion) {
                 this.estaciones = Estacion.estaciones;
             }]
         });

## Servidor local

 Si estás viendo la página `index.html` desde el navegador sin usar un servidor http local, seguro no va a funcionar. Esto es porque con el template en su propio archivo, el componente hace una llamada a la url para cargarlo (en lugar de tenerlo ya incorporado), pero falla por restricciones de seguridad del navegador, seguramente mostrando en consola un mensaje como éste:

    XMLHttpRequest cannot load file:///ruta/al/proyecto/public/html/lista-estaciones.template.html. Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https, chrome-extension-resource.

 Para que funcione correctamente, hay que tener un servidor http corriendo, sirviendo la ruta del proyecto. Esto no es para nada difícil y cualquier servidor http sirve (Apache, Python, NodeJS entre otros ofrecen éste tipo de servidores). Por ejemplo, el de NodeJS (`http-server`) puede ser usado así:

 Instalación (asumiendo que NodeJS ya está instalado)
    npm install http-server -g

 Ejecución
    http-server /ruta/del/proyecto/public/html

 Con ésto ya podemos acceder a http://127.0.0.1:8080 para poder ver nuestra aplicación funcionando.

## Un poco de estilo, por favor

 Al iniciar el tutorial agregamos Bootstrap, pero todavía no lo usamos. Vamos a darle a nuestra aplicación un poco de estilo antes de continuar.
 Vamos a mejorar la vista agregando un encabezado, un panel, la grilla responsive de Bootstrap y algunas otras cosas a los templates, que van a quedar así:

 `public/html/index.html` (sólo el `body` sin las librerías por claridad)

     <body>
         <div class="page-header">
             <h1>Pedalear Trae Felicidad <small>un tutorial de PTF sobre AngularJS 1.x</small></h1>
         </div>
         <div class="container-fluid">
             <div class="row">
                 <div class="col-xs-12">
                     <div class="panel panel-primary">
                         <div class="panel-heading">Lista de estaciones de bicicletas</div>
                         <div class="panel-body">
                             <estaciones></estaciones>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </body>

 `public/html/lista-estaciones.template.html`
 <ul class="list-group">
     <li ng-repeat="estacion in $ctrl.estaciones" class="list-group-item">
         <h4 class="list-group-item-heading">
             {{estacion.nombre}}
             <small>ID: {{estacion.id}}</small>
         </h4>
         <p>
             <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
             Bicicletas disponibles <span class="badge">{{estacion.bicicletas_disponibles}}</span>
         </p>
         <p>
             <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
             Anclajes disponibles <span class="badge">{{estacion.anclajes_disponibles}}</span>
         </p>
         <p>
             <span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
             {{estacion.ubicacion}}
         </p>
     </li>
 </ul>
