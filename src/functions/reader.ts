import { APIGatewayEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const RESULTS_TABLE_NAME = process.env.RESULTS_TABLE_NAME;
const documentClient = new DynamoDB.DocumentClient({ region: process.env.AWS_REGION });

export const execute = async (event: APIGatewayEvent) => {
  const params = {
    TableName : RESULTS_TABLE_NAME as string,
  };

  try {
    const data = await documentClient.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
  }
};
