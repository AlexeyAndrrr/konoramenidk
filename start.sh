#!/bin/bash

echo "🚀 Запуск KONO сайта..."

# Проверяем, установлен ли Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен. Пожалуйста, установите Node.js версии 14+"
    exit 1
fi

# Проверяем версию Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "❌ Требуется Node.js версии 14+. Текущая версия: $(node -v)"
    exit 1
fi

echo "✅ Node.js версии $(node -v) найден"

# Проверяем, установлены ли зависимости
if [ ! -d "node_modules" ]; then
    echo "📦 Устанавливаем зависимости..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Ошибка при установке зависимостей"
        exit 1
    fi
    echo "✅ Зависимости установлены"
else
    echo "✅ Зависимости уже установлены"
fi

# Запускаем приложение
echo "🌐 Запускаем сервер на http://localhost:3000"
echo "📱 Нажмите Ctrl+C для остановки"
echo ""

npm start
