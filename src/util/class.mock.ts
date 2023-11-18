import { SNSProxyRepository } from "../infrastructure/proxy/sns/repository/sns.proxy-repository";
import { EventBusService } from "../infrastructure/eventbus/repository/sns.repository";
import { DynamoServiceEvents } from "../infrastructure/proxy/dynamo/repository/dynamo.repository";
import { TopicoConfig } from "../infrastructure/proxy/dynamo/dtos/dynamo.dto";
import { genTopicoConfig } from "./testes.util";

// private readonly snsProxy: SNSProxyRepository,
//     private readonly dynamoService: DynamoServiceEvents

export class MockEventBus implements EventBusService {
  publicar = jest.fn(async (): Promise<void> => {});
}

export class MockSNSProxy implements SNSProxyRepository {
  publicar = jest.fn(
    async (_mensagem: string, _arn: string): Promise<string> => {
      return "messageId";
    }
  );
}

export class MockDynamoProxy implements DynamoServiceEvents {
  consultarTopicos = jest.fn(async (): Promise<TopicoConfig[]> => {
    return Array(2).fill(genTopicoConfig());
  });
  consultarTopico = jest.fn(
    async (_topico: string, _versao: number): Promise<TopicoConfig | null> => {
      return genTopicoConfig();
    }
  );
  inserirTopico = jest.fn(
    async (
      _topico: string,
      _versao: number,
      _schema: any,
      _arn: string
    ): Promise<boolean> => {
      return true;
    }
  );
}
