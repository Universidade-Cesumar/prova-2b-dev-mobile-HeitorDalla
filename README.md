# Sistema de Almoxarifado

Aplicativo mobile em React Native com Expo para o controle de estoque de insumos do almoxarifado.

## O que o projeto entrega

- Tela com formulário para cadastrar novos materiais
- Lista de estoque atual em rolagem com `FlatList`
- Consumo de dados via `useEffect` ao abrir o app
- Envio de novos materiais via `POST`
- `testID` obrigatório conforme o contrato da atividade

## Estrutura do projeto

- [App.js](App.js): entrada principal do aplicativo na raiz do repositório
- [index.js](index.js): registro da aplicação no Expo
- [sysalmoxarifado/App.js](sysalmoxarifado/App.js): tela principal implementada
- [sysalmoxarifado/src/components/MaterialForm.js](sysalmoxarifado/src/components/MaterialForm.js): formulário de cadastro
- [sysalmoxarifado/src/components/MaterialList.js](sysalmoxarifado/src/components/MaterialList.js): listagem de materiais
- [sysalmoxarifado/src/hooks/useMateriais.js](sysalmoxarifado/src/hooks/useMateriais.js): estado e chamadas da API
- [sysalmoxarifado/src/services/materiaisService.js](sysalmoxarifado/src/services/materiaisService.js): integração com a MockAPI

## Tecnologias

- Expo
- React Native
- React
- Jest e Testing Library para testes

## Como rodar

1. Instale as dependências.
2. Configure sua MockAPI em `EXPO_PUBLIC_API_URL` ou troque o valor em [sysalmoxarifado/src/config/api.js](sysalmoxarifado/src/config/api.js).
3. Inicie o app com:

```bash
npm start
```

## Observação

Se a URL da MockAPI não estiver configurada, o projeto usa dados locais de fallback para não quebrar a interface durante o desenvolvimento.
