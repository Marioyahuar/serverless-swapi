const axios = require("axios");
const config = require("../config/config");
const { mapAttributeNames } = require("../utils/dataMapper");

class StarWarsService {
  async getStarWarsData(id) {
    const response = await axios.get(`${config.starWarsApiUrl}/${id}/`);
    const starWarsData = response.data;
    const mappedStarWarsData = mapAttributeNames(starWarsData);
    return mappedStarWarsData;
  }
}

module.exports = StarWarsService;
