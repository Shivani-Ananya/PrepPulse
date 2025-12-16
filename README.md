#PrepPulse

PrepPulse (a.k.a. College Prep Guider) is a full-stack productivity web app designed to help students plan, track, and boost their placement preparation journey. It’s built with a modern tech stack and includes features like secure authentication, task organization, focus-tracking, and installable PWA support — so you can use it like a laptop app too.

🧠 Key Features

✨ User Authentication
Secure signup & login using JWT.

🗂️ Task Management
Create, edit, mark complete, and delete your tasks.

📊 Progress Tracking
Visual indicators for tasks and productivity streaks.

📱 Installable PWA
Works as a web app and can be installed on laptop like a native app.

🚀 Modern Architecture
Frontend on Netlify, backend on Render, database on MongoDB Atlas.

🛠️ Tech Stack
Layer	Technology
Frontend	React + Vite
Backend	Node.js + Express
Database	MongoDB Atlas
Hosting	Netlify (frontend), Render (backend)
PWA Support	vite-plugin-pwa

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
