const AWS = require("aws-sdk");
const axios = require("axios");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = "people-from-starwars"; // Reemplaza con el nombre de tu tabla en DynamoDB

const mapAttributeNames = (data) => {
  // Mapeo de los nombres de atributos al español
  const mappedData = {
    nombre: data.name,
    anio_nacimiento: data.birth_year,
    color_ojos: data.eye_color,
    peliculas: data.films,
    genero: data.gender,
    color_cabello: data.hair_color,
    altura: data.height,
    planeta_origen: data.homeworld,
    masa: data.mass,
    color_piel: data.skin_color,
    creado: data.created,
    editado: data.edited,
    especies: data.species,
    naves_estelares: data.starships,
    url: data.url,
    vehiculos: data.vehicles,
  };

  return mappedData;
};

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "PLEASE WORK!",
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.create = async (event) => {
  const data = JSON.parse(event.body);

  // Mapeo de los atributos del modelo al español
  const mappedData = mapAttributeNames(data);

  const params = {
    TableName: tableName,
    Item: mappedData,
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Elemento creado correctamente" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No se pudo crear el elemento" }),
    };
  }
};

module.exports.list = async () => {
  const params = {
    TableName: tableName,
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    console.log("RESULT: ", result);
    const items = result.Items;
    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "No se pudo obtener la lista de elementos",
      }),
    };
  }
};

module.exports.starWars = async () => {
  try {
    const response = await axios.get("https://swapi.py4e.com/api/people/1/");
    const starWarsData = response.data;
    // Mapeo de los nombres de atributos al español
    const mappedStarWarsData = mapAttributeNames(starWarsData);

    // Almacenar los datos de Star Wars en DynamoDB

    const params = {
      TableName: tableName,
      Item: mappedStarWarsData,
    };

    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Datos de Star Wars almacenados correctamente",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "No se pudo obtener la información de Star Wars",
      }),
    };
  }
};

//module.exports.api = serverless(module.exports);
