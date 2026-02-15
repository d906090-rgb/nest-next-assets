# Telegram Интеграция

## Текущая настройка

- **Bot Token:** `YOUR_TELEGRAM_BOT_TOKEN` (@your_bot_username)
- **Chat ID (User):** `YOUR_USER_CHAT_ID`
- **Chat ID (Group):** `YOUR_GROUP_CHAT_ID` (@your_group - "Orders")

**Сейчас активна:** Группа (укажите вашу)

## Как развернуть изменения

```bash
cd /var/www/www-root/data/www/tecai.ru

# 1. Очистить кэш Vite
rm -rf node_modules/.vite dist

# 2. Собрать проект
npm run build

# 3. Скопировать файлы в assets (используя старые имена файлов для совместимости)
cp dist/assets/index-*.js assets/index-CICZmVp6.js
cp dist/assets/index-*.css assets/index-4qhlatjO.css
```

## Тестирование Telegram

```bash
# Тест отправки сообщения пользователю
curl -s "https://api.telegram.org/botYOUR_TELEGRAM_BOT_TOKEN/sendMessage?chat_id=YOUR_USER_CHAT_ID&text=Test&parse_mode=HTML"

# Тест отправки в группу
curl -s "https://api.telegram.org/botYOUR_TELEGRAM_BOT_TOKEN/sendMessage?chat_id=YOUR_GROUP_CHAT_ID&text=Test&parse_mode=HTML"
```

## Переменные окружения

В `.env` файле:
```
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID=YOUR_DEFAULT_CHAT_ID
```

## Как сменить получателя

Для отправки в группу вместо личку пользователя:

**В `App.tsx` (строка 1086):**
```typescript
const chatId = process.env.TELEGRAM_CHAT_ID || 'YOUR_GROUP_CHAT_ID';
```

**Или обновить `.env`:**
```
TELEGRAM_CHAT_ID=YOUR_GROUP_CHAT_ID
```

## Диагностика проблем

1. **Откройте DevTools (F12) → Console**
2. **Нажмите Complete в форме**
3. **Проверьте логи:**
   - ✅ `"Message sent successfully to Telegram"` — всё работает
   - ❌ `"Telegram API Error: {...}"` — ошибка API Telegram
   - ❌ `"Telegram Network Error: ..."` — проблема с сетью

## Частые ошибки

| Ошибка | Решение |
|--------|---------|
| `Forbidden: bots can't send messages to bots` | `chat_id` указывает на ID бота, а не пользователя |
| `Bad Request: chat not found` | Неправильный `chat_id` |
| `Unauthorized: invalid token` | Проверьте `TELEGRAM_BOT_TOKEN` |

## Получить свой Chat ID

**Способ 1 — @userinfobot:**
- Откройте @userinfobot
- Напишите `/start`
- Увидите ваш `Id`

**Способ 2 — через @GetMyIdBot:**
- Откройте @GetMyIdBot
- Нажмите Start
- Получите ID
