# Handler-eventos

## Aplicação serverless para coletar e processar eventos emitidos por outras aplicações

### Eventos disponiveis

#### boas_vindas

topico sns que processa o evento de novo registro na btech

#### Exemplo de integração

```http
  POST /api/items
```

| Parâmetro  | Tipo       | Posicao          | Descrição                                |
| :---------- | :--------- | :--------------- | :----------------------------------------- |
| `api-key` | `string` | **Header** | **Obrigatório**. A chave da sua API |
