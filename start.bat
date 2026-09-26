@echo off
chcp 65001 > nul
title Запуск сайта Keramika Sintez (infraks.ru)
echo ========================================================
echo   Запуск сайта Keramika Sintez (на основе infraks.ru)
echo ========================================================
echo.

cd /d "%~dp0"

if not exist "node_modules" (
    echo [1/2] Установка необходимых пакетов (npm install)...
    call npm.cmd install
    if errorlevel 1 (
        echo Ошибка при установке пакетов!
        pause
        exit /b %errorlevel%
    )
)

echo [2/2] Запуск сервера разработки (Vite)...
echo Сайт откроется автоматически в браузере: http://localhost:5173
echo Для остановки нажмите Ctrl + C
echo.

call npm.cmd run dev
pause
