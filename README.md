<div align="center">

# 🤖 AI Tasks Dashboard

```
 ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗███████╗██████╗ 
██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗
██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   █████╗  ██║  ██║
██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██╔══╝  ██║  ██║
╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ███████╗██████╔╝
 ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═════╝ 
```

### 🌟 Interactive AI-Powered Development Dashboard

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-blue?style=for-the-badge)](https://i2i-ai-tasks-main-git-main-rahulideas2its-projects.vercel.app/)
[![Built with AI](https://img.shields.io/badge/🤖_Built_with-AI-green?style=for-the-badge)](#)
[![React](https://img.shields.io/badge/⚛️_React-TypeScript-61DAFB?style=for-the-badge)](#)
[![Three.js](https://img.shields.io/badge/🎮_Three.js-3D_Graphics-black?style=for-the-badge)](#)

---

*Experience the dual nature of AI through an interactive dashboard that showcases both the helpful and mischievous sides of artificial intelligence.*

</div>

## ✨ Features

- 🎭 **Dual Mode Interface** - Switch between Good AI and Evil AI personalities
- 🎨 **Interactive 3D Robot** - Animated character with expressions and gestures
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🎬 **Smooth Animations** - Powered by Framer Motion for fluid interactions
- 🎯 **Modern Tech Stack** - React, TypeScript, Three.js, and Material-UI
- 🚀 **Performance Optimized** - Fast loading and smooth user experience

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
| **React 18** | Frontend framework |
| **TypeScript** | Type safety |
| **Three.js** | 3D graphics and animations |
| **Material-UI** | Component library |
| **Framer Motion** | Animation library |
| **Vite** | Build tool |
| **Turborepo** | Monorepo management |

---

# ⚙️ Setup

<details>
<summary>📦 $setup-turborepo</summary>

1. Create a new Turborepo setup without using create-turbo-app command
2. Build monorepo structure from scratch with empty apps and packages directories
3. Create package.json with workspace configuration and Turbo scripts
4. Create turbo.json with proper task pipeline configuration
5. Fix any warnings and errors in both configuration files
6. Add gitignore file
7. Add prettier.json with global approved format

</details>

<details>
<summary>⚛️ $setup-main-app</summary>

1. Build a new React application named "main" inside the ./apps directory
2. Use Vite configuration with minimal dependencies
3. Create using TypeScript
4. Install dependencies and build application
5. Update gitignore
6. Commit with proper message
7. Push to the main branch
8. Connect Vercel and deploy

</details>

<details>
<summary>🚀 $setup-deployment</summary>

1. Install Vercel CLI
2. Configure vercel.json
3. Add deployment flow

</details>

<details>
<summary>🏠 $setup-home-page</summary>

1. Setup MUI React for main app with @mui/material, @emotion/react, @emotion/styled
2. Install MUI icons with @mui/icons-material and @mui/system dependencies
3. Create MUI container with maxWidth xl for responsive layout
4. Add navbar inside container with mood-based logo on left side (Good: 🤖PILOT, Evil: 🥷HIJACK)
5. Add mood switcher on navbar right with Good (😊) and Evil (😈) icons with tooltips
6. Fix sticky navbar to show on page refresh by setting initial isScrolled state to true
7. Link mood switcher to control both theme mode (light/dark) and primary colors
8. Good mode: light theme with blue primary color (#1976d2)
9. Evil mode: dark theme with red primary color (#d32f2f)
10. Add centered banner under navbar with typewriting effect for mood-based headers
11. Good mode header: "Your Friendly Neighborhood AI" with "Neighborhood" in primary color
12. Evil mode header: "Your Overqualified Replacement" with "Replacement" in primary color
13. Add blinking cursor animation with primary color
14. Good mode caption: "Helping you code, write, and thrive — no world domination today."
15. Evil mode caption: "Relax... I'll take it from here (and maybe your job too)."
16. Create floating emoji effects with bubble light animations based on selected mood
17. Good mode emojis: smiling, laughing, dancing (😊, 😂, 💃, 🎉, ✨, 🌈, 😍, 🥳)
18. Evil mode emojis: evil, dark, blood themed (😈, 💀, 🩸, 🔥, ⚡, 🗡️, 🧿, 👿)
19. Add radial gradient bubble effects with backdrop blur and borders
20. Implement 8 different floating animations with rotation and translation
21. Set banner text z-index higher than floating emojis for proper layering
22. Add blur effect to emojis when they overlap with header text area
23. Enhance visual appeal with varied emoji opacity levels (15%, 20%, 35%) and blur effects
24. Add mobile responsiveness with more emojis (8 on mobile, 16 on desktop)
25. Position emojis around banner container in staggered layout to avoid content overlap
26. Add padding to banner text container for better spacing between text and emojis
27. Add MUI contained Button under banner caption with capitalized text (Good: "Explore the helpful side", Evil: "Dare to see the other side")
28. Implement automatic section fitting on scroll with smooth transitions
29. Add scroll detection to snap to nearest section automatically
30. Remove separate dark/light theme switcher and integrate with mood switcher
31. Add responsive typography sizing for mobile and desktop devices
32. Set banner section to full viewport height with minHeight 500px to prevent mobile collapse
33. Add responsive padding (xs: 4, md: 8) for better mobile display and proper vertical alignment
34. Create conversation section with left-aligned single column layout using flex
35. Position chat card on left side of conversation section
36. Remove right column placeholder content
37. Add client, developer, and AI conversation messages with emojis
38. Highlight active AI mode message based on current theme

</details>

---

<div align="center">

## 👨‍💻 Creator

<img src="https://lh3.googleusercontent.com/a/ACg8ocIk1_38OevbUoQwzamLniNHcduwroJVUrdgjeakttWBemgOz-Uu=s360-c-no" width="100" height="100" style="border-radius: 50%;" alt="Rahul Profile">

### **Rahul Raj Nataraj**
*Frontend Developer*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://in.linkedin.com/in/rahulrajnataraj)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://rahul162raj.github.io/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rahulideas2it)

---

*@ 2025 AI Tasks Dashboard. Built with AI* 🤖

</div>
