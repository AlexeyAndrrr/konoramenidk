@echo off
chcp 65001 >nul
echo 🚀 Запуск KONO сайта...

REM Проверяем, установлен ли Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js не установлен. Пожалуйста, установите Node.js версии 14+
    pause
    exit /b 1
)

echo ✅ Node.js найден

REM Проверяем, установлены ли зависимости
if not exist "node_modules" (
    echo 📦 Устанавливаем зависимости...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Ошибка при установке зависимостей
        pause
        exit /b 1
    )
    echo ✅ Зависимости установлены
) else (
    echo ✅ Зависимости уже установлены
)

REM Запускаем приложение
echo 🌐 Запускаем сервер на http://localhost:3000
echo 📱 Нажмите Ctrl+C для остановки
echo.

npm start

pause
