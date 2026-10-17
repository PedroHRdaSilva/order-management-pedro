# order-management-pedro

Dividi o projeto em pastas por responsabilidade para o código não virar uma bagunça e ficar fácil de mexer depois.

---

## Estrutura de Pastas

src/
├── controllers/ # Recebem as requisições e retornam as respostas
├── services/ # Regras de negócio, como descontos e cancelamentos
├── routes/ # Rotas da aplicação
├── models/ # Estrutura dos dados salvos no banco
├── integrators/ # Integrações com WhatsApp e serviços de pagamento
└── middlewares/ # Validações, permissões e tratamento de erros

---

## Por que ?

Organização: Cada pasta tem sua função, deixando o código mais fácil de entender e encontrar.

Manutenção: Se precisar mudar alguma regra do sistema, consigo fazer isso sem precisar mexer em várias partes do código.

Trabalho em equipe: Com o código organizado, fica mais fácil para outras pessoas entenderem o projeto e trabalharem nele também.coisa boa

# API Order Management - Construction Supply Chain

API REST desenvolvida em Node.js com TypeScript para gestão de pedidos de uma cadeia de suprimentos de materiais de construção, focada em arquitetura limpa, separação de preocupações (Separation of Concerns) e tratamento robusto de erros.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

Certifica-te de ter o **Node.js** e o **npm** instalados na tua máquina.

### Passos para execução:

1. Clonar o repositório ou abrir a pasta do projeto.
2. Instalar as dependências:
   ```bash
   npm install
   ```
