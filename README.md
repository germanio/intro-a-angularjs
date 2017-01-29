# Introducción a AngularJS 1.x

## Qué es AngularJS?

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

1. Instalación
2. Hola mundo! (Estructura inicial)
3. Lista estática de estaciones (_Views_, _Models_ y _Controllers_)
4. Mejoras a la aplicación (_Components_, _Services_ e inyección de dependencias)
5. Ver detalles de una estación (Multiples _Views_ y uso de _ngRoute_)
6. Filtramos y ordenamos las estaciones (_Filters_ y data binding)
7. Las estaciones más cercanas (filtros a medida e _Event Handlers_)
8. Mis estaciones favoritas (Persistencia en el navegador y librerías de terceros - 1ra parte)
9. Ahora usemos datos reales (_$http_ y librerías de terceros - 2da parte)
10. Más visual, mostremos las estaciones en un mapa (librerías de terceros - 3ra parte e introducción a directivas)

## Referencias

- Tutorial oficial de AngularJS 1.x: https://docs.angularjs.org/tutorial
- API Ecobici: https://recursos-data.buenosaires.gob.ar/ckan2/ecobici/estado-ecobici.xml
- XML2JSON: https://www.npmjs.com/package/xml2json
- ngStorage: https://github.com/gsklee/ngStorage
- Leaflet: http://tombatossals.github.io/angular-leaflet-directive/#!/examples/marker
