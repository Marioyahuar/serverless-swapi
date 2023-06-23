const { list } = require("../src/handler");

describe("list", () => {
  it("should return a 200 status code and a list of items", async () => {
    const response = await list();

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(JSON.parse(response.body))).toBe(true);
  });

  it("should return a 500 status code and an error message when retrieval fails", async () => {
    const response = await list();

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).error).toBe(
      "No se pudo obtener la lista de elementos"
    );
  });
});
