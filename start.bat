@echo off
echo 🚀 Iniciando nUSA Legal...
echo.

echo 📦 Gerando cliente Prisma...
npx prisma generate
if %errorlevel% neq 0 (
    echo ❌ Erro ao gerar cliente Prisma
    pause
    exit /b 1
)

echo.
echo 🗄️ Sincronizando schema do banco...
npx prisma db push
if %errorlevel% neq 0 (
    echo ❌ Erro ao sincronizar banco
    pause
    exit /b 1
)

echo.
echo 🌱 Populando banco com dados...
npx prisma db seed
if %errorlevel% neq 0 (
    echo ❌ Erro ao popular banco
    pause
    exit /b 1
)

echo.
echo ✅ Banco de dados pronto!
echo.

echo 🚀 Iniciando servidor de desenvolvimento...
npm run dev
