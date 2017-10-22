# Las estaciones favoritas

 Si utilizamos las bicicletas con frecuencia y hacemos más o menos los mismos recorridos, seguro conocemos *esa* estación que tiene una bicicleta disponible cuando la necesitamos, o qué estación tiene espacio libre cuando llegamos a destino.
 
 Es por eso que poder marcar dichas estaciones y después poder filtrarlas puede ser una funcionalidad muy útil.
 
## Paso 1: Marcar una estación como favorita

 Para ésto, vamos a agregar un botón a cada tarjeta que representa la estación, asociado a una función del controlador.
 
```html
    <button type="button" class="btn btn-default" ng-click="$ctrl.favorita(estacion.EstacionId)">Favorita</button>
```
 
 La función `favorita()` recibe el `id` de la estación por parámetro, para que con él podamos encontrar la estación y marcarla como favorita.
 
 La función en el controlador sería así:
 
```javascript
    self.favorita = function(id) {
        self.estaciones.find(function(estacion) {
            if (estacion.EstacionId === id) {
                //no fue definido el atributo de la estación
                if (estacion.favorita === undefined) {
                    estacion.favorita = true;
                } else {
                    // si ya fue definido, simplemente cambiamos su valor por el contrario
                    estacion.favorita = !estacion.favorita;
                }
            }
        });
    };

```
 
 Para que podamos llamar a la función desde el controlador, necesitamos que en el template tenga una referencia a `$ctrl`, mientras que en el controlador, ésta función debe ser declarada con `self.favorita`.
 
 Simplemente usamos la lista de estaciones, con `find()` y le pasamos una función que `find()` aplica a cada elemento de la lista. Cuando la estación es la correcta (mismo ID), verificamos si `estacion.favorita` existe (porque no viene en los datos originales), y dependiendo del resultado de esa verificación, seteamos el valor correspondiente.
 
 Porqué hacemos ésto? (pista: revisá los estados posibles de ese atributo para entender porqué hacemos ésto así)

```javascript
    estacion.favorita = !estacion.favorita
```
 
 En éste paso, nos queda mostrar en la tarjeta si es favorita o no. Para eso, simplemente agregamos algo para mostrar dicho atributo:
 
```html
    <p><small>Estación favorita? {{estacion.favorita}}</small></p>
```

 Si, se ve bastante feo, pero después lo vamos a mejorar un poco más. Por ahora hagamos que funcione.

## Paso 2: Filtrar por favoritas

 En éste paso, tenemos que crear un filtro como hicimos en los capítulos anteriores, que se aplique sobre el nuevo atributo para marcar las estaciones favoritas. También tenemos que permitirle al usuario seleccionar si aplicar el filtro o no.
 
### El filtro

 Es muy simple, sólo hay que validar si el usuario habilitó el filtro con `$ctrl.filtrarFavoritos` y si es así, sólo dejar aquellas estaciones que tienen el atributo `estacion.favorita` en `true`:
 
```javascript
    angular.
  module('ptfApp').
  filter('favoritos', function() {
    return function(estaciones, activado) {
        //si no está activado, devolver toda la lista
        if (!activado) return estaciones;
        
        var estacionesFiltradas = [];
        
        //recorremos las estaciones para ver cual se queda y cual se va
        angular.forEach(estaciones, function(estacion) {
            if (estacion.favorita) {
                estacionesFiltradas.push(estacion);
            }
        });
        return estacionesFiltradas;
    };
  });

```

### Aplicamos el filtro
 
 Agregamos el filtro en el ngRepeat, al final:
 
```javascript
    ... | favoritos:$ctrl.filtrarFavoritos
```

### El botón para activar el filtro

 Sólo tenemos que agregar un botón con un binding a `$ctrl.filtrarFavoritos`:
 
```html

    <div class="input-group">
        <span class="input-group-addon">
            Filtrar favoritos? <input type="checkbox" aria-label="..." ng-model="$ctrl.filtrarFavoritos">
        </span>
    </div>
```

 Si, se ve horrible. Pero lo vamos a mejorar sobre el final del capítulo. :)
 Primero probemos si todo funciona. Ahhh y no nos olvidemos de agregar el link al archivo del nuevo filtro en index.html!

```html
    <script src="../app/favoritos.filter.js"></script>
```

