import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SNSProxy } from "../../../infrastructure/proxy/sns/sns.proxy";
import { DynamoProxy } from "../../../infrastructure/proxy/dynamo/dynamo.proxy";
import { validarSchema } from "../../../shared/utils/validar-schema.util";
import { RecursoNaoEncontrado } from "../../../shared/erros/recurso-nao-encontrado.error";

const setup = () => {
  const dynamoDbService = new DynamoProxy();
  const snsProxy = new SNSProxy();
  return { snsProxy, dynamoDbService };
};

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.info(
    "handler.publicarEventoSNS sendo processado: body - ",
    event.body
  );
  try {
    const body = JSON.parse(event.body);
    const { dynamoDbService, snsProxy } = setup();
    validarSchema(body, {
      topico: { type: "string" },
      versao: { type: "int32" },
    });

    const topico = await dynamoDbService.consultarTopico(
      body.topico,
      body.versao
    );
    if (!topico) {
      throw new RecursoNaoEncontrado("Tipo de evento não encontrado");
    }

    if (topico.schema) {
      validarSchema(body.payload, topico.schema);
    }

    const { arn, ...res } = await dynamoDbService.consultarTopico(
      body.topico,
      body.versao
    );
    console.info(
      `[${handler.name}].publicarEventoSNS - dados de tópico encontrado`,
      arn,
      res
    );
    const resultado = await snsProxy.publicar(event.body, arn);
    console.info(
      `[${handler.name}].publicarEventoSNS - executado com sucesso`,
      resultado
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        sucesso: 1,
        dados: {
          MessageId: resultado,
        },
      }),
    };
  } catch (err: any) {
    console.info(
      "handler.publicarEventoSNS sendo processado: body - ",
      event.body
    );
    console.info(
      `[${handler.name}].publicarEventoSNS - executado com erro: `,
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
    console.log(`[${handler.name}].publicarEventoSNS - método finalizado`);
  }
};
