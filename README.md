# Orders & Products SPA

Single Page Application для управління продуктами та відображення інформації про користувача з WebSocket-сесіями.

## 🔧 Технології

- **React** + **TypeScript**
- **Redux Toolkit**
- **React Router**
- **WebSocket**
- **CSS Modules**, **Bootstrap**
- **Vite** (для швидкої розробки)
- **React Icons**, **React Hot Toast**

---

## ✅ Реалізовано

### 📦 ProductsPage

- [x] Ініціалізація продуктів через Redux (`setProducts`) з даних `generateRandomProducts`
- [x] Пошук за назвою
- [x] Фільтрація за типом
- [x] Сортування за ціною (USD)
- [x] Розгортання/згортання рядків з додатковими деталями
- [x] Модалка підтвердження видалення (`ConfirmDeleteModal`) з назвою продукту та серійним номером
- [x] Видалення продукту через Redux (`deleteProduct`)
- [x] Використано іконки для UI-покращення
- [x] Адаптивна таблиця з мобільною версткою (через `data-label` і медіа-запити)
- [x] Стилізоване розгортання з `.details`-секцією

### 👤 ProfilePage

- [x] Вивід інформації про користувача: **Ім’я**, **Email**, **Дата входу**
- [x] Показ реальної кількості WebSocket-сесій через `sessionCount` зі стору
- [x] Адаптивна верстка з Bootstrap/власними стилями

### 🔌 Інтеграції

- [x] WebSocket підключення
- [x] WebSocket-сесії зберігаються у Redux

---

## 📁 Структура проєкту

```
src/
│
├── components/
│   └── ConfirmDeleteModal/
├── data/
│   └── productData.ts
├── pages/
│   ├── OrdersPage.tsx
│   └── ProductsPage.tsx
    └── ProfilePage.tsx
├── services/
│   ├── productService.ts
│   └── websocketService.ts
├── slices/
│   ├── productsSlice.ts
│   └── sessionSlice.ts
├── store/
│   └── store.ts
├── types/
│   └── product.ts
└── App.tsx
```

---

## 🧪 Як запустити

1. Клонувати репозиторій:

   ```bash
   git clone https://github.com/your-username/orders-products-app.git
   cd orders-products-app
   ```

2. Встановити залежності:

   ```bash
   npm install
   ```

3. Запустити:

   ```bash
   npm run dev
   ```

   🛰 WebSocket Server
   Цей проєкт включає WebSocket-сервер для відстеження кількості активних сесій.

   ▶️ Запуск сервера
   У новій вкладці термінала виконай:

   ```bash
   npm run ws-server
   ```

---

Login Credentials
Для доступу до адміністративної частини (або будь-якої захищеної зони) використовуйте такі дані:

Username: admin

## Password: admin

## 👨‍💻 Автор

**Stanislav Tatarchuk**  
🌍 Vilnius, Lithuania  
📧 [stasyk55@gmail.com](mailto:stasyk55@gmail.com)  
🔗 [GitHub — StanislavJS](https://github.com/StanislavJS)

---

## 📜 Ліцензія

Проєкт створено для демонстрації навичок та виконання тестового завдання. Всі права захищені.
