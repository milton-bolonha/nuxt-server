# nUSA Legal

Sistema jurídico completo para nUSA P.S ROBLOX ROLEPLAY.

## 🚀 Como executar

### 🎯 Comando Único (Mais Fácil!)

```bash
npm start
# ou
npm run all
```

Este comando faz **TUDO** automaticamente:

1. 📦 Gera cliente Prisma
2. 🗄️ Sincroniza schema do banco
3. 🌱 Popula banco com dados
4. 🚀 Inicia servidor de desenvolvimento

### 🔧 Comandos Alternativos

```bash
# Mesmo efeito que npm start:
npm run start
npm run startapp
npm run all

# Apenas servidor (sem configurar banco):
npm run dev
```

### 🛑 Como parar

```bash
npm run stop
# ou
taskkill /f /im node.exe
```

### Opção 2: Passo a passo manual

```bash
# 1. Instalar dependências
npm install

# 2. Configurar banco
npx prisma generate
npx prisma db push
npx prisma db seed

# 3. Iniciar desenvolvimento
npm run dev
```

## 📊 Scripts disponíveis

| Comando             | Descrição                       |
| ------------------- | ------------------------------- |
| `npm start`         | 🎯 **FAZ TUDO** (Recomendado!)  |
| `npm run all`       | 🎯 Mesmo que `npm start`        |
| `npm run start`     | 🚀 Executa tudo automaticamente |
| `npm run stop`      | 🛑 Para todos os processos Node |
| `npm run dev`       | 🔧 Apenas servidor (sem banco)  |
| `npm run build`     | 📦 Build para produção          |
| `npm run db:studio` | 🗄️ Interface gráfica do banco   |
| `npm run db:seed`   | 🌱 Popular banco com dados      |
| `npm run db:push`   | 🔄 Sincronizar schema           |

## 🔧 Tecnologias

-   **Nuxt 4** - Framework Vue.js full-stack
-   **Prisma** - ORM para banco de dados
-   **SQLite** - Banco de dados local
-   **Tailwind CSS** - Estilização
-   **Ably** - Tempo real (lobby system)

## 🌐 Acesso

Após executar, acesse:

-   **Aplicação**: http://127.0.0.1:3001
-   **DevTools**: Shift + Alt + D no navegador

## 🚀 Deploy no Netlify

O projeto está configurado para deploy automático no Netlify:

### Arquivos de Configuração:
- `netlify.toml` - Configurações de build e deploy
- `.output/public` - Arquivos estáticos gerados
- `.netlify/functions-internal` - Funções server-side

### Processo de Build:
1. Build do Nuxt (client + server)
2. Inicialização automática do banco no runtime
3. Deploy automático no Netlify

### Banco de Dados:
- SQLite local para desenvolvimento
- Inicialização automática no runtime do Netlify
- Dados populados automaticamente na primeira execução

### Variáveis de Ambiente no Netlify:
Configure no painel do Netlify:
```
DATABASE_URL=file:./prisma/dev.db
TOKEN_SECRET=your-token-here
SESSION_SECRET=your-session-here
ALLOWED_ORIGINS=https://your-domain.netlify.app
```

## 📝 Desenvolvimento

1. Clone o repositório
2. Execute `npm run start`
3. Abra http://127.0.0.1:3001
4. Comece a desenvolver!

## 🐛 Problemas comuns

### "Cannot access 'renderer$1' before initialization"

-   Execute `npm run start` para configurar tudo automaticamente

### Portas ocupadas (porta 3001 já em uso)

```bash
npm run stop
# ou
taskkill /f /im node.exe
```

### Dados não carregam

-   Verifique se executou `npm run start` ou `npx prisma db seed`

### Erro no Prisma generate

-   Execute `npm run stop` primeiro para liberar arquivos
-   Depois execute `npm run start`

### Servidor não inicia

-   Verifique se a porta 3001 está livre
-   Execute `netstat -ano | findstr :3001` para ver se há processos usando a porta
