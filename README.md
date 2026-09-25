# AIROSA Estética

Site institucional demonstrativo para a AIROSA ESTÉTICA, com linguagem editorial, navegação responsiva e fluxos de contato preparados para evolução.

## Preview

Adicione aqui uma captura de tela ou o link da aplicação publicada quando o domínio oficial estiver definido.

## Sobre o projeto

O projeto apresenta a clínica, seus procedimentos e a responsável institucional Adriana Santos Farias. Os dados de contato, profissionais e imagens que ainda não foram confirmados estão identificados no código e devem ser revisados antes de uso comercial.

## Funcionalidades

- Navegação responsiva com menu mobile
- Catálogo de procedimentos e páginas dinâmicas por slug
- Páginas institucionais Sobre e Equipe
- Fluxo de solicitação de agendamento em etapas
- Formulário de contato com estados de validação e sucesso
- Botão reutilizável de WhatsApp
- FAQ geral e FAQs de procedimentos
- Responsividade para diferentes tamanhos de tela
- Metadata SEO, canonical, Open Graph, Twitter/X, robots e sitemap
- Foco visível, labels semânticos e suporte a redução de movimento

## Tecnologias

- React 19
- TypeScript
- Vite
- React Router DOM
- Lucide React
- Oxlint

## Estrutura

```text
src/
  components/    componentes de layout, formulários, contato, SEO e procedimentos
  data/          dados centralizados da clínica, equipe e procedimentos
  pages/         páginas associadas às rotas
  services/      serviços simulados de agendamento e contato
  App.tsx        composição do Router e shell compartilhado
  App.css        identidade visual e responsividade
public/          favicon, robots.txt e sitemap.xml
```

## Instalação

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e defina `VITE_SITE_URL` com a URL pública oficial. Essa variável alimenta canonical, Open Graph e referências de publicação. O arquivo `.env` está ignorado pelo Git; não inclua segredos no front-end.

## Deploy na Vercel

1. Importe o repositório GitHub na Vercel.
2. Selecione `Vite` ou mantenha a detecção automática.
3. Use `npm run build` como comando de build.
4. Use `dist` como diretório de saída.
5. Cadastre `VITE_SITE_URL` nas variáveis de ambiente com a URL oficial, sem inventar um domínio provisório.
6. Faça o primeiro deploy.

O arquivo `vercel.json` já redireciona as rotas para `index.html`, permitindo que o React Router funcione como SPA em acessos diretos.

## Domínio personalizado

1. Registre um domínio disponível com um registrador de sua escolha.
2. Adicione o domínio no projeto da Vercel.
3. Configure no DNS os registros indicados pela Vercel.
4. Aguarde a propagação.
5. Verifique o HTTPS emitido pela plataforma.
6. Atualize `VITE_SITE_URL` com o domínio oficial.
7. Faça um novo deploy e atualize o sitemap/robots se necessário.

O projeto não registra, compra ou afirma disponibilidade de nenhum domínio.

## Backend

O backend fica em `server/` e usa Express, TypeScript, Prisma ORM e SQLite no desenvolvimento. A API possui autenticação administrativa com JWT e bcrypt, validação com Zod, CORS configurável, rate limiting e serviços separados.

### Instalação e execução

```bash
cd server
npm install
copy .env.example .env
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```

No macOS/Linux, substitua `copy` por `cp`. O arquivo `server/.env` deve conter valores locais reais e nunca deve ser commitado.

### Banco e seed

`DATABASE_URL="file:./dev.db"` usa SQLite. O schema é acessado exclusivamente pelo Prisma, permitindo trocar o provider por PostgreSQL futuramente sem acoplar controllers ao banco. O seed exige `ADMIN_EMAIL` e `ADMIN_PASSWORD` no ambiente e nunca contém senha hardcoded.

### Endpoints

| Método | Rota | Acesso |
| --- | --- | --- |
| GET | `/api/health` | Público |
| POST | `/api/auth/login` | Público, limitado |
| GET | `/api/procedures` | Público |
| GET | `/api/procedures/:slug` | Público |
| POST/PUT/DELETE | `/api/procedures` e `/:id` | Admin |
| GET | `/api/professionals` e `/:id` | Público |
| POST/PUT/DELETE | `/api/professionals` e `/:id` | Admin |
| POST | `/api/appointments` | Público, limitado |
| GET | `/api/appointments/availability` | Público |
| GET/PATCH/DELETE | `/api/appointments` e `/:id` | Admin |
| POST | `/api/contact` | Público, limitado |
| GET/PATCH | `/api/contact` e `/:id/status` | Admin |

Rotas administrativas usam `Authorization: Bearer <token>`. O endpoint público de agendamento cria solicitações `PENDING`; a regra de disponibilidade impede conflito para o mesmo profissional, data e horário quando houver registro `CONFIRMED`, retornando `409`.

### Build e produção

```bash
cd server
npm run build
npm start
```

Antes de produção, substitua SQLite conforme a infraestrutura escolhida, configure um `JWT_SECRET` longo e aleatório, restrinja `FRONTEND_URL`, defina backups, HTTPS, logs sem dados pessoais, e revise autenticação, retenção e proteção operacional.

## GitHub

Para preparar e publicar o primeiro commit localmente:

```bash
git init
git add .
git commit -m "feat: create AIROSA Estética website"
```

Depois crie um repositório vazio no GitHub e conecte-o:

```bash
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git branch -M main
git push -u origin main
```

Substitua os dois placeholders pelo repositório real. Nenhum repositório remoto é criado por este projeto.

## Melhorias futuras

- Backend de agendamento
- Banco de dados
- Painel administrativo
- Integração com calendário
- Notificações
- Analytics com configuração de privacidade
- Endereço e dados oficiais da clínica

## Observação

Conteúdos institucionais, contatos, profissionais, imagens e quaisquer depoimentos demonstrativos precisam ser substituídos pelos dados oficiais antes do uso comercial. A Política de Privacidade e os Termos de Uso também devem passar por revisão jurídica.
