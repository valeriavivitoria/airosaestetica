# ✨ AIROSA Estética

> Plataforma web oficial da AIROSA Estética, desenvolvida para oferecer uma presença digital profissional e facilitar o acesso dos clientes aos serviços, informações e agendamentos da clínica.

<p align="center">
  <a href="https://airosaestetica.vercel.app">
    <strong>🌐 Acessar o site</strong>
  </a>
</p>

---

## 📸 Site

🌐 **[Acessar AIROSA Estética](https://airosaestetica.vercel.app/)**

A plataforma foi desenvolvida com foco em uma experiência moderna, responsiva e intuitiva, permitindo que os clientes conheçam os serviços da clínica, encontrem informações importantes e realizem solicitações de agendamento diretamente pelo site.

---

## 💎 Sobre a AIROSA Estética

A AIROSA Estética é uma clínica de estética que utiliza a plataforma como seu canal digital para apresentação dos serviços e relacionamento com seus clientes.

O sistema foi desenvolvido como uma aplicação **full-stack**, com frontend, backend e banco de dados integrados.

A plataforma foi estruturada para utilização real, com persistência de dados, autenticação, API própria e infraestrutura hospedada.

---

## 🚀 Funcionalidades

### 🌸 Experiência do cliente

* Página institucional
* Apresentação dos procedimentos
* Informações sobre a clínica
* Apresentação da equipe
* Perguntas frequentes (FAQ)
* Página de contato
* Agendamento online
* Integração com WhatsApp
* Interface responsiva
* Navegação otimizada para dispositivos móveis

### 📅 Agendamento

O sistema permite que clientes solicitem agendamentos diretamente pela plataforma.

O fluxo inclui:

* seleção do procedimento;
* escolha de data e horário;
* preenchimento dos dados do cliente;
* envio da solicitação;
* processamento através da API;
* armazenamento das informações no banco de dados.

### 🔐 Backend e autenticação

A aplicação possui uma API própria responsável pelo processamento dos dados e comunicação com o banco.

Entre os recursos implementados estão:

* API REST;
* autenticação;
* JWT;
* validação de dados;
* gerenciamento de solicitações;
* persistência de dados;
* integração com PostgreSQL através do Prisma ORM.

---

## 📄 Informações legais

A plataforma disponibiliza páginas específicas para:

* Política de Privacidade
* Política de Cookies
* Termos de Uso

Essas páginas foram estruturadas para apresentar aos usuários informações relacionadas ao funcionamento da plataforma e ao tratamento de dados.

---

## 🛠️ Tecnologias

### Frontend

* React
* TypeScript
* Vite
* HTML5
* CSS3

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* JWT

### Banco de dados

* PostgreSQL
* Neon

### Infraestrutura

* Vercel — Frontend
* Render — Backend
* Neon — Banco de dados

### Ferramentas

* Visual Studio Code
* Git
* GitHub
* Insomnia

---

## 🏗️ Arquitetura

```text
                    ┌─────────────────────┐
                    │       Cliente       │
                    │     Web / Mobile    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Vercel        │
                    │   React + Vite      │
                    └──────────┬──────────┘
                               │
                            REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Render        │
                    │  Node + Express     │
                    └──────────┬──────────┘
                               │
                            Prisma
                               │
                               ▼
                    ┌─────────────────────┐
                    │        Neon         │
                    │     PostgreSQL      │
                    └─────────────────────┘
```

---

## 📁 Estrutura do projeto

```text
airosaestetica/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── ...
│
├── server/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── server.ts
│   │
│   ├── .env.example
│   └── package.json
│
├── package.json
├── vite.config.ts
├── vercel.json
└── README.md
```

---

## 💻 Desenvolvimento local

### Pré-requisitos

* Node.js
* npm
* PostgreSQL
* Git

### Instalação

Clone o repositório:

```bash
git clone https://github.com/valeriavivitoria/airosaestetica.git
```

Entre no projeto:

```bash
cd airoestetica
```

Instale as dependências do frontend:

```bash
npm install
```

Entre no backend:

```bash
cd server
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente utilizando o arquivo `.env.example` como referência.

Depois gere o Prisma Client:

```bash
npx prisma generate
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Inicie o backend:

```bash
npm run dev
```

Em outro terminal, na raiz do projeto:

```bash
npm run dev
```

---

## 🌐 Infraestrutura e deploy

A aplicação utiliza uma arquitetura distribuída:

| Camada         | Tecnologia        | Serviço |
| -------------- | ----------------- | ------- |
| Interface      | React + Vite      | Vercel  |
| API            | Node.js + Express | Render  |
| ORM            | Prisma            | —       |
| Banco de dados | PostgreSQL        | Neon    |

### Aplicação

🌐 **Frontend:**
https://airosaestetica.vercel.app/

⚙️ **API:**
https://airosaestetica-api.onrender.com/

---

## 🔒 Segurança

As informações sensíveis da aplicação são mantidas através de variáveis de ambiente e não são armazenadas diretamente no código-fonte.

Entre as configurações protegidas estão:

* credenciais do banco de dados;
* chave de autenticação JWT;
* configurações do servidor.

O arquivo `.env` não é versionado no repositório.

Um arquivo `.env.example` é disponibilizado para documentar as variáveis necessárias para execução do projeto.

---

## 📱 Responsividade

A plataforma foi desenvolvida para proporcionar uma experiência consistente em diferentes dispositivos:

* 📱 Smartphones
* 📲 Tablets
* 💻 Notebooks
* 🖥️ Desktops

---

## 👩‍💻 Desenvolvimento

**Desenvolvimento:** Valéria Vitória dos Santos

**Responsável pela AIROSA Estética:** Adriana Santos Farias

---

## 📌 Status

🟢 **Em produção**

A plataforma encontra-se publicada e integrada aos serviços de frontend, backend e banco de dados, sendo utilizada como canal digital da AIROSA Estética.
