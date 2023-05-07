import { EventBridge } from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { playLCR } from '../utils/game';

const EVENT_BUS_NAME = process.env.EventBusName;
const INPUTS_TABLE_NAME = process.env.INPUTS_TABLE_NAME;
const documentClient = new DynamoDB.DocumentClient({ region: process.env.AWS_REGION });

let eventBridge = new EventBridge();

export const handler = async (event: APIGatewayEvent) => {
  const params = {
    TableName : INPUTS_TABLE_NAME as string,
  };

  const { Items } = await documentClient.scan(params).promise();

  if (!Items) return;

  const Entries: object[] = [];

  for (const { input } of Items) {
    const output = playLCR(input);
    console.log('Game en el producer:', {input, output});
    Entries.push({
      EventBusName: EVENT_BUS_NAME,
      Detail: JSON.stringify({
        resultId: uuidv4(),
        input,
        output,
      }),
      Source: 'csti-app',
      DetailType: 'inputs'
    });
  }

  try {
    const output = await eventBridge.putEvents({ Entries }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(output),
    };
  } catch (error) {
    console.log(error);
  }
};
