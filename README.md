# Introducción a AngularJS 1.x

## Qué es AngularJS?
 AngularJS (también conocido como "Angular" o "Angular.js"), es un framework JavaScript de código abierto, creado y mantenido por Google, cuyo objetivo es aumentar las aplicaciones basadas en navegador con capacidad de Modelo Vista Controlador (MVC ó Model View Controller), en un esfuerzo para hacer que el desarrollo y las pruebas sean más fáciles.

 Éste framework lee el HTML de las distintas vistas, que contienen atributos y etiquetas personalizados, uniendo las piezas de entrada o salida de la página a un modelo representado por las variables estándar de JavaScript. Los valores de las variables de JavaScript se pueden configurar manualmente, o recuperados de los recursos JSON estáticos o dinámicos.

 Angular sigue el patrón MVVM (Model View View-Model) de ingeniería de software y alienta la articulación flexible entre la presentación, datos y componentes lógicos. Con el uso de la inyección de dependencias, Angular lleva servicios tradicionales del lado del servidor, tales como controladores dependientes de la vista, a las aplicaciones web del lado del cliente. En consecuencia, gran parte de la carga en el backend se reduce, lo que conlleva a aplicaciones web mucho más ligeras.

## Para qué sirve?
 Se utiliza para desarrollar aplicaciones web de una sola página (SPI ó Single Page Applications). En donde el usuario interactúa con la aplicación pero la página nunca se refresca, sino que la información es pedida al servidor remoto, procesada y mostrada sin abandonar la página principal.
 También se lo puede usar para desarrollar juegos, como [2048](https://www.ng-newsletter.com/posts/building-2048-in-angularjs.html) o el conocido [buscaminas](http://www.simplygoodcode.com/2014/04/angularjs-game-programming-making-minesweeper/).

## De qué trata el tutorial?

 Vamos a desarrollar desde cero una aplicación que vamos a llamar Pedalear Trae Felicidad (PTF!) que nos muestre información sobre las estaciones de Ecobici, utilizando datos reales obtenidos de los datos abiertos del Gobierno de la Ciudad de Buenos Aires.
 En cada capítulo vamos a tener una versión andando de la aplicación, donde le vamos a ir agregando funcionalidades nuevas y explicando conceptos de cómo funciona AngularJS y para qué.
 Como en cada capítulo vamos a tener una versión distinta de nuestra aplicación, el código de cada uno está en un [branch distinto](https://github.com/germanio/intro-a-angularjs/branches) para que puedan bajarlo y jugar con él.

 Por simplicidad, la aplicación va a constar sólo del _frontend_ (código que se usa del lado del usuario), para que sea más fácil de entender y desarrollar, sin tener que meternos en temas como Bases de Datos o lenguajes y herramientas para desarrollo del _backend_ (código que se usa del lado del servidor, donde usualmente se almacenan y procesan datos y se interactúa con otros sistemas).

### Conocimientos previos
 En este tutorial se asume que ya se tiene conocimiento sobre las siguientes tecnologías:

- HTML (estructura de una página web, etiquetas, formularios, cómo agregar y usar una hoja de estilos, cómo agregar y usar una librería Javascript)
- CSS (estructura de una hoja de estilos, selectores, clases)
- Javascript (variables, tipos de datos, estructuras de control, funciones, objetos, uso de librerías de terceros)
- Formatos XML y JSON
- Tener instalado un servidor Http (nosotros vamos a usar uno que provee NodeJS)

### Contenidos

1. [Instalación](./docs/instalacion.html)
1. [Hola mundo!](./docs/hola-mundo.html) (Estructura inicial)
1. [Lista estática de estaciones](./docs/lista-estatica-estaciones.html) (_Views_, _Models_ y _Controllers_)
1. [Mejoras a la aplicación](./docs/mejoras.html) (_Components_, _Services_ e inyección de dependencias)
1. [Más Mejoras](./docs/mejoras-ui.html) (Repaso, modularización de templates y servidor web local)
1. [Ver detalles de una estación](./docs/detalles-estacion.html) (Multiples _Views_ y uso de _ngRoute_)
1. [Ahora usemos datos reales](./docs/datos-reales.html) (Uso del servicio _$http_)
1. [Conclusión](./docs/conclusion.html)

## Referencias

- Qué es Angular: https://es.wikipedia.org/wiki/AngularJS
- Tutorial oficial de AngularJS 1.x: https://docs.angularjs.org/tutorial
- Bootstrap: http://getbootstrap.com/getting-started/
- API Ecobici: https://recursos-data.buenosaires.gob.ar/ckan2/ecobici/estado-ecobici.xml
