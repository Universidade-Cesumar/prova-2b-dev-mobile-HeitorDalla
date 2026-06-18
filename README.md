# Sistema de Almoxarifado
Aplicativo mobile em React Native (Expo) para controle simples de estoque: cadastro, listagem, baixa rápida e exclusão de materiais.

**Resumo rápido**

- Entrada do app: [App.js](App.js)
- Implementação principal: [sysalmoxarifado/App.js](sysalmoxarifado/App.js)
- Componentes e hooks em: [sysalmoxarifado/src/](sysalmoxarifado/src/)

**O que entrega**

- Formulário para cadastrar novos materiais (`POST`).
- Lista do estoque atual com `FlatList`.
- Baixa rápida de estoque (subtrair quantidade) com persistência (`PUT`) e validação.
- Exclusão permanente de materiais (`DELETE`).
- Testes automatizados com Jest (sprints 1-3) e `testID`s obrigatórios para autograding.

**Estrutura relevante**

- Tela principal: [sysalmoxarifado/App.js](sysalmoxarifado/App.js)
- Formulário: [sysalmoxarifado/src/components/MaterialForm.js](sysalmoxarifado/src/components/MaterialForm.js)
- Lista / controles: [sysalmoxarifado/src/components/MaterialList.js](sysalmoxarifado/src/components/MaterialList.js)
- Estado e integração: [sysalmoxarifado/src/hooks/useMateriais.js](sysalmoxarifado/src/hooks/useMateriais.js)
- Chamadas HTTP: [sysalmoxarifado/src/services/materiaisService.js](sysalmoxarifado/src/services/materiaisService.js)
- Validações: [src/utils/validacoes.js](src/utils/validacoes.js)
- Configuração de URL da API: [sysalmoxarifado/src/config/api.js](sysalmoxarifado/src/config/api.js)

**Como rodar (local)**

1. Instale dependências:

```bash
npm install --legacy-peer-deps
```

2. Defina a URL da MockAPI (opcional): exporte `EXPO_PUBLIC_API_URL` ou edite `sysalmoxarifado/src/config/api.js`.

3. Inicie o app:

```bash
npm start
```

4. Rode os testes (mesmo comando do CI):

```bash
npm test
```

**Author**

Desenvolvidor pelo Heitor Giussani Dalla Villa