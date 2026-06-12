# Sistema de Almoxarifado

Aplicativo mobile em React Native com Expo para a primeira sprint do projeto de controle de estoque.

## O que entrega nesta sprint

- Listagem dinâmica do estoque com `FlatList`
- Formulário para cadastrar novos insumos
- Consumo de API com `useEffect` no carregamento
- Envio de novo material via `POST`
- `testID` obrigatórios conforme o contrato da atividade

## Tecnologias

- Expo 56
- React 19
- React Native

## Como rodar

1. Instale as dependências.
2. Configure a URL da sua MockAPI em `EXPO_PUBLIC_API_URL` ou em [src/config/api.js](src/config/api.js).
3. Execute o projeto com:

```bash
npm start
```

## Observação sobre a API

Use um único recurso na MockAPI para o estoque de materiais. O app faz `GET` para listar e `POST` para cadastrar no mesmo endpoint.

## Endpoints da MockAPI

Você precisa criar apenas uma coleção, por exemplo `materiais`, com uma URL parecida com `https://xxxxx.mockapi.io/materiais`.

- `GET /materiais`: usado em [src/services/materiaisService.js](src/services/materiaisService.js) dentro de `listarMateriais()` para carregar a lista ao abrir o app.
- `POST /materiais`: usado em [src/services/materiaisService.js](src/services/materiaisService.js) dentro de `cadastrarMaterial()` para gravar um novo item.

## Como testar a MockAPI

1. Abra a sua coleção no painel da MockAPI e confirme que ela se chama `materiais`.
2. No arquivo [src/config/api.js](src/config/api.js), coloque a URL completa da coleção.
3. Teste o `GET` abrindo a URL no navegador. Você deve ver um JSON em array, mesmo que vazio.
4. Teste o `POST` enviando um JSON como este:

```json
{
	"nome": "Seringa",
	"quantidade": 50
}
```

5. Depois disso, abra o app. A lista deve vir da API e o botão de cadastrar deve salvar um novo registro na coleção.