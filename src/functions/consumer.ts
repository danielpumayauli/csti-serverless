import { DynamoDB } from 'aws-sdk';
import { SQSEvent } from 'aws-lambda';

const documentClient = new DynamoDB.DocumentClient({ region: process.env.AWS_REGION });

const RESULTS_TABLE_NAME = process.env.RESULTS_TABLE_NAME;

export const handler = async (event: SQSEvent) => {
  let records = event.Records;
  let batchItemFailures: object[] = [];

  if (records.length) {
    for (const record of records) {
      try {
        const parsedBody = JSON.parse(record.body);
        console.log(`processing batch details ${parsedBody.detail.input}`);
        console.log(`processing is successful ${record.messageId}`);
        const params = {
          TableName: RESULTS_TABLE_NAME as string,
          Item: {
            resultId: parsedBody.detail.resultId,
            input: parsedBody.detail.input,
            output: parsedBody.detail.output,
          },
          ConditionExpression: "attribute_not_exists(resultId)",
        };
        await documentClient.put(params).promise();
      } catch (error) {
        console.log(`error processing ${JSON.stringify(record)}`);
        batchItemFailures.push({
          itemIdentifier: record.messageId,
        });
        
      }
    }
  }
  return { batchItemFailures };
}