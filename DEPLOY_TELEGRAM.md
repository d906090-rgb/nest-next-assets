# Telegram Интеграция

## Текущая настройка

- **Bot Token:** `7956651051:AAFbK2X4eXNN1nLrDO-y7T6Yix_ciLxIZRA` (@neyrozavodbot)
- **Chat ID (User):** `392126069` (@ReanimatorXP)
- **Chat ID (Group):** `-1003131792967` (@maketestReanim - "Заказы")

**Сейчас активна:** Группа @maketestReanim

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
curl -s "https://api.telegram.org/bot7956651051:AAFbK2X4eXNN1nLrDO-y7T6Yix_ciLxIZRA/sendMessage?chat_id=392126069&text=Test&parse_mode=HTML"

# Тест отправки в группу
curl -s "https://api.telegram.org/bot7956651051:AAFbK2X4eXNN1nLrDO-y7T6Yix_ciLxIZRA/sendMessage?chat_id=-1003131792967&text=Test&parse_mode=HTML"
```

## Переменные окружения

В `.env` файле:
```
TELEGRAM_BOT_TOKEN=7956651051:AAFbK2X4eXNN1nLrDO-y7T6Yix_ciLxIZRA
TELEGRAM_CHAT_ID=392126069
```

## Как сменить получателя

Для отправки в группу вместо личку пользователя:

**В `App.tsx` (строка 1086):**
```typescript
const chatId = process.env.TELEGRAM_CHAT_ID || '-1003131792967';
```

**Или обновить `.env`:**
```
TELEGRAM_CHAT_ID=-1003131792967
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
