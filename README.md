# Sistema de Almoxarifado

Aplicativo mobile desenvolvido em React Native com Expo para controle simples de materiais. O objetivo do projeto é atender um fluxo básico de almoxarifado com cadastro, pesquisa, baixa de estoque e exclusão, mantendo a interface leve e adequada ao uso em celular.

## Visão geral

O sistema trabalha com uma lista de materiais vinda de uma API externa e atualiza a interface de forma direta. O fluxo principal é este:

1. cadastrar um material novo;
2. consultar a lista atual de estoque;
3. pesquisar em tempo real;
4. baixar quantidade de um item;
5. remover material quando necessário.

Existe também uma regra visual para estoque crítico. Quando a quantidade fica abaixo de 10 unidades, o card recebe um destaque vermelho e a marcação de acessibilidade prevista no contrato da atividade.

## O que o projeto cobre hoje

- Cadastro de materiais com persistência via API.
- Lista de estoque com totalizador atualizado conforme o filtro.
- Pesquisa em tempo real no topo da tela.
- Indicador visual para estoque crítico.
- Tratamento de falhas de rede com alertas na interface.
- Testes automatizados cobrindo as sprints 1, 2 e 3.

## Estrutura que importa

- Entrada do projeto: [App.js](App.js)
- Tela principal: [sysalmoxarifado/App.js](sysalmoxarifado/App.js)
- Formulário de cadastro: [sysalmoxarifado/src/components/MaterialForm.js](sysalmoxarifado/src/components/MaterialForm.js)
- Lista e cards de materiais: [sysalmoxarifado/src/components/MaterialList.js](sysalmoxarifado/src/components/MaterialList.js)
- Estado e regras de ação: [sysalmoxarifado/src/hooks/useMateriais.js](sysalmoxarifado/src/hooks/useMateriais.js)
- Integração com API: [sysalmoxarifado/src/services/materiaisService.js](sysalmoxarifado/src/services/materiaisService.js)
- Validação de retirada: [src/utils/validacoes.js](src/utils/validacoes.js)

## Como executar com Expo

1. Instale as dependências.

```bash
npm install --legacy-peer-deps
```

2. Configure a API, se for usar uma base própria.

O projeto lê a variável `EXPO_PUBLIC_API_URL`. Se ela não estiver definida, o app usa a URL da MockAPI configurada em [sysalmoxarifado/src/config/api.js](sysalmoxarifado/src/config/api.js).

3. Inicie o Expo.

```bash
npm start
```

4. Abra no Expo Go ou no emulador.

5. Rode os testes automatizados.

```bash
npm test
```

## Testes

Os testes usados no projeto estão em [__tests__/](__tests__). Eles cobrem três pontos principais:

- existência dos `testID`s obrigatórios;
- validação lógica da retirada de estoque;
- busca em tempo real com totalizador.

Para uma checagem rápida antes de qualquer alteração, `npm test` já é suficiente.

## Evidências visuais

Adicionar aqui as capturas de tela do app rodando com Expo:

- tela inicial com formulário e estoque;
- busca filtrando itens e totalizador mudando;
- card com estoque crítico destacado em vermelho.

## Autor

Heitor Giussani Dalla Villa.