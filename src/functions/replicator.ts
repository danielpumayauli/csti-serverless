import { DynamoDB } from 'aws-sdk';
import { DynamoDBStreamEvent } from 'aws-lambda';

const REPLICAS_TABLE_NAME = process.env.REPLICAS_TABLE_NAME;
const documentClient = new DynamoDB.DocumentClient({ region: process.env.AWS_REGION });

export const handler = async (event: DynamoDBStreamEvent) => {
  let records = event.Records;
  if (records.length) {
    for (const record of records) {
      try {
        const image = DynamoDB.Converter.unmarshall(record.dynamodb!.NewImage!);
        const params = {
          TableName: REPLICAS_TABLE_NAME as string,
          Item: image,
        };
        await documentClient.put(params).promise();
      } catch (error) {
        console.log(error);
        return;
      }
    }
  }
}