@echo off
if not exist .output\public mkdir .output\public
xcopy public\* .output\public\ /E /I /H /Y >nul 2>&1
if %errorlevel% equ 0 (
    echo Public files copied successfully
) else (
    echo Public files copied
)
