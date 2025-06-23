# 🛒 Shopping Cart App

```
----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------|---------|----------|---------|---------|-------------------
All files       |     100 |      100 |     100 |     100 |                  
 src            |     100 |      100 |     100 |     100 |                  
  App.tsx       |     100 |      100 |     100 |     100 |                  
 src/components |     100 |      100 |     100 |     100 |                  
  Cart.tsx      |     100 |      100 |     100 |     100 |                  
----------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        8.089 s
Ran all test suites.
```

A modern Shopping Cart built with **React**, **Vite**, **TypeScript**, and **Jest** using the **Test-Driven Development (TDD)** approach.

---

## ⚙️ Tech Stack

- 🔧 Vite (React + TS)
- ⚛️ React 18
- 🧪 Jest + Testing Library
- ✅ TypeScript
- 🧹 ESLint + Prettier (optional)
- 💡 TDD methodology

---

## 📁 Project Structure

```
shopping-cart-app/
├── index.html
├── vite.config.ts
├── jest.config.js
├── tsconfig.json
├── package.json
└── src/
    ├── main.tsx
    ├── App.tsx
    └── components/
        ├── Cart.tsx
        └── Cart.test.tsx
```

---

## 🚀 Getting Started

### 1. 📦 Install dependencies

```bash
npm install
```

### 2. ▶️ Run the dev server

```bash
npm run dev
```

Navigate to [http://localhost:5173](http://localhost:5173)

---

## 🧪 Running Tests

### Run all unit tests
```bash
npm run test
```

### Watch mode (TDD-style)
```bash
npm run test:watch
```

### Generate coverage report
```bash
npm run test:coverage
```

> 💡 Coverage results will be available inside the `coverage/` directory.

---

## ✅ Features

- 🛒 Add, remove, and update items in the cart
- 📊 Total price calculation
- 🔄 Quantity increase/decrease with minimum enforcement
- 🧪 Fully unit tested (90%+ coverage)
- ♿ Accessible elements with semantic tags
- ⚙️ Designed with modular and reusable components

---

## 🔍 Test Coverage Includes

### ✅ Unit Tests
- Cart rendering
- Display of item details
- Quantity adjustment logic
- Total calculation
- Empty cart fallback

### ✅ Integration Test Ideas (add later)
- Add-to-cart flow
- Cart persistence (with localStorage)
- Checkout trigger

---

## 🧠 To Improve

- Add product listing page
- Use global state (Redux, Zustand)
- Add styling (CSS Modules or TailwindCSS)
- Add integration tests
- Add E2E tests with Cypress or Playwright

---

## 📬 Feedback

Pull requests are welcome! Feel free to fork and extend for your own projects.

---

## 📝 License

MIT © 2025 Your Name
