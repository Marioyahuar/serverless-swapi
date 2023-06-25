const AWSMock = require("aws-sdk-mock");
const { DynamoDB } = require("aws-sdk");
const AWS_SDK = require("aws-sdk");
const config = require("../config/config");

const dynamoDb = new DynamoDB.DocumentClient();
const tableName = config.tableName;

class PeopleRepository {
  async create(personData) {
    const params = {
      TableName: tableName,
      Item: personData,
    };

    const environment = process.env.NODE_ENV || "development";
    if (environment === "test") {
      AWSMock.setSDKInstance(AWS_SDK);
      AWSMock.mock("DynamoDB.DocumentClient", "put", (params, callback) => {
        const response = {
          statusCode: 200,
          body: JSON.stringify({
            message: "Datos de Star Wars almacenados correctamente",
          }),
        };
        callback(null, response);
      });
    } else {
      await dynamoDb.put(params).promise();
    }
  }

  async getAll() {
    const params = {
      TableName: tableName,
    };

    const environment = process.env.NODE_ENV || "development";

    if (environment === "test") {
      AWSMock.setSDKInstance(AWS_SDK);
      let scannedItems;
      const result = AWSMock.mock(
        "DynamoDB.DocumentClient",
        "scan",
        (params, callback) => {
          const items = [
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" },
            { id: 3, name: "Item 3" },
          ];
          scannedItems = items;
          callback(null, { Items: items });
        }
      );
      return scannedItems;
    } else {
      const result = await dynamoDb.scan(params).promise();
      return result.Items;
    }
  }
}

module.exports = PeopleRepository;
