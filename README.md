# 📚 Next Library

> Plataforma que conecta leitores e escritores através de recomendações e interação com livros.

---

## 🧠 Sobre o sistema

O Next Library é baseado em três pilares principais:

- 📖 **Descoberta de livros relevantes**
- 👤 **Identificação contínua de usuários**
- 📊 **Engajamento e análise de interações**

---

## 👤 Identificação e persistência de usuário

A aplicação identifica usuários de forma contínua utilizando **CPF** como chave de reconhecimento.

Isso significa que:

- O usuário não perde seus dados entre sessões
- O onboarding só é feito uma vez
- O histórico de interações (follow up / follow down) é persistido
- A experiência é contínua mesmo sem autenticação tradicional

---

## ✍️ Modo escritor (publicação e análise)

Usuários no papel de escritor possuem uma área dedicada para acompanhamento de suas publicações.

Nessa área é possível:

- 📊 **Visualizar engajamento** de cada livro individualmente
  - Follow ups (curtidas / interesse positivo)
  - Follow downs (desinteresse)
- 👀 **Monitorar performance** por publicação
- 📚 **Acompanhar** quais títulos geram mais interesse
- 📈 **Entender comportamento** dos leitores ao longo do tempo

> Isso transforma a plataforma também em um **painel analítico de conteúdo**.

---

## 🔎 Busca e recomendação de livros

A plataforma possui um sistema de busca inteligente que permite:

- 🔍 Buscar livros por título
- 📌 Filtrar conteúdos de interesse do usuário
- 🎯 Reforçar recomendações baseadas em interações anteriores
- 📚 Sugerir livros alinhados ao histórico de engajamento

O objetivo é criar uma **experiência de descoberta contínua**, onde o sistema aprende com o comportamento do usuário.

---

## ❤️ Sistema de reações (engajamento)

Cada livro pode receber interações:

| Reação | Significado |
|---|---|
| 👍 Follow up | Indica interesse / engajamento positivo |
| 👎 Follow down | Indica desinteresse |

Esses dados alimentam:

- Sistema de recomendação
- Ranking de livros
- Dashboard de escritores
- Métricas de engajamento da plataforma

---

## 🧱 Arquitetura do projeto

O projeto segue uma arquitetura **feature-based**, com foco em escalabilidade e separação de responsabilidades.

### 📁 Estrutura de pastas

```
app/
  api/                # Rotas da API (Next.js server actions)
  library/            # Página principal da biblioteca
  layout.tsx          # Layout global
  page.tsx            # Página inicial

components/           # Componentes reutilizáveis globais

entities/             # Modelos de domínio (TypeORM)
  Book.ts
  Follow.ts
  Onboarding.ts

features/             # Domínios da aplicação
  follow/
  onboarding/
  library/

lib/                  # Configurações globais (DB, helpers)

public/               # Assets estáticos
```

### 🧠 Conceito da arquitetura

Cada feature é isolada e contém tudo que precisa:

- **components** → UI específica do domínio
- **hooks** → lógica de estado e comportamento
- **services** → comunicação com API
- **schemas** → validação de dados
- **types** → tipagem do domínio

> Isso reduz acoplamento e facilita a evolução do sistema.

---

## 🗄️ Banco de dados

- **PostgreSQL** — banco relacional
- Rodando via **Docker**
- ORM: **TypeORM**

Relações principais:

- `Users` (Onboarding)
- `Books`
- `Follows` (interações)

---

## ✅ Testes

Foram implementados testes nas entidades principais do sistema para garantir o bom funcionamento da **persistência de registros** no banco de dados.

| Entidade | Cobertura |
|---|---|
| `Users` | Criação, leitura e persistência de dados do usuário |
| `Books` | Cadastro e recuperação de publicações |
| `Follows` | Registro e integridade das interações (follow up / follow down) |

> Os testes garantem que o ciclo de vida de cada entidade está funcionando corretamente, prevenindo regressões na camada de persistência.

---

## ⚙️ Tecnologias

| Tecnologia | Descrição |
|---|---|
| Next.js (App Router) | Framework fullstack |
| TypeORM | ORM TypeScript |
| PostgreSQL | Banco relacional |
| TanStack Query | Cache e estado assíncrono |
| React Hook Form | Formulários |
| Zod | Validação |
| Docker | Infraestrutura local |

---

## 📌 Próximos passos

- [ ] Autenticação formal com token (JWT)
- [ ] Dashboard avançado para escritores
  - [ ] Livros mais engajados
  - [ ] Livros menos engajados
  - [ ] Evolução de engajamento ao longo do tempo
- [ ] Melhorar separação de regras de domínio
- [ ] Testes automatizados de componentes e integração
- [ ] Recomendação baseada em histórico de leitura real
- [ ] Ranking de livros por engajamento global