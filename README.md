# serverless-swapi
Este proyecto es una aplicación serverless que utiliza AWS Lambda, API Gateway y DynamoDB para crear y obtener datos de personajes de Star Wars desde el API SWAPI.

## Estructura del proyecto
El proyecto sigue la siguiente estructura de directorios y archivos:

```
serverless-swapi
| ├──   src
| |   ├── config
| |   |    └── config.js
| │   ├── repositories
| │   │   └── peopleRepository.js
| │   ├── services
| │   │   └── starWarsService.js
| │   └── utils
| │       └── dataMapper.js
| │       └── mock.json
| |   └── handler.js
| ├── test
| │   ├── create.test.js
| │   ├── getFromSwapi.test.js
| │   ├── getFromSwapiAndCreate.test.js
| │   └── listFromDB.test.js
├── .env
├── serverless.yml
└── README.md
```

- **src**: Directorio que contiene el código fuente de la aplicación.
- **config**: Directorio que contiene el archivo con las variables básicas (tableName y SWAPIUrl).
- **repositories**: Directorio que contiene el repositorio para interactuar con la base de datos.
- **services**: Directorio que contiene el servicio para obtener datos de SWAPI (Star Wars API).
- **utils**: Directorio que contiene utilidades auxiliares, como el mapeador de datos de inglés a español.
- **test**: Directorio que contiene los casos de prueba para cada función de la aplicación.
- **handler.js**: Archivo que contiene los controladores de las funciones de Lambda.
- **.env**: Archivo de configuración para variables de entorno.
- **serverless.yml**: Archivo de configuración para el despliegue de la aplicación.

## Configuración
Antes de utilizar la aplicación, es necesario configurar las variables de entorno en el archivo .env. Actualmente, se ha configurado la variable NODE_ENV con el valor "test".

## Despliegue
El proyecto se despliega utilizando Serverless Framework. Asegúrate de tener configurado tu entorno de desarrollo con las credenciales de AWS necesarias.
Para desplegar la aplicación, sigue los siguientes pasos:

Instala las dependencias del proyecto ejecutando el siguiente comando:

```
npm install
```
Ejecuta el siguiente comando para desplegar la aplicación:

```
serverless deploy
```
Esto desplegará los recursos necesarios en tu cuenta de AWS y generará las URL para acceder a las diferentes funciones de la aplicación.

## Uso
Una vez desplegada la aplicación, puedes utilizar las siguientes funciones:

- **create**: Crear un elemento. Realiza una solicitud HTTP POST a la URL correspondiente para crear una neuva persona en DynamoDB. Asegúrate de enviar los datos necesarios en el cuerpo de la solicitud.
  - endpoint de prueba: POST - https://3zfnlr6ph9.execute-api.us-east-2.amazonaws.com/dev/crear
- **getFromSwapi:** Obtener una persona desde SWAPI. Realiza una solicitud HTTP GET a la URL correspondiente, especificando el ID del elemento que deseas obtener.
  - endpoint de prueba: GET - https://3zfnlr6ph9.execute-api.us-east-2.amazonaws.com/dev/starwars/{id}
- **getFromSwapiAndCreate:** Obtener una persona desde SWAPI y crear un elemento. Realiza una solicitud HTTP GET a la URL correspondiente, especificando el ID del elemento que deseas obtener. Luego, crea un elemento en DynamoDB con la data recibida.
  - endpoint de prueba: GET - https://3zfnlr6ph9.execute-api.us-east-2.amazonaws.com/dev/starwarsToDB/{id}
- **listFromDB:** Obtener todos los elementos de la base de datos: Realiza una solicitud HTTP GET a la URL correspondiente para obtener la lista de todas las personas almacenados en la base de datos.
  - endpoint de prueba: GET - https://3zfnlr6ph9.execute-api.us-east-2.amazonaws.com/dev/obtener

## Pruebas

Para ejecutar las pruebas de la carpeta test ejecuta el siguiente comando:
```
npm test
````

## Documentación 

Puedes revisar la documentación Swagger en el siguiente link: https://app.swaggerhub.com/apis/MARIOYAHUAR_1/serverless-swapi/1.0.0

