# Hola mundo!

 En éste capítulo vamos a crear nuestra primera aplicación con AngularJS, super básica, que nos va a dar la estructura inicial para poder desarrollar Pedalear Trae Felicidad (PTF).
 El código de éste capítulo se puede ver en el branch `capitulo/hola-mundo` [acá](https://github.com/germanio/intro-a-angularjs/tree/capitulo/hola-mundo).

## Paso 1: la vista

 Vamos a crear la vista, o sea el HTML, y le vamos a agregar la librería de Angular y la de Bootstrap (nos gusta Bootstrap, Bootstrap es bueno).
 El Html inicial va a quedar así:

    public/html/index.html

    <!doctype html>
    <html lang="es">
        <head>
            <title>Pedalear Trae Felicidad</title>
            <meta charset="utf-8">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
        </head>
        <body>
            <h1>Hola Mundo! <span class="glyphicon glyphicon-sunglasses" aria-hidden="true"></span></h1>

            <!-- Librerías acá -->
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.js"></script>
        </body>
    </html>

 Hasta acá todo bien, pero no es una aplicación Angular todavía. Sólo está mostrando un texto y un glyphicon de Bootstrap, pero nos sirve para ver que las librerías están en su lugar.

## Paso 2: integración con AngularJS

 Hay que agregar un atributo al html para que Angular interprete que ahí hay una aplicación. Ese atributo es `ng-app`, que representa una _directiva_ de Angular que es la encargada de indicar dónde comienza la aplicación.

    <html lang="es" ng-app>

 Ahora podemos agregar un _binding_ para ver si nuestro "Hola Mundo" de verdad funciona.

{% raw %}
    <body>
        <h1>Hola {{ 'Mundo' + '!' }}</h1>
    </body>
{% endraw %}

 Esto demuestra dos funcionalidades principales de Angular para armar las vistas (templates):

{% raw %}
 - Un _binding_, que se escribe con doble llave: `{{ }}`
 - Una expresión en Javascript, como la concatenación de dos strings: `'Mundo' + '!'`
{% endraw %}

 El binding le dice a Angular que debe evaluar la expresión que contiene y usar el resultado de la misma para reemplazar dicho binding en el DOM de la página.
 Es como decir "Acá va el resultado de ésta expresión, calculalo y reemplazalo".
 Lo interesante de ésto es que el reemplazo se hace cada vez que el resultado de la expresión cambia, por lo tanto resulta en una forma muy eficiente de actualizar la vista sin agregar lógica adicional.

 El resultado que debería aparecer en pantalla es:

    Hola Mundo!

## Paso 3: entendiendo qué está pasando

 La directiva `ngApp` automáticamente inicia la aplicación Angular. Hay 3 cosas que suceden durante el inicio que está bueno tener en cuenta:

 1. Se crea un elemento conocido como `injector` que va a ser el encargado de la inyección de dependencias de la aplicación (básicamente, se encarga de cablear los distintos elementos de la aplicación antes de que arranque)
 1. El injector entonces crea el `root scope`, otro elemento que va a servir de contexto para nuestro `Modelo` en la aplicación. El Html es la vista, el `scope` es el modelo.
 1. Finalmente, Angular revisa todo el html comprendido entre las etiquetas que tienen la directiva, buscando directivas y bindings para compilar y así completar el inicio de la aplicación.

 Una vez que la aplicación inició, se queda escuchando eventos del navegador, como clicks del mouse, teclas que se presionan o mensajes de servidores remotos. Si dichos eventos cambian el modelo, Angular se encarga de refrescar la vista usando los bindings.

## Cómo quedó?

 Esta es una versión simplificada que jsfiddle nos muestra en vivo, corriendo en nuestra propia página. Decimos simplificada porque quitamos el `head` y las referencias a las librerías del `html`.

<script async src="//jsfiddle.net/germanio/4y93nzxh/2/embed/html,result/"> </script>

## Paso 4: ahora te toca a vos!

 Probá de agregar un nuevo binding con la expresión que vos quieras. Por ejemplo, la suma de dos números:
{% raw %}
    <p>La expresión 5 + 3 es igual a {{ 5 + 3 }}</p>
{% endraw %}
