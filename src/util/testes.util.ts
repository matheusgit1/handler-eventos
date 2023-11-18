// import { genBoasVindasEvent } from './testes.util';
// import { BoasVindasTo, EventReceived } from "@functions/sqs/dtos/handlers.dto";
// import { Context, SQSEvent } from "aws-lambda";
// import { v4 } from "uuid";
import * as AWS from "aws-lambda";
import {
  TopicoBoasVindas,
  TopicoConfig,
  TopicoVerificacaoDeConta,
} from "../infrastructure/proxy/dynamo/dtos/dynamo.dto";
import { EventBodyFormat } from "src/infrastructure/eventbus/dtos/sns.dtos";

export const genEventoVerificacaoDeConta = (
  dto?: Partial<TopicoVerificacaoDeConta>
): TopicoVerificacaoDeConta => {
  return {
    email: dto?.email || "email@example.com",
    codigo: dto?.codigo || "012345",
  };
};

export const genReenviarVerificacaoDeConta = (
  dto?: Partial<TopicoVerificacaoDeConta>
): TopicoVerificacaoDeConta => {
  return {
    email: dto?.email || "email@example.com",
    codigo: dto?.codigo || "012345",
  };
};

export const genBoasVindas = (
  dto?: Partial<TopicoBoasVindas>
): TopicoBoasVindas => {
  return {
    email: dto?.email || "email@example.com",
  };
};

export const genEventBodyFormat = (
  dto?: Partial<EventBodyFormat>
): EventBodyFormat => {
  return {
    topico: dto.topico,
    versao: dto?.versao || 1,
    payload: dto?.payload || {},
  };
};

export const genTopicoSchemaConfig = (
  topico: "nova_conta" | "reenvio_código_verificacao" | "boas_vindas"
) => {
  switch (topico) {
    case "boas_vindas":
      return genBoasVindas();
    case "nova_conta":
      return genEventoVerificacaoDeConta();
    case "reenvio_código_verificacao":
      return genReenviarVerificacaoDeConta();
    default:
      throw new Error("topico inválido");
  }
};

export const genTopicoConfig = (dto?: Partial<TopicoConfig>): TopicoConfig => {
  return {
    topico: dto?.topico || "topico",
    versao: dto?.versao || 1,
    arn: dto?.arn || "arn-mocked",
    schema: dto?.schema || { key: "schema" },
  };
};

export const genBoasVindasEvent = (nome: string, email: string) => {
  const message = {
    topico: "boas_vindas",
    versao: 1,
    payload: {
      nome: nome,
      email: email,
      origem: "test-jest",
    },
  };
  const arn = "arn:aws:sns:us-east-1:963524133368:boas_vindas";
  return { messagem: JSON.stringify(message), arn };
};

export const genHttpHeaders = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Encoding": "gzip,deflate",
    "Accept-Language": "en-US,pt-BR,zh-CN,zh-TW",
  };
};

interface ApiGatewayContextProps {
  event: any;
  options?: AWS.APIGatewayProxyEventBase<AWS.APIGatewayEventDefaultAuthorizerContext>;
}

export const genAWSApiGatewayContext = (
  apiGatewayContextProps: ApiGatewayContextProps
): AWS.APIGatewayProxyEvent => {
  const options = apiGatewayContextProps?.options;
  return {
    body: JSON.stringify(apiGatewayContextProps.event),
    headers: genHttpHeaders(),
    httpMethod: "POST",
    isBase64Encoded: true,
    path: "/",
    resource: "resource",
    ...options,
  };
};
