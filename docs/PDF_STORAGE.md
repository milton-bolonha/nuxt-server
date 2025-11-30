# Configuração de Storage para PDFs

## Visão Geral

Os PDFs privados não são incluídos no bundle Lambda para evitar exceder os limites de tamanho (250MB descompactado / 50MB compactado). Em vez disso, eles são servidos de um storage externo ou do sistema de arquivos local.

## Configuração

### Opção 1: Sistema de Arquivos Local (Desenvolvimento)

Para desenvolvimento local, os PDFs são automaticamente servidos do diretório `server/bills/`. Nenhuma configuração adicional é necessária.

### Opção 2: Netlify Blobs (Produção - Recomendado para Netlify)

**Esta é a solução nativa do Netlify e não requer serviços externos!**

O Netlify Blobs é um storage nativo do Netlify que permite armazenar arquivos binários de forma eficiente.

#### Configuração:

1. **Instalar o SDK do Netlify Blobs:**
   ```bash
   npm install @netlify/blobs
   ```

2. **Criar um script para fazer upload dos PDFs:**
   Use o script `scripts/upload-pdfs-to-blobs.js` (veja abaixo) para fazer upload dos PDFs para o Netlify Blobs.

3. **Configurar variável de ambiente (opcional):**
   ```bash
   NETLIFY_BLOBS_STORE_NAME=pdfs
   ```
   (Padrão: `pdfs` se não especificado)

4. **Fazer upload dos PDFs:**
   ```bash
   NETLIFY_ACCESS_TOKEN=seu-token npm run upload-pdfs
   ```
   
   Ou configure o token no Netlify CLI:
   ```bash
   netlify login
   npm run upload-pdfs
   ```

#### Como funciona:

- Os PDFs são armazenados no Netlify Blobs com a chave sendo o `filePath` (ex: `bills/hr1.pdf`)
- O sistema detecta automaticamente que está no Netlify e usa o Blobs
- Não precisa de configuração adicional - funciona automaticamente quando `process.env.NETLIFY` está definido

### Opção 3: Amazon S3 (Alternativa Externa)

Se preferir usar S3 em vez do Netlify Blobs:

1. Crie um bucket S3 para os PDFs
2. Configure as variáveis de ambiente no Netlify:

```
PDF_STORAGE_S3_BUCKET=seu-bucket-name
PDF_STORAGE_S3_REGION=us-east-1
PDF_STORAGE_S3_ACCESS_KEY_ID=suas-credentials (opcional, se usar IAM role)
PDF_STORAGE_S3_SECRET_ACCESS_KEY=suas-credentials (opcional, se usar IAM role)
```

3. Estrutura no S3:
   - Os PDFs devem estar em `s3://seu-bucket/bills/`
   - A estrutura de diretórios deve corresponder à estrutura em `server/bills/`
   - Exemplo: `s3://seu-bucket/bills/bills/hr1.pdf`

4. Upload dos PDFs:
   - Faça upload dos PDFs do diretório `server/bills/` para o bucket S3
   - Mantenha a mesma estrutura de diretórios

## Segurança

- O sistema de tokens continua funcionando normalmente
- Os PDFs são servidos apenas através do endpoint `/api/pdf/[token]`
- O token valida o acesso antes de buscar o arquivo do storage
- No Netlify Blobs, os arquivos são privados por padrão e só acessíveis via API

## Ordem de Prioridade

O sistema escolhe automaticamente o storage na seguinte ordem:

1. **Netlify Blobs** - Se `process.env.NETLIFY` estiver definido (produção no Netlify)
2. **S3** - Se `PDF_STORAGE_S3_BUCKET` estiver configurado
3. **Sistema de Arquivos Local** - Fallback para desenvolvimento

## Troubleshooting

### PDFs não encontrados em produção

1. Verifique se os PDFs foram enviados para o Netlify Blobs usando o script de upload
2. Verifique os logs do Netlify para erros
3. Certifique-se de que `process.env.NETLIFY` está definido no ambiente de produção

### Erro ao fazer upload para Netlify Blobs

- Certifique-se de que o `NETLIFY_ACCESS_TOKEN` está configurado
- Ou faça login no Netlify CLI: `netlify login`
- Verifique se você tem permissões no site do Netlify

### Erro de credenciais S3 (se usar S3)

- Se estiver usando IAM roles, certifique-se de que a role tem permissões `s3:GetObject` no bucket
- Se estiver usando credenciais, verifique se elas estão corretas e têm as permissões necessárias

## Dependências

### Para Netlify Blobs (Recomendado):
```bash
npm install @netlify/blobs
```

### Para S3 (Alternativa):
```bash
npm install @aws-sdk/client-s3
```

Os SDKs serão carregados dinamicamente apenas quando necessário, evitando aumentar o tamanho do bundle se não forem usados.
