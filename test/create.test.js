const { create } = require("../src/handler");
const mock = require("../src/utils/mock.json");

describe("create", () => {
  it("should return a 200 status code and a success message", async () => {
    const event = {
      body: mock.postBody,
    };
    const response = await create(event);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe(
      "Elemento creado correctamente"
    );
  });

  it("should return a 500 status code and an error message when creation fails", async () => {
    const event = {}; // Puedes ajustar el evento y el cuerpo según sea necesario
    const response = await create(event);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).error).toBe(
      "No se pudo crear el elemento"
    );
  });
});
