---

### 2. Conteúdo para o `docs/adr/ADR-001-layered-architecture-and-error-handling.md`

Podes copiar este conteúdo e colar no ficheiro de decisão arquitetural:

```markdown
# ADR-001: Adoção de Arquitetura em Camadas e Tratamento Centralizado de Erros

## Status

Aceito

## Contexto

Precisávamos desenvolver uma API Node.js com TypeScript para o setor de varejo de construção civil, garantindo alta manutenibilidade, facilidade de testes, código limpo e previsibilidade nas respostas de erro HTTP. Como o projeto iniciou sem uma base de dados externa (armazenamento em memória), era fundamental isolar as regras de negócio da camada de transporte (HTTP/Express).

## Decisão

Decidimos adotar:

1. **Arquitetura em Camadas (Layered Architecture):**
   - **Rotas (`routes`):** Apenas mapeiam os endpoints HTTP para os controladores.
   - **Controladores (`controllers`):** Recebem os objetos de requisição/resposta (`req`, `res`, `next`), delegam para o serviço e retornam o status HTTP adequado.
   - **Serviços (`services`):** Concentram toda a regra de negócio pura (validação de stock, cálculos de valores, filtros, ordenações e manipulação da lista em memória).
   - **Modelos e Utilitários (`models`/`utils`):** Tipagens TypeScript rigorosas e funções puras de formatação (ex: máscaras de CPF/CNPJ).

2. **Tratamento Centralizado de Erros com `AppError`:**
   - Criação de uma classe customizada `AppError` que encapsula a mensagem amigável e o status HTTP correspondente.
   - Um dicionário centralizado de erros (`Errors`) para evitar repetição de strings mágicas no código.
   - Um Middleware Global de Erros (`errorHandler`) que intercepta instâncias de `AppError` e devolve respostas padronizadas em português.

## Consequências

### Positivas:

- **Separação de Preocupações:** O código de negócio fica totalmente desacoplado do framework Express.
- **Consistência:** Todas as respostas de erro da API seguem exatamente o mesmo formato estrutural (`{ message: "..." }`).
- **Legibilidade:** Os serviços e controladores ficaram limpos, focados e fáceis de testar no Insomnia.

### Negativas / Custos:

- Exige uma curva inicial maior de criação de classes de erro e mapeamentos comparado a lógicas monolíticas inline.
```
