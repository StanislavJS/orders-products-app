# 🧾 Orders & Products SPA

**Single Page Application** для управління продуктами та перегляду інформації про користувача, з підтримкою WebSocket-сесій.

---

## 🔧 Технології

- ⚛️ React + TypeScript
- 🧰 Redux Toolkit
- 📡 WebSocket
- 🔀 React Router
- 🎨 CSS Modules + Bootstrap
- ⚡ Vite
- 🔔 React Hot Toast
- 🎯 React Icons

---

## ✅ Реалізовано

### 📦 Products Page

- Ініціалізація продуктів через Redux (дані з `generateRandomProducts`)
- Пошук за назвою
- Фільтрація за типом
- Сортування за ціною (USD)
- Розгортання/згортання рядків з деталями
- Модалка підтвердження видалення продукту (назва + серійний номер)
- Видалення через Redux
- Адаптивна таблиця (data-label + media queries)
- Іконки для покращення UI

### 👤 Profile Page

- Вивід: Ім’я, Email, Дата входу
- Відображення кількості WebSocket-сесій (`sessionCount`)
- Адаптивна верстка

---

## 🔌 Інтеграції

- Реальне WebSocket-з'єднання (`useWebSocket`)
- Зберігання кількості сесій у Redux

---

## 📁 Структура проєкту

src/
├── components/
│ └── ConfirmDeleteModal/
├── data/
│ └── productData.ts
├── hooks/
│ └── useWebSocket.ts
├── pages/
│ ├── OrdersPage.tsx
│ ├── ProductsPage.tsx
│ └── ProfilePage.tsx
├── services/
│ ├── productService.ts
│ └── websocketService.ts
├── slices/
│ ├── productsSlice.ts
│ └── sessionSlice.ts
├── store/
│ └── store.ts
├── types/
│ └── product.ts
└── App.tsx

---

## 🧪 Як запустити

### 🔁 Клонування

```bash
git clone https://github.com/StanislavJS/orders-products-app.git
cd orders-products-app
```

📦 Встановлення залежностей
npm install

🚀 Запуск клієнта (SPA)
npm run dev

🛰 WebSocket-сервер
Цей проєкт використовує окремий WebSocket-сервер для трекінгу активних сесій.

▶️ Запуск WS-серверу
📍 Він знаходиться в іншому репозиторії: orders-products-ws-server

cd ../orders-products-ws-server
npm install
npm run start

🌐 У клієнтському SPA WebSocket URL вже вшитий:
const WEBSOCKET_URL = 'wss://orders-products-ws-server-production.up.railway.app';

🔐 Доступ
Вхід у систему через модальне вікно логіну:
Username: admin
Password: admin

👨‍💻 Автор
Stanislav Tatarchuk
📍 Vilnius, Lithuania
📧 stasyk55@gmail.com
🔗 GitHub — StanislavJS
