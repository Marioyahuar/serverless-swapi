const PeopleRepository = require("./repositories/peopleRepository");
const StarWarsService = require("./services/starWarsService");

const peopleRepository = new PeopleRepository();
const starWarsService = new StarWarsService();

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello, world!",
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.create = async (event) => {
  const data = JSON.parse(event.body);

  try {
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

module.exports.list = async () => {
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

module.exports.starWars = async (event) => {
  try {
    console.log("event", event);
    const starWarsData = await starWarsService.getStarWarsData(event);
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
