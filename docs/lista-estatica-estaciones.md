# Lista estática de estaciones

 En el capítulo anterior armamos una aplicación básica con AngularJS y vimos cómo se integra Angular a nuestro html (view).
 Pero todavía no estamos mostrando nada sobre las estaciones de bicicletas, ni conocemos las partes fundamentales de éste framework.
 Así que en éste capítulo vamos a empezar a profundizar ambas.

## Paso 1: las estaciones (el modelo)

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
