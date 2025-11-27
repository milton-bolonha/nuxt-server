@echo off
echo 🛑 Parando todos os processos Node.js...
taskkill /f /im node.exe 2>nul
if %errorlevel% equ 0 (
    echo ✅ Todos os processos Node foram finalizados!
) else (
    echo ℹ️ Nenhum processo Node estava rodando.
)
echo.
pause
