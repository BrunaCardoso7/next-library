# Juridiq Library

Sistema de recomendação de livros, com onboarding de usuários e sistema de reações (follow up / follow down) para da engajamento nos melhores títulos.

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone git@github.com:BrunaCardoso7/next-library.git
cd next-library
```

### 2. Instalar dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Subir o banco de dados (Docker)

O projeto utiliza PostgreSQL via Docker.

```bash
docker compose -f docker-compose.db.yml up -d
```

### 4. Rodar o projeto

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 🧱 Arquitetura do projeto

O projeto segue uma arquitetura **feature-based**, com foco em escalabilidade e separação de responsabilidades.
A ideia é agrupar código por contexto de negócio, e não por tipo técnico.

### 📁 Estrutura de pastas

```
app/
  api/                # Rotas da API (Next.js server actions)
  library/            # Página principal da biblioteca
  layout.tsx          # Layout global
  page.tsx            # Página inicial

components/           # Componentes reutilizáveis globais

entities/             # Modelos de domínio (TypeORM / entidades)
  Book.ts
  Follow.ts
  Onboarding.ts

features/             # Camadas por domínio (FEATURE-BASED)
  follow/
    components/
    hooks/
    services/
    schemas/
    types/

  onboarding/
  library/

lib/                  # Configurações globais (DB, helpers)

public/               # Assets estáticos
```

---

## 🧠 Conceito da arquitetura

Cada feature contém tudo que ela precisa:

- **components** — UI local
- **hooks** — lógica
- **services** — API calls
- **schemas** — validação
- **types** — tipagem

Isso evita:

- acoplamento global
- arquivos gigantes
- lógica espalhada

---

## 🗄️ Banco de dados

- PostgreSQL
- Rodando via Docker
- ORM: TypeORM

---

## ⚙️ Tecnologias

| Tecnologia | Descrição |
|---|---|
| Next.js (App Router) | Framework React fullstack |
| Tanstack Query | Gerenciamento de cache e estado assíncrono |
| React Hook Form | Formulários performáticos |
| Zod | Validação de esquemas |
| TypeORM | ORM para TypeScript |
| PostgreSQL | Banco de dados relacional |
| Docker | Containerização do banco de dados |

---

## 📌 Próximos passos

- [ ] Controle de acesso de usuário via token
- [ ] Métricas para escritores acompanharem: livros mais engajados, menos engajados, total de followup
- [ ] Revisão de código dimuindo ascessão de lógica em componentes
- [ ] Aplicar testes automatizados para componentes