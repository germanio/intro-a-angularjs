# Introducción a AngularJS 1.x

## Qué es AngularJS?
 AngularJS (también conocido como "Angular" o "Angular.js"), es un framework JavaScript de código abierto, creado y mantenido por Google, cuyo objetivo es aumentar las aplicaciones basadas en navegador con capacidad de Modelo Vista Controlador (MVC ó Model View Controller), en un esfuerzo para hacer que el desarrollo y las pruebas sean más fáciles.

 Éste framework lee el HTML de las distintas vistas, que contienen atributos y etiquetas personalizados, uniendo las piezas de entrada o salida de la página a un modelo representado por las variables estándar de JavaScript. Los valores de las variables de JavaScript se pueden configurar manualmente, o recuperados de los recursos JSON estáticos o dinámicos.

 Angular sigue el patrón MVVM (Model View View-Model) de ingeniería de software y alienta la articulación flexible entre la presentación, datos y componentes lógicos. Con el uso de la inyección de dependencias, Angular lleva servicios tradicionales del lado del servidor, tales como controladores dependientes de la vista, a las aplicaciones web del lado del cliente. En consecuencia, gran parte de la carga en el backend se reduce, lo que conlleva a aplicaciones web mucho más ligeras.

## Para qué sirve?
 Se utiliza para desarrollar aplicaciones web de una sola página (SPI ó Single Page Applications). En donde el usuario interactúa con la aplicación pero la página nunca se refresca, sino que la información es pedida al servidor remoto, procesada y mostrada sin abandonar la página principal.
 También se lo puede usar para desarrollar juegos, como [2048](https://www.ng-newsletter.com/posts/building-2048-in-angularjs.html) o el conocido [buscaminas](http://www.simplygoodcode.com/2014/04/angularjs-game-programming-making-minesweeper/).

## De qué trata el tutorial?
 Vamos a desarrollar desde cero una aplicación que nos muestre información sobre las estaciones de Ecobici con las siguientes características:

- Usar los datos abiertos del Gobierno de la Ciudad de Buenos Aires para traer información actualizada de las estaciones
- Lista de estaciones, que puede filtrarse y ordenarse
- Las tres estaciones más cercanas a una posición dada por latitud y longitud
- Mostrar las estaciones en un mapa
- Guardar las estaciones favoritas del usuario en el navegador

### Conocimientos previos
 En este tutorial se asume que ya se tiene conocimiento sobre las siguientes tecnologías:

- HTML (estructura de una página web, etiquetas, formularios, cómo agregar y usar una hoja de estilos, cómo agregar y usar una librería Javascript)
- CSS (estructura de una hoja de estilos, selectores, clases)
- Javascript (variables, tipos de datos, estructuras de control, funciones, objetos, uso de librerías de terceros)
- Formatos XML y JSON

### Contenidos

1. [Instalación](./docs/instalacion.html)
2. [Hola mundo!](./docs/hola-mundo.html) (Estructura inicial)
3. [Lista estática de estaciones](./docs/lista-estatica-estaciones.html) (_Views_, _Models_ y _Controllers_)
4. [Mejoras a la aplicación](./docs/mejoras.html) (_Components_, _Services_ e inyección de dependencias)
5. [Ver detalles de una estación](./docs/detalles-estacion.html) (Multiples _Views_ y uso de _ngRoute_)
6. [Filtramos y ordenamos las estaciones](./docs/filtros-y-orden.html) (_Filters_ y data binding)
7. [Las estaciones más cercanas](./docs/estaciones-cercanas.html) (filtros a medida e _Event Handlers_)
8. [Mis estaciones favoritas](./docs/estaciones-favoritas.html) (Persistencia en el navegador y librerías de terceros - 1ra parte)
9. [Ahora usemos datos reales](./docs/datos-reales.html) (_$http_ y librerías de terceros - 2da parte)
10. [Más visual, mostremos las estaciones en un mapa](./docs/mapa.html) (librerías de terceros - 3ra parte e introducción a directivas)

## Referencias

- Qué se Angular: https://es.wikipedia.org/wiki/AngularJS
- Tutorial oficial de AngularJS 1.x: https://docs.angularjs.org/tutorial
- API Ecobici: https://recursos-data.buenosaires.gob.ar/ckan2/ecobici/estado-ecobici.xml
- XML2JSON: https://www.npmjs.com/package/xml2json
- ngStorage: https://github.com/gsklee/ngStorage
- Leaflet: http://tombatossals.github.io/angular-leaflet-directive/#!/examples/marker
