# Instalación

## Estructura de carpetas

 Necesitamos una carpeta para contener la aplicación. Llamemos a la aplicación _Pedalear Trae Felicidad_ (PTF ;)), como vamos a usar Angularjs, pongámosle a la carpeta "raíz" el nombre `ptf-angular`.
 Ahora, vamos a crear la siguiente estructura de carpetas, que nos van a servir para organizar los archivos de nuestra aplicación:

    ptf-angular
        --> public
            --> html
            --> css
            --> img
            --> app

 Dentro de `public` vamos a guardar todos los archivos que nuestra aplicación va a usar, mientras que la carpeta raíz va a contener archivos más bien relacionados al proyecto.
 En `html` van a ir las páginas Html, en `css` las hojas de estilos, en `img` las imágenes y finalmente en `app` vamos a guardar el código Javascript con Angularjs.

## Acceso a las librerías

 Nuestra aplicación va a hacer uso de distintas librerías, la primera de ellas justamente Angularjs.
 Para evitar tener que bajar cada una de ellas, las vamos a referenciar desde CDNs (Content Delivery Networks, Redes de Distribución de Contenidos) donde estén alojadas.
 Por ejemplo, para el caso de AngularJS, podemos tener:

 `<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.js"></script>`

## Cómo probar la aplicación

 Simplemente hay que abrir el archivo `index.html` (que todavía no creamos) con el navegador preferido, para que éste muestre la aplicación.
