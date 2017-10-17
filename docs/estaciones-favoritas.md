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

 Si, se ve horrible. Pero para eso está el próximo paso. :)
 Probemos si todo funciona. Ahhh y no nos olvidemos de agregar el link al archivo del nuevo filtro en index.html!

```html
    <script src="../app/favoritos.filter.js"></script>
```

## Paso 3: Algunas mejoras

## Ahora te toca a vos!