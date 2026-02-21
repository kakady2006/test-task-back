# Parcel Admin Backend

Простой бэкенд на json-server для тестового задания по администрированию посылок.

## Запуск

```bash
npm install
npm start
```

Сервер запустится на `http://localhost:3001`

## API Endpoints

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/pickupPoints` | Список пунктов выдачи |
| GET | `/dates/:id` | Доступные даты для ПВЗ |
| GET | `/orders` | Список посылок |
| POST | `/orders` | Создать посылку |

### Пример POST /orders

```json
{
  "date": "2025-01-22",
  "pickupPointId": "86315e07-ff69-4be1-af51-9f37d5649fdd",
  "packageNumber": 106,
  "recipientName": "Василий"
}
```

## Особенности

- Задержка 1200мс на все запросы (имитация реального API)
- Данные хранятся в `db.json`
- У каждого ПВЗ свой набор доступных дат
