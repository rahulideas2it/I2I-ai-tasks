# 💳 Strategy Pattern: Money Withdrawal

> A TypeScript implementation demonstrating the **Strategy Design Pattern** to handle money withdrawals across different account types.

## 🧠 Concept
The Strategy Pattern allows the definition of a family of algorithms, encapsulates each one, and makes them interchangeable. This pattern is used here to switch between different account withdrawal strategies (Savings, Checking, Crypto).

## 🔧 Pattern Used
**Strategy Pattern** — Helps decouple the algorithm from the context and allows runtime substitution.

## 💼 Use Case
Simulates a banking app where users can withdraw from different types of accounts:
- **Savings** with strict withdrawal limits
- **Checking** with overdraft allowance
- **Crypto** with fee calculation

## 🧩 File Structure
```
src/
├── account.ts
├── withdrawal-strategy.ts
├── strategies.ts
├── index.ts
tests/
└── strategy.test.ts
```

## 📦 Setup

```bash
npm install
```

## 🚀 Run the App

```bash
npx ts-node src/index.ts
```

## 🧪 Run Tests

```bash
npx jest
```

## ✅ Features
- Strategy abstraction
- Three concrete withdrawal strategies
- Fully testable design
- Follows SOLID principles
- Unit tested using Jest

> Part of the **AI Driven Development #60day challenge**
