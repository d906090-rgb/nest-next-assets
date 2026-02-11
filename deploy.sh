#!/bin/bash

# Скрипт для деплоя изменений сайта

echo "🚀 Starting deployment..."

cd "$(dirname "$0")"

# 1. Очистка кэша
echo "🧹 Clearing cache..."
rm -rf node_modules/.vite dist

# 2. Сборка
echo "🔨 Building..."
npm run build

# 3. Копирование файлов с сохранением старых имён
echo "📦 Copying files to assets/"
cp dist/assets/index-*.js assets/index-CICZmVp6.js
cp dist/assets/index-*.css assets/index-4qhlatjO.css

# 4. Проверка chat_id
echo "🔍 Verifying Telegram configuration..."
CHAT_ID=$(grep -a "chat_id=" assets/index-CICZmVp6.js | head -1 | grep -oE "chat_id=-?[0-9]+")
echo "Current chat_id: $CHAT_ID"

if [ "$CHAT_ID" == "chat_id=392126069" ]; then
  echo "⚠️  Messages will go to user (@ReanimatorXP)"
elif [ "$CHAT_ID" == "chat_id=-1003131792967" ]; then
  echo "✅ Messages will go to group (@maketestReanim)"
else
  echo "❓ Unknown chat_id"
fi

echo "✅ Deployment complete!"
