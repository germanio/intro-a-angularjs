# Ver detalles de una estación

## Vistas múltiples

 Hasta ahora sólo tenemos una lista de estaciones, donde mostramos todos los datos que tenemos.
 Cuantos más datos necesitemos agregar, más complicada se verá la lista. Estaría buenísimo poder mostrar una lista con ciertos datos básicos, y después poder mostrar el detalle de cada estación si el usuario lo pide. AngularJS provee una solución para ésto.

## El módulo `ngRoute`

 Con el módulo `ngRoute` vamos a hacer dos cosas:

1. cuando el usuario navega a `/index.html` va a ser dirigido a `/index.html#!/estaciones` y se le va a mostrar la lista de estaciones con datos básicos
1. cuando el usuario haga click en una estación de la lista, la URL cambia a `/index.html#!/estaciones/<id>` donde `<id>` es el id de la estación seleccionada, y se le va a mostrar el detalle de la estación con todos los datos que ésta tiene.

 Para poder usar `ngRoute` primero tenemos que referenciarlo en el html, agregando justo debajo de la referencia a la librería de AngularJS:

    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-route.js"></script>
