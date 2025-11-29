# Guia: Migração SQLite → PostgreSQL para Netlify

## 📋 **Motivo da Migração**

O SQLite não funciona em Netlify Functions porque:
- Sistema de arquivos read-only
- Arquivos não são incluídos no bundle das functions
- Timing de criação vs empacotamento

## 🛠️ **Passo 1: Criar Banco PostgreSQL**

### Opção A: Railway (Recomendado - Gratuito)
1. Acesse [railway.app](https://railway.app)
2. Crie conta gratuita
3. **Create Project** → **Add PostgreSQL**
4. Copie a `DATABASE_URL` da aba **Variables**

### Opção B: Supabase (Também gratuito)
1. Acesse [supabase.com](https://supabase.com)
2. Crie projeto gratuito
3. Vá em **Settings** → **Database**
4. Copie a connection string

### Opção C: Neon (Moderno)
1. Acesse [neon.tech](https://neon.tech)
2. Crie conta gratuita
3. Crie um projeto
4. Copie a connection string

## 📝 **Passo 2: Atualizar Schema**

### Arquivo: `prisma/schema.prisma`
```prisma
// ANTES (SQLite)
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

// DEPOIS (PostgreSQL)
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 🔄 **Passo 3: Migrar Dados**

### 1. Instalar dependências PostgreSQL
```bash
npm install prisma @prisma/client
npm install -D pg  # Driver PostgreSQL
```

### 2. Resetar Prisma (IMPORTANTE!)
```bash
# Remover arquivos antigos
rm -rf node_modules/.prisma
rm -rf prisma/migrations
rm prisma/dev.db

# Reinstalar
npm install
```

### 3. Atualizar DATABASE_URL local
```bash
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/nusalegal"
```

### 4. Gerar nova migration
```bash
npx prisma generate
npx prisma db push  # Cria tabelas no PostgreSQL
npm run db:seed     # Popula dados
```

## 🌐 **Passo 4: Configurar Netlify**

### 1. Adicionar DATABASE_URL
**Netlify Dashboard** → **Site settings** → **Environment variables**:
```
DATABASE_URL = postgresql://user:password@host:port/database
```

### 2. Atualizar netlify.toml
```toml
[build]
command = "npx prisma generate && npx prisma migrate deploy && npm run db:seed && npm run build"
publish = "dist"
functions = ".netlify/functions-internal/server"

[build.environment]
NODE_VERSION = "24"
NODE_OPTIONS = "--max-old-space-size=4096"
DATABASE_URL = "postgresql://user:password@host:port/database"
```

## 🔧 **Passo 5: Reverter APIs para Prisma**

### Constitution API
```typescript:server/api/constitution/constitution.ts
import prisma from '../../utils/db'

export default defineEventHandler(async (event) => {
    validateApiAccess(event, 'constitution/constitution')

    const articles = await prisma.constitutionArticle.findMany({
        orderBy: { number: 'asc' }
    })

    return articles.map(article => ({
        title: article.title,
        description: article.summary,
        hasArticle: true,
        key: `article${article.number}`
    }))
})
```

### Bills API
```typescript:server/api/bills/congress.get.ts
import prisma from '../../utils/db'

export default defineEventHandler(async (event) => {
    validateApiAccess(event, 'bills/congress')

    const bills = await prisma.bill.findMany({
        where: { category: 'congress' },
        orderBy: { createdAt: 'desc' }
    })

    return bills.map(bill => ({
        number: bill.number,
        title: bill.description,
        category: bill.category,
        type: bill.type
    }))
})
```

## 🧪 **Passo 6: Testar**

### Local
```bash
npm run dev
# Testar APIs: http://localhost:3000/api/constitution/constitution
```

### Produção
```bash
# Deploy no Netlify
# Testar APIs no domínio do Netlify
```

## 🔄 **Passo 7: Rollback (se necessário)**

Se der problema, volte para dados estáticos:

```bash
git checkout static-data-branch
```

## ✅ **Benefícios do PostgreSQL**

- ✅ **Persistente** - Dados ficam salvos
- ✅ **Escalável** - Suporta múltiplos usuários
- ✅ **Confiável** - Não depende do filesystem
- ✅ **Moderno** - Funciona em serverless

## 🎯 **Resultado Esperado**

Após essa migração:
- APIs funcionam perfeitamente no Netlify
- Dados persistem entre deploys
- Performance melhor
- Escalabilidade garantida

**🚀 Pronto para produção!**
