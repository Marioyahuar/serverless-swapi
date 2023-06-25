const PeopleRepository = require("./repositories/peopleRepository");
const StarWarsService = require("./services/starWarsService");

const peopleRepository = new PeopleRepository();
const starWarsService = new StarWarsService();

module.exports.create = async (event) => {
  const data = event.body;
  try {
    if (data === null || data === undefined) {
      throw new Error("Data is null");
    }
    await peopleRepository.create(data);
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

module.exports.listFromDB = async () => {
  try {
    const items = await peopleRepository.getAll();
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

module.exports.getFromSwapiAndCreate = async (event) => {
  try {
    const id = event.pathParameters.id;
    const starWarsData = await starWarsService.getStarWarsData(id);
    await peopleRepository.create(starWarsData);
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

module.exports.getFromSwapi = async (event) => {
  try {
    const id = event.pathParameters.id;
    const starWarsData = await starWarsService.getStarWarsData(id);
    return {
      statusCode: 200,
      body: JSON.stringify(starWarsData),
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
