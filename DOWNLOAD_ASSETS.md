# Инструкции по скачиванию медиа-файлов

Скачайте файлы с `https://kontent-zavod-ai.ru/wp/wp-content/uploads/2025/12/` и сохраните их в папку `public/assets/`.

## Файлы для скачивания

### 1. Andrey Fedorchuk (Андрей Федорчук)
```
Исходный URL: https://kontent-zavod-ai.ru/wp/wp-content/uploads/2025/12/chatgpt-image-22-dek.-2025-g.-22_39_51.png
Сохранить как: public/assets/andrej-fedorchuk.png

Исходный URL: https://kontent-zavod-ai.ru/wp/wp-content/uploads/2025/12/andrej-ozvuchka.mp3
Сохранить как: public/assets/andrej-audio.mp3
```

### 2. Sergey Fedorchuk (Сергей Федорчук)
```
Исходный URL: https://kontent-zavod-ai.ru/wp/wp-content/uploads/2025/12/chatgpt-image-22-dek.-2025-g.-22_47_49.png
Сохранить как: public/assets/sergej-fedorchuk.png

Исходный URL: https://kontent-zavod-ai.ru/wp/wp-content/uploads/2025/12/sergej-ozvuchka.mp3
Сохранить как: public/assets/sergej-audio.mp3
```

### 3. Almas Aznabaev (Алмас Азнабаев)
```
Исходный URL: https://kontent-zavod-ai.ru/wp/wp-content/uploads/2025/12/chatgpt-image-22-dek.-2025-g.-22_15_04.png
Сохранить как: public/assets/almas-aznabaev.png

Исходный URL: https://kontent-zavod-ai.ru/wp/wp-content/uploads/2025/12/rovno-v-polnoch.mp3
Сохранить как: public/assets/almas-audio.mp3
```

### 4. About Us (О нас)
```
Исходный URL: https://kontent-zavod-ai.ru/wp/wp-content/uploads/2025/12/d4f85c2e5cfb3c6d2968b4b4249363a0_1766500655.png
Сохранить как: public/assets/about-us.png
```

## Итоговая структура папки

После скачивания файлов структура должна быть такой:

```
public/
  └── assets/
      ├── andrej-fedorchuk.png
      ├── andrej-audio.mp3
      ├── sergej-fedorchuk.png
      ├── sergej-audio.mp3
      ├── almas-aznabaev.png
      ├── almas-audio.mp3
      └── about-us.png
```

## Способ 1: Скачать вручную через браузер

1. Откройте каждую ссылку выше в браузере
2. Сохраните файл с указанным именем в папку `public/assets/`
3. Повторите для всех 7 файлов

## Способ 2: Скачать через терминал (Linux/macOS)

```bash
cd public/assets

# Andrey Fedorchuk
wget -O andrej-fedorchuk.png "https://kontent-zavod-ai.ru/wp/wp-content/uploads/2025/12/chatgpt-image-22-dek.-2025-g.-22_39_51.png"
wget -O andrej-audio.mp3 "https://kontent-zavod-ai.ru/wp/wp-content/uploads/2025/12/andrej-ozvuchka.mp3"

# Sergey Fedorchuk
wget -O sergej-fedorchuk.png "https://kontent-zavod-ai.ru/wp/wp-content/uploads/2025/12/chatgpt-image-22-dek.-2025-g.-22_47_49.png"
wget -O sergej-audio.mp3 "https://kontent-zavod-ai.ru/wp/wp-content/uploads/2025/12/sergej-ozvuchka.mp3"

# Almas Aznabaev
wget -O almas-aznabaev.png "https://kontent-zavod-ai.ru/wp/wp-content/uploads/2025/12/chatgpt-image-22-dek.-2025-g.-22_15_04.png"
wget -O almas-audio.mp3 "https://kontent-zavod-ai.ru/wp/wp-content/uploads/2025/12/rovno-v-polnoch.mp3"

# About Us
wget -O about-us.png "https://kontent-zavod-ai.ru/wp/wp-content/uploads/2025/12/d4f85c2e5cfb3c6d2968b4b4249363a0_1766500655.png"
```

## После скачивания файлов

Перезапустите dev-сервер для применения изменений:

```bash
npm run dev
```

Проверьте, что:
1. Изображения в разделе "Команда" (Team) загружаются корректно
2. Аудио в модальных окнах воспроизводится
3. В ImagePlayground генерация изображений через Kie.ai работает
4. Chat с OpenAI отвечает на вопросы
