# FinWise Web

Frontend da aplicação FinWise — gerenciamento de finanças pessoais com dashboard, controle de transações, transferências, recorrentes, orçamentos e importação via CSV.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Roteamento | React Router DOM 7 |
| Estado global | Zustand 5 |
| Cache/fetching | TanStack Query 5 |
| HTTP | Axios |
| Formulários | React Hook Form + Zod |
| Gráficos | Recharts |
| Estilo | Tailwind CSS 3 |
| Toasts | Sonner |
| Ícones | Lucide React |

## Pré-requisitos

- Node.js 18+
- API backend rodando (ver variáveis de ambiente)

## Como rodar

```bash
cd finwise-web

# instalar dependências
npm install

# rodar em modo de desenvolvimento
npm run dev

# build de produção
npm run build

# pré-visualizar build
npm run preview
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz de `finwise-web/`:

```env
VITE_API_URL=https://finwise-51e0.onrender.com
```

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base da API REST backend (Render) |

## Estrutura de páginas

| Rota | Página | Acesso |
|---|---|---|
| `/` | Landing Page | Público |
| `/login` | Login | Público |
| `/register` | Cadastro | Público |
| `/dashboard` | Visão geral mensal | Autenticado |
| `/transactions` | Listagem e CRUD de transações | Autenticado |
| `/transfers` | Transferências entre contas | Autenticado |
| `/recurring` | Transações recorrentes | Autenticado |
| `/budgets` | Gerenciamento de orçamentos | Autenticado |
| `/accounts` | Gerenciamento de contas | Autenticado |
| `/categories` | Gerenciamento de categorias | Autenticado |
| `/import` | Importação de transações via CSV | Autenticado |

## Autenticação

Fluxo JWT com refresh token:

- O access token é mantido em memória (Zustand).
- O refresh token é persistido no `localStorage` sob a chave `finwise.refreshToken`.
- Interceptor do Axios renova o access token automaticamente em respostas `401`, enfileirando requisições concorrentes durante o refresh.

## Endpoints consumidos

| Método | Endpoint | Uso |
|---|---|---|
| `POST` | `/api/auth/login` | Login |
| `POST` | `/api/auth/register` | Cadastro |
| `POST` | `/api/auth/logout` | Logout |
| `POST` | `/api/auth/refresh` | Renovação de token |
| `GET` | `/api/dashboard/overview` | Resumo mensal (receita, despesa, saldo, gráfico de categorias) |
| `GET` | `/api/dashboard/monthly-evolution` | Evolução mensal para gráfico de linha |
| `GET/POST/PUT/DELETE` | `/api/transactions` | CRUD de transações com filtros e paginação |
| `GET/POST/PUT/DELETE` | `/api/accounts` | CRUD de contas |
| `GET/POST/PUT/DELETE` | `/api/categories` | CRUD de categorias |
| `GET/POST/PUT/DELETE` | `/api/budgets` | CRUD de orçamentos |
| `GET/POST/DELETE` | `/api/transfers` | Transferências entre contas |
| `GET/POST/PUT/DELETE` | `/api/recurring-transactions` | Transações recorrentes (DAILY, WEEKLY, MONTHLY, YEARLY) |
| `GET` | `/api/me` | Perfil do usuário autenticado |
| `POST` | `/api/imports/csv` | Importação de transações via arquivo CSV (`multipart/form-data`) |

## Importação CSV

A página `/import` aceita upload de arquivo `.csv` via drag-and-drop ou seleção. O backend retorna um resumo com total de linhas, registros importados, ignorados, erros por linha e categorias criadas automaticamente.
