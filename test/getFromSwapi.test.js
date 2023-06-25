const { getFromSwapi } = require("../src/handler");

describe("starWars", () => {
  it("should return a 200 status code and a success message", async () => {
    const event = {
      pathParameters: { id: "1" },
    }; // Puedes ajustar el evento y el parámetro según sea necesario
    const response = await getFromSwapi(event);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("should return a 500 status code and an error message when retrieval fails", async () => {
    const event = {
      pathParameters: {},
    }; // Puedes ajustar el evento y el parámetro según sea necesario
    const response = await getFromSwapi(event);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).error).toBe(
      "No se pudo obtener la información de Star Wars"
    );
  });
});
