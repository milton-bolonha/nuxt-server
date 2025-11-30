# Changelog - Implementação de Storage Externo para PDFs

## Resumo das Mudanças

Implementado sistema de storage externo para PDFs privados, removendo-os do bundle Lambda para evitar exceder os limites de tamanho.

## Arquivos Modificados

### 1. `package.json`
- ✅ Removido script `copy-pdfs` do comando `build`
- ✅ Removido script `copy-pdfs` standalone

### 2. `nuxt.config.ts`
- ✅ Removido hook `nitro:build:after` que copiava PDFs para o bundle
- ✅ Removidas importações desnecessárias (`cpSync`, `existsSync`, `join`)
- ✅ Atualizados comentários explicando que PDFs não são incluídos no bundle

### 3. `server/api/pdf/[token].ts`
- ✅ Simplificado completamente - removido código de debug extensivo
- ✅ Agora usa `getPdfFromStorage()` do novo utilitário
- ✅ Mantido sistema de validação de tokens

### 4. `netlify.toml`
- ✅ Atualizada seção `[functions]` com nota sobre storage externo

## Arquivos Criados

### 1. `server/utils/pdfStorage.ts`
- ✅ Sistema modular de adaptadores de storage
- ✅ `FileSystemStorageAdapter` - para desenvolvimento local
- ✅ `S3StorageAdapter` - para produção com AWS S3
- ✅ Factory pattern para selecionar adaptador baseado em variáveis de ambiente

### 2. `docs/PDF_STORAGE.md`
- ✅ Documentação completa sobre como configurar storage externo
- ✅ Instruções para desenvolvimento e produção
- ✅ Troubleshooting guide

## Arquivos Removidos

### 1. `scripts/copy-pdfs.js`
- ✅ Removido - não é mais necessário copiar PDFs para o bundle

## Configuração Necessária

### Para Desenvolvimento
Nenhuma configuração adicional necessária. Os PDFs são servidos do diretório `server/bills/`.

### Para Produção (S3)
Configurar as seguintes variáveis de ambiente no Netlify:
- `PDF_STORAGE_S3_BUCKET` - Nome do bucket S3
- `PDF_STORAGE_S3_REGION` - Região do bucket (padrão: us-east-1)
- `PDF_STORAGE_S3_ACCESS_KEY_ID` (opcional) - Se não usar IAM role
- `PDF_STORAGE_S3_SECRET_ACCESS_KEY` (opcional) - Se não usar IAM role

Instalar dependência (se usar S3):
```bash
npm install @aws-sdk/client-s3
```

## Próximos Passos

1. Testar localmente para garantir que funciona em desenvolvimento
2. Configurar S3 bucket e fazer upload dos PDFs
3. Configurar variáveis de ambiente no Netlify
4. Fazer deploy e testar que o bundle está dentro dos limites
5. Verificar que os PDFs são acessíveis via tokens

## Benefícios

- ✅ Bundle Lambda reduzido (não inclui PDFs)
- ✅ Sistema flexível (funciona com diferentes storages)
- ✅ Mantém segurança (sistema de tokens continua funcionando)
- ✅ Fácil de estender (adicionar novos adaptadores no futuro)

