# Lista estática de estaciones

 En el [capítulo anterior](./hola-mundo.html) armamos una aplicación básica con AngularJS y vimos cómo se integra Angular a nuestro html (view).
 Pero todavía no estamos mostrando nada sobre las estaciones de bicicletas, ni conocemos las partes fundamentales de éste framework.
 Así que en éste capítulo vamos a empezar a profundizar ambas.

## Paso 1: los datos de las estaciones (el modelo)

 El objetivo de éste paso es definir la estructura de los datos que vamos a usar en la aplicación.
 Como vamos a sacar los datos de las estaciones del sitio con datos abiertos que expone el GCBA [acá](https://recursos-data.buenosaires.gob.ar/ckan2/ecobici/estado-ecobici.xml), lo más fácil es
 basar nuestro modelo de datos en dicha estructura.
 Al abrir ese link, vemos un xml de éste estilo:

    <?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope
     	xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
     	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     	xmlns:xsd="http://www.w3.org/2001/XMLSchema">
     	<soap:Body>
     		<BicicletasWSResponse
     			xmlns="http://tempuri.org/">
     			<BicicletasWSResult>
     				<Bicicletas
     					xmlns="http://bicis.buenosaires.gob.ar/ServiceBicycle.asmx">
     					<Estaciones>
     						<Estacion>
     							<EstacionId>1</EstacionId>
     							<EstacionNombre>Facultad de Derecho</EstacionNombre>
     							<BicicletaDisponibles>9</BicicletaDisponibles>
     							<EstacionDisponible>SI</EstacionDisponible>
     							<Latitud>-34.583271</Latitud>
     							<Longitud>-58.392579</Longitud>
     							<Numero>2260</Numero>
     							<Lugar>Figueroa Alcorta y Pueyrredón</Lugar>
     							<Piso></Piso>
     							<AnclajesTotales>28</AnclajesTotales>
     							<AnclajesDisponibles>19</AnclajesDisponibles>
     						</Estacion>

     						....

     					</Estaciones>
     					<TiempoRespuesta>0,625 segundos</TiempoRespuesta>
     				</Bicicletas>
     			</BicicletasWSResult>
     		</BicicletasWSResponse>
     	</soap:Body>
    </soap:Envelope>

 La parte que nos interesa es la estructura que tiene el xml para cada estación,
 porque parte de eso es lo que vamos a mostrar al usuario:

    <Estacion>
         <EstacionId>1</EstacionId>
         <EstacionNombre>Facultad de Derecho</EstacionNombre>
         <BicicletaDisponibles>9</BicicletaDisponibles>
         <EstacionDisponible>SI</EstacionDisponible>
         <Latitud>-34.583271</Latitud>
         <Longitud>-58.392579</Longitud>
         <Numero>2260</Numero>
         <Lugar>Figueroa Alcorta y Pueyrredón</Lugar>
         <Piso></Piso>
         <AnclajesTotales>28</AnclajesTotales>
         <AnclajesDisponibles>19</AnclajesDisponibles>
    </Estacion>

 Sin embargo, como hay mucho que explicar sobre AngularJS todavía,
 por ahora no vamos a traer dichos datos directamente de ese sitio,
 sino que vamos a _basarnos_ en éstos datos para mostrar información de prueba,
 que nos va a permitir desarrollar más rápido y fácil.

 Definamos, entonces, nuestra lista de estaciones como un Array de Objetos de Javascript:

    var estaciones = [{
         id: '1', //<EstacionId/>
         nombre: 'Facultad de Derecho', //<EstacionNombre/>
         ubicacion: 'Figueroa Alcorta y Pueyrredón', //<Lugar/>
         bicicletas_disponibles: 9, //<BicicletaDisponibles/>
         anclajes_disponibles: 19 //<AnclajesDisponibles/>
     }, {
         id: '2',
         nombre: 'Retiro',
         ubicacion: 'Libertador altura Retiro',
         bicicletas_disponibles: 15,
         anclajes_disponibles: 20
     }];

 Como comentarios tenemos las etiquetas xml originales a las que estamos haciendo referencia.
 Ahora que tenemos definidos los datos de prueba, vamos a ver cómo mostrarlos en la vista
 y cómo manejarlos en nuestra aplicación.

## Paso 2: cómo mostrarlo al usuario (la vista)

 En el html vamos a agregar un par de cosas interesantes:
 Primero, tenemos que ponerle un nombre a la aplicación, ésto no se usa acá sino en el siguiente paso.
 En un despilfarro de creatividad, le vamos a poner `ptfApp`, así que nos va a quedar así:

    <html lang="es" ng-app="ptfApp">

 Después, necesitamos algo como un `while` o un `for` que nos permita mostrar cada objeto de un Array.
 Para eso usamos `ngRepeat`, como parte de una lista sin orden (el `ul` que ven ahí):

{% raw %}
    <ul>
         <li ng-repeat="estacion in estaciones">
             <span>ID: {{estacion.id}}</span>
             <p>Nombre: {{estacion.nombre}}</p>
             <p>Ubicación: {{estacion.ubicacion}}</p>
             <p>Bicicletas disponibles: {{estacion.bicicletas_disponibles}}</p>
             <p>Anclajes disponibles: {{estacion.anclajes_disponibles}}</p>
         </li>
    </ul>
{% endraw %}

 Básicamente, lo que hace `ngRepeat` es repetir la etiqueta donde fue puesto, una vez por cada elemento
 de la lista. En nuestro caso, queremos repetir un `li` por cada estación.

    <li ng-repeat="estacion in estaciones">

 Lo que quiere decir con eso es que `ngRepeat` va a iterar sobre el Array de `estaciones`,
 y en cada iteración podemos usar la variable `estacion` para acceder a los datos del elemento del Array
 que estamos accediendo en cada paso. Ahí podemos usar expresiones `{{ expr }}` para mostrar los datos de `estacion` en la vista.
 El resultado (cuando tengamos todo armado) va a ser el siguiente html:

    <ul>
        <li>
            <span>ID: 1</span>
            <p>Nombre: Facultad de Derecho</p>
            <p>Ubicación: Figueroa Alcorta y Pueyrredón</p>
            <p>Bicicletas disponibles: 9</p>
            <p>Anclajes disponibles: 19</p>
        </li>
        <li>
            <span>ID: 2</span>
            <p>Nombre: Retiro</p>
            <p>Ubicación: Libertador altura Retiro</p>
            <p>Bicicletas disponibles: 15</p>
            <p>Anclajes disponibles: 20</p>
        </li>
    </ul>

 *Nota*: si usan las herramientas del navegador para ver el resultado, van a notar que hay otros atributos en las etiquetas.
 Acá los estoy omitiendo por claridad.

 Hasta acá todo muy lindo, pero todavía no pusimos el Array de estaciones en ninguna parte. Nuestra aplicación todavía no funciona.

## Paso 3: cómo pasar el modelo a la vista (el controlador)

 Con el nombre que ya le pusimos a nuestra aplicación (`ptfApp`) vamos a declararla en el archivo `app/app.js`:

    var ptfApp = angular.module('ptfApp', []);

 O sea, AngularJS al cargarse, define una variable global llamada `angular` que vamos a usar para crear las distintas partes de nuestra aplicación.
 Acá la usamos para inicializar el módulo principal, llamándolo `ptfApp`, y pasándole un Array vacío.
 Ese Array se usa para asignarle otros módulos, propios o de terceros, que no vamos a usar (por ahora).

 Y ahora el controlador, con las estaciones:

    ptfApp.controller('ListaEstacionesController', function ListaEstacionesController($scope) {
        $scope.estaciones = [{
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
        }];
    });

 Acá usamos el módulo recién creado para declarar el controlador con el método `.controller(nombre, funcion)`.
 Le ponemos de nombre `ListaEstacionesController` (como convención, todos los controladores terminan en `-Controller`).
 La función que viene en el segundo parámetro es el constructor del controlador, que siempre recibe un parámetro
 llamado $scope, que es donde cargamos la lógica y datos del mismo.
 Y en ésto reside una de las cosas más interesantes de AngularJS: El $scope es automáticamente mapeado por AngularJS contra la vista, bidireccionalmente, o sea que si el usuario modifica un atributo del scope en la vista, el mismo se ve reflejado en el controller.

 En éste caso, le asignamos las estaciones a un atributo llamado `estaciones`, que es el mismo que va a ser tomado por `ngRepeat`
 para iterar y armar la lista de `<li/>`.

 Pero falta algo, todavía queda decirle a AngularJS en qué parte de la vista debe conectar el controlador.
 Para eso, agregamos la siguiente directiva en el `body` de nuestro html:

    <body ng-controller="ListaEstacionesController">

 La directiva `ngController` le indica a AngularJS a qué controlador debe referenciar en esa etiqueta.
 Una vez referenciado el controlador en una etiqueta html, su `$scope` queda vinculado a dicha etiqueta (y sus hijas), y sus datos y funciones pueden ser llamados usando expresiones o directivas.

## Cómo quedó?

<script async src="//jsfiddle.net/germanio/4y93nzxh/4/embed/js,html,result/"> </script>

## Paso 4: ahora te toca a vos!

 En éste capítulo vimos muchos conceptos importantes y establecimos el esqueleto de nuestra aplicación.
 Ahora es importante fijar esos conocimientos, y nada mejor que hacer algunos ejercicios para lograrlo.

1. Ejercicio: el xml original tiene más datos de los que usamos en nuestro modelo. Elegí dos datos que no estamos usando y agregalos en donde sea necesario para que se muestren al usuario.

1. Ejercicio: cambiá la vista para que las estaciones se muestren en una tabla en lugar de una lista sin orden.

1. Ejercicio: mostrá en la vista el número de estaciones usando desde la vista una función agregada en el controlador.
