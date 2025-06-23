# 🏗️ Legacy vs Modern Express App

This project demonstrates a legacy Node.js Express backend and its refactored modern version side by side.

---

## 📁 Project Structure

```
.
├── legacy-app/        # Old-school monolith (JavaScript)
├── modern-app/        # Refactored app (TypeScript, modular, secure)
└── README.md          # This file
```

---

## 📜 Legacy App

### 📂 Location: `legacy-app/`

### ❌ Known Problems:
- Uses **`var`** and non-modular code
- Weak password hashing (`md5`)
- Poor security (e.g., XSS, no input validation)
- Synchronous file access (bad performance)
- No unit tests
- All logic in one file

### ✅ Setup & Run:

```bash
cd legacy-app
npm install
node legacy-app.js
```

### 📡 Available Endpoints

- `POST /register`  
  ```json
  { "username": "alice", "password": "1234" }
  ```

- `POST /login`  
  ```json
  { "username": "alice", "password": "1234" }
  ```

- `GET /search?q=Refactoring`  
  Searches from a local `data.json` file

- `GET /admin?user=admin`  
  ❌ **Security risk** – may expose system files

---

## 🚀 Modern App

### 📂 Location: `modern-app/`

A secure, testable, and maintainable Express backend written in **TypeScript**. It follows:

- ✅ SOLID principles
- ✅ Secure password hashing (`bcrypt`)
- ✅ JWT-based auth
- ✅ Centralized error handling
- ✅ Input validation (`express-validator`)
- ✅ Unit tests with `Jest`

### 📦 Setup

```bash
cd modern-app
npm install
cp .env.example .env
```

Edit `.env` and set your JWT secret:

```env
PORT=3000
JWT_SECRET=my-secret-key
```

### ▶️ Run the Modern App

#### Development (with auto-reload):
```bash
npm run dev
```

#### Production:
```bash
npm run build
npm start
```

### ✅ Auth API

- `POST /api/auth/register`  
  ```json
  { "username": "alice", "password": "secure123" }
  ```

- `POST /api/auth/login`  
  ```json
  { "username": "alice", "password": "secure123" }
  ```

Returns a JWT token upon login.

### 🧪 Run Tests

```bash
npm test
```

---

## 🔍 Before vs After Comparison

| Area             | Legacy App                           | Modern App                            |
|------------------|---------------------------------------|----------------------------------------|
| Language         | JavaScript (ES5/ES6)                 | TypeScript (ES2020+)                   |
| Structure        | Single file, global state            | Modular, layered (SOLID)               |
| Security         | MD5, XSS-prone, no validation        | bcrypt, JWT, input validation          |
| Error Handling   | Missing                              | Centralized error middleware           |
| Testing          | None                                 | Unit tests with Jest                   |
| Maintainability  | Poor (spaghetti code)                | High (readable, testable)              |

---

## 🧭 Migration Strategy

1. **Modularize code**: Break legacy logic into controller/service/middleware files
2. **Introduce TS**: Add `tsconfig.json`, use types/interfaces
3. **Upgrade security**: Replace `md5` with `bcrypt`, add `JWT`
4. **Add validation**: Use `express-validator`
5. **Write tests**: Start with unit tests for services/controllers
6. **Use dotenv**: Extract configs/secrets

---

## 📚 License

MIT
