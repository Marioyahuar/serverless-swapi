const axios = require("axios");
const { mapAttributeNames } = require("../utils/dataMapper");

class StarWarsService {
  async getStarWarsData(id) {
    const response = await axios.get(
      `https://swapi.py4e.com/api/people/${id}/`
    );
    const starWarsData = response.data;
    const mappedStarWarsData = mapAttributeNames(starWarsData);
    return mappedStarWarsData;
  }
}

module.exports = StarWarsService;
