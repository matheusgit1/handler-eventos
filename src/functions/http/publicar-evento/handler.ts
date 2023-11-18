import { SNSProxy } from "../../../infrastructure/proxy/sns/sns.proxy";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { EventBus } from "../../../infrastructure/eventbus/event.service";
import { DynamoProxy } from "../../../infrastructure/proxy/dynamo/dynamo.proxy";
// import { Logger } from "../../infrastructure/logger/logger";
import * as dotenv from "dotenv";
if (process.env.NODE_ENV === "TEST") {
  dotenv.config();
}

const setup = () => {
  const dynamoDbService = new DynamoProxy();
  const snsProxy = new SNSProxy();
  return new EventBus(snsProxy, dynamoDbService);
};

// const logger = new Logger("handler.publicarEvento");

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.info("handler.publicarEvento sendo processado: body - ", event.body);
  try {
    const eventBusService = setup();
    eventBusService.publicar(JSON.parse(event.body));

    console.info(
      `[${handler.name}].publicarNoTopicoSNS - executado com sucesso`
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        sucesso: 1,
        messagem: `Messagem publicada no tópico sns`,
      }),
    };
  } catch (err: any) {
    console.info(
      "handler.publicarEvento sendo processado: body - ",
      event.body
    );
    console.info(
      `[${handler.name}].publicarNoTopicoSNS - executado com erro: `,
      err
    );
    return {
      statusCode: 500,
      body: JSON.stringify({
        sucesso: 0,
        error: err,
      }),
    };
  } finally {
    console.log(`[${handler.name}].publicarNoTopicoSNS - método finalizado`);
  }
};
