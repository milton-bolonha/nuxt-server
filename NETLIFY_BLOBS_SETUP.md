# Configuração do Netlify Blobs para PDFs

## ✅ Solução Implementada

Agora o sistema **funciona nativamente no Netlify** usando **Netlify Blobs** - sem precisar de S3 ou outros serviços externos!

## Como Funciona

1. **Em desenvolvimento local**: Os PDFs são servidos do diretório `server/bills/` (sistema de arquivos)
2. **No Netlify (produção)**: Os PDFs são automaticamente servidos do **Netlify Blobs** quando `process.env.NETLIFY` está definido

## Passos para Configurar

### 1. Instalar o SDK do Netlify Blobs

```bash
npm install @netlify/blobs
```

### 2. Fazer Upload dos PDFs para o Netlify Blobs

**Opção A: Usando o script (Recomendado)**

```bash
# Faça login no Netlify CLI primeiro
netlify login

# Execute o script de upload
npm run upload-pdfs
```

**Opção B: Usando token de acesso**

```bash
NETLIFY_ACCESS_TOKEN=seu-token npm run upload-pdfs
```

O script irá:
- Encontrar todos os PDFs em `server/bills/`
- Fazer upload para o Netlify Blobs
- Manter a mesma estrutura de diretórios (ex: `bills/hr1.pdf`)

### 3. Deploy

Após fazer o upload, faça o deploy normalmente:

```bash
git add .
git commit -m "Configure Netlify Blobs for PDFs"
git push
```

O Netlify irá:
- Detectar automaticamente que está no ambiente Netlify
- Usar o Netlify Blobs para servir os PDFs
- **Não incluir os PDFs no bundle Lambda** (resolvendo o problema de tamanho!)

## Verificação

Após o deploy, os PDFs devem funcionar normalmente através do endpoint `/api/pdf/[token]`, mas agora serão servidos do Netlify Blobs em vez do bundle.

## Vantagens

✅ **Nativo do Netlify** - Não precisa de serviços externos  
✅ **Sem custos adicionais** - Netlify Blobs está incluído  
✅ **Bundle menor** - PDFs não são incluídos no Lambda  
✅ **Automático** - Detecta o ambiente e usa o storage correto  
✅ **Seguro** - Mantém o sistema de tokens funcionando  

## Troubleshooting

### PDFs não encontrados após deploy

1. Certifique-se de que fez o upload dos PDFs: `npm run upload-pdfs`
2. Verifique os logs do Netlify para erros
3. Confirme que `process.env.NETLIFY` está definido (deve estar automaticamente no Netlify)

### Erro ao fazer upload

- Certifique-se de estar logado: `netlify login`
- Ou configure o token: `export NETLIFY_ACCESS_TOKEN=seu-token`
- Verifique se você tem permissões no site do Netlify

### Erro "getStore is not a function"

- Certifique-se de que `@netlify/blobs` está instalado: `npm install @netlify/blobs`
- Verifique se está usando a versão correta do SDK

## Estrutura no Netlify Blobs

Os PDFs são armazenados com a chave sendo o caminho relativo:
- `bills/hr1.pdf`
- `bills/dcbills/arquivo.pdf`
- `bills/constitution/TimCons_May_2025.pdf`
- etc.

Isso corresponde exatamente à estrutura em `server/bills/`.

