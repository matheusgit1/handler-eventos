# handler-eventos

Este projeto é uma parte de um projeto maior. Este serviço visa receber e porcessar eventos emitidos por outras aplicações via protocolo http

O serviço é destinado a publicar mensagens em um tópico sns que por sua vez é consumido por um terceiro, como por exemplo, uma fila sqs.

#### handlers de eventos implementados:

- ler tópico
- ler topicos
- publicar evento
- publicar sns

## Preparação

A primeira etapa de publicação no sns pelo serviço, é validação da estrutura do evento com um json armazenado no dynamoDB, portanto, lembre-se de cofigurar o dynamo db com uma tabela chamada handler-eventos, e nessa tabela, crie a estrutura dos eventos aos quais desejam consumir. **será necessário que você configure esse serviço em sua infraestutura**

Além disso, **configure as variaveis de ambientes** e **configure o arquivo serverless.yml para que atenda suas necessidades de sua aplicação**

Ou, se preferir, ajuste o arquivo serverless.yml para a infraestutura que deseje utilizar, além de ajustar a aplicação para tal.

## Stack utilizada

Node, Typescript, Javascript, AWS, IAC, Serverless, jest

## Arquitetura implementada

antes de publicarmos o tópico sns, o json é validado com um schema armazenado no dynamoDb como descrito na Arquitetura

![Arquitetura](https://github.com/matheusgit1/handler-eventos/blob/develop/imagens/Captura%20de%20tela%202024-01-25%20215933.png)

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu **.env** seguindo o arquivo **.env.example**

`REGIAO`

`NODE_ENV`

`AMBIENTE`

`SNS_REGIAO`

`EVENTO_CONFIG_DYNAMODB_REGIAO`

`EVENTO_CONFIG_DYNAMODB_NOME_TABELA`="handler_eventos"

## Testes unitário

Este serviço foi implementado de forma a ser possivel criar testes unitarios e de integração.

para a execução dos testes use `npm run test:coverage`

## Sobre o Autor

Eu sou uma pessoa desenvolvedora full-stack, técnico em administração, engenheiro de automação em formação, e cientista de dados em formação. Sempre busco por excelência e entregar o máximo com a maior qualidade, sem claro, deixar de lado boas práticas.

Atualmente sou desenvolvedor full stack júnior da área de desenvolvimento de softwares, mirando senioridades cada vez mais altas.

Tenho habilidades com as stacks mais modernas, como :nodeJS, typeScript, css, html, nestJs, NextJs, aws-cloud, bancos de dados não relacionais como mongodb e redis, bancos de dados relacionais como MySql, postgres, docker, testes unitários e de integração. Atuando também em diferentes setores, como educação e telecomunicação.

## Quer entrar em contato com o desenvolvedor?

🪜 Instagram (sempre respondo): @ap_matheus

📱 Telefone e whatsapp: 55 27 997822665

📫 Email: pereira.matheusalves@gmail.com

🔗 Linkedin: https://www.linkedin.com/in/matheus-alves-pereira-4b3781222/
