# Filtros y ordenamiento de las estaciones

 Ya tenemos nuestra lista de estaciones que vienen de nuestro servidor (en el archivo `estaciones.json`), y que nos muestra los detalles al hacer click en cada una.
 En éste capítulo vamos a trabajar con la lista completa, para poder mostrar mejor el valor que agregan las funcionalidades que vamos a desarrollar a continuación.
 Nota: La fuente original de las estaciones viene del GCBA y está en formato XML. Por simplicidad, nosotros la convertimos a JSON y la tenemos en un archivo en nuestro servidor, pero bien podríamos tenerla en una base de datos o pedirla desde nuestro servidor a la fuente original. No la usamos directamente porque por seguridad el navegador no lo permite (CORS).

## Paso 1: Filtro de texto para búsquedas

 Si queremos buscar por texto y listar sólo aquellas estaciones que cumplen con ciertas palabras, AngularJS ofrece una funcionalidad muy potente: los filtros de ngRepeat.
 Para implementarlo, especificamos un filtro en ngRepeat así en el template de la lista de estaciones:

    ng-repeat="estacion in $ctrl.estaciones | filter: $ctrl.busqueda"

 Y después agregamos en el template un input html asociado al modelo `$ctrl.busqueda` del componente.

    <div class="input-group" style="padding-bottom: 9px; border-bottom: 1px solid #eee; margin-bottom: 9px;">
        <span class="input-group-addon">
            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
        </span>
        <input ng-model="$ctrl.busqueda" type="text" class="form-control" placeholder="Buscar...">
    </div>

 Entonces, cada vez que el usuario modifique el contenido del input, se va a recorrer la lista de estaciones y el filtro sólo va a dejar aquellas que tengan un texto que cumpla con dicho contenido. Esto hace que la búsqueda y filtrado sea muy fácil de hacer.

## Paso 2:
