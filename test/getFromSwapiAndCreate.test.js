const { getFromSwapiAndCreate } = require("../src/handler");

describe("starWars", () => {
  it("should return a 200 status code and a success message", async () => {
    const event = {
      pathParameters: { id: "1" },
    }; // Puedes ajustar el evento y el parámetro según sea necesario
    const response = await getFromSwapiAndCreate(event);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe(
      "Datos de Star Wars almacenados correctamente"
    );
  });

  it("should return a 500 status code and an error message when retrieval fails", async () => {
    const event = {
      pathParameters: { id: null },
    }; // Puedes ajustar el evento y el parámetro según sea necesario
    const response = await getFromSwapiAndCreate(event);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).error).toBe(
      "No se pudo obtener la información de Star Wars"
    );
  });
});