## Paso 3: Esto hay que guardarlo

 Si no se notó hasta ahora, nuestra aplicación siempre vuelve a iniciar reseteada, o sea, no guarda información de lo que hizo el usuario.
 Pero en éste caso, la idea de tener estaciones favoritas, es poder "guardarlas" de alguna forma para poder consultarlas la próxima vez.
 Así que necesitamos algo en nuestra aplicación que nos permita guardarlas.
 
 Para eso vamos a usar una librería de terceros, llamada [ngStorage](https://github.com/gsklee/ngStorage), que nos va a permitir guardar información en el navegador.

### Instalación

 Agregamos la etiqueta `script` con la referencia a la librería en nuestro `index.html`:
 
```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.10/ngStorage.min.js"></script>
```

### Integración a nuestra aplicación

 Una vez instalada, necesitamos que nuestra aplicación pueda hacer uso de ella. Para eso hay que integrarla así, en `app.js`:

```javascript
    // Definimos el módulo para la aplicación
    var ptfApp = angular.module('ptfApp', ['ngRoute', 'ngStorage']);
```

 Y agregar el servicio en nuestro controlador:
 
```javascript
    controller: ['Estacion', '$localStorage', function EstacionesController(Estacion, $localStorage) {
        var self = this;
        ...
        self.storage = $localStorage;
        ...
```

 Vamos a usar un array en el localStorage, donde guardemos los Ids de las estaciones marcadas. El primer paso será inicializarlo, si no estaba inicializado de una sesión anterior, porque puede tener los datos ya guardados de las estaciones favoritas.
 
```javascript
    //inicializo la lista de estaciones favoritas en el storage
    if (self.storage.favoritas === undefined) {
        self.storage.favoritas = [];
    }
```

### Ahora si, guardemos los datos!

 Cada vez que marquemos una estación como favorita, vamos a agregar el Id de dicha estación en un array dentro del localStorage.
 De la misma forma, cada vez que quitemos a una estación la marca de favorita, tenemos que quitarla de dicho array.
 
 Para eso tenemos que modificar la función que maneja los favoritos de las estaciones, agregando la lógica para guardar o quitar del storage una vez que la estación fue modificada:
 
```javascript
    if (estacion.favorita) {
        //la agregamos a favoritas
        self.storage.favoritas.push(estacion.EstacionId);
    } else {
        //la removemos de favoritas
        self.storage.favoritas = self.storage.favoritas.filter(function(fav) {
            return fav != estacion.EstacionId;
        });
    }
```

 Para ver cómo va cambiando el contenido del array cuando agregamos o quitamos estaciones de favoritas, podemos poner un `div` con el binding del storage en cualquier parte:
 
```html
    <div>Favoritas: {{$ctrl.storage.favoritas}}</div>
```

### Y nos queda recuperarlos cuando se inicia la aplicación

 Esto se logra agregando el atributo `estacion.favorita = true` en cada estación de la lista de estaciones si el Id está en el array del localStorage.
 
 Acá hay que tener cuidado, porque la lógica que haga eso tiene que funcionar una vez que la lista de estaciones esté cargada. Esto no pasa inmediatamente al inicio, sino cuando el servicio Estacion llama a la función callback en `Estacion.obtenerTodos(callback)`.
 
 Agregamos lo siguiente a `Estacion.obtenerTodos()`, incluyendo la lógica para inicializar el storage si éste no existe:
 
```javascript
    //inicializo la lista de estaciones favoritas en el storage
    if (self.storage.favoritas === undefined) {
        self.storage.favoritas = [];
    } else {
        self.estaciones.filter(function(estacion) {
            return self.storage.favoritas.indexOf(estacion.EstacionId) > -1;
        }).forEach(function(estacion) {
            estacion.favorita = true;
        });
    }
```

## Paso 4: Algunas mejoras de la interfaz

 Ahora que la funcionalidad está andando completamente. Vamos a aplicar algunos cambios en la interfaz para mejorar la experiencia del usuario.

### Búsqueda y filtros al costado

### Ordenamiento arriba

### Mensaje si no hay resultados

### Iconos en lugar de texto

### Fav en detalles también

## Ahora te toca a vos!

1. Ejercicio: Ahora que sabemos cómo guardar cosas en el browser, guardemos el estado de los filtros, para que la siguiente vez que el usuario use la aplicación, encuentre todo como lo dejó. Nota: ésto también implica que la lista tiene que tener los filtros aplicados!