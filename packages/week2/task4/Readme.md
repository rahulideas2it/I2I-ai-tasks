# 📸 Screenshot Listener — Java to Swift Conversion

This project demonstrates a platform migration of a **screenshot detection listener** from **Android (Java)** to **iOS (Swift)** using an AI-driven development workflow.

---

## 🧠 Objective

Convert a screenshot listener from **Java** (Android) to **Swift** (iOS) using AI assistance, while ensuring:

- ✅ Logic parity
- ✅ Idiomatic Swift syntax
- ✅ Robust error handling
- ✅ Performance and memory safety

---

## ⚙️ Conversion Strategy

> _"AI Driven Development"_

## 🔁 Before/After Summary

| Aspect              | Java (Android)                      | Swift (iOS)                               |
|---------------------|--------------------------------------|-------------------------------------------|
| Screenshot Trigger  | `ContentObserver` on `MediaStore`    | `NotificationCenter` via `UIApplication`  |
| Thread Handling     | Handler/Looper                       | Main thread via closure                   |
| Resource Cleanup    | Unregister observer                  | Remove observer in `deinit` or manually   |
| Error Handling      | Try/catch, null checks               | `guard`, `optional`, `fatalError` checks  |
| Language Patterns   | OOP-heavy                            | Structs, lightweight closures             |


## 📂 Files Included

- `ScreenshotListener.swift` – Converted Swift implementation
- `README.md` – This document

---

## ✅ Result

The screenshot listener logic was fully migrated from Java to Swift using AI-assisted translation. Manual testing confirms correct observer behavior on iOS, with no memory leaks or crashes.

---