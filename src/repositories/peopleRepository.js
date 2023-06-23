const { DynamoDB } = require("aws-sdk");

const dynamoDb = new DynamoDB.DocumentClient();
const tableName = "people-from-starwars";

class PeopleRepository {
  async create(personData) {
    const params = {
      TableName: tableName,
      Item: personData,
    };
    await dynamoDb.put(params).promise();
  }

  async getAll() {
    const params = {
      TableName: tableName,
    };

    const result = await dynamoDb.scan(params).promise();
    return result.Items;
  }
}

module.exports = PeopleRepository;
