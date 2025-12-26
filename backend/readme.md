"SOLVIX isn't just a platform; it's your 24/7 intelligent coding mentor."

🌟 Overview

**SOLVIX** is a next-generation competitive programming platform designed to bridge the gap between learning and mastery. Built with performance and user experience at its core, it combines a powerful coding environment with cutting-edge AI assistance to provide a seamless practice arena for developers of all levels.

Whether you're debugging a complex algorithm or learning a new data structure, SOLVIX empowers you with real-time feedback, editorial video insights, and an intelligent AI tutor that adapts to your needs.

---

## ✨ Key Features

### 🧠 AI-Powered Assistance
- **Integrated Google Gemini AI**: Stuck on a problem? Get context-aware hints, logic explanations, and debugging help without ever leaving the editor.
- **Smart suggestions**: The AI analyzes your code context to provide relevant optimization tips.

### ⚡ Real-Time Code Execution
- **Multi-Language Support**: Run code instantly in **C++, Java, and JavaScript**.
- **Judge0 Integration**: Leverages the robust Judge0 API for fast, secure, and accurate code evaluation against test cases.

### 📚 Immersive Learning Experience
- **Editorial Video Player**: Integrated **Mux Player** for high-quality video editorials and concept breakdowns.
- **Rich Text Editor**: Powered by **Monaco Editor** (VS Code's core) for a familiar and powerful coding experience.
- **Activity Heatmaps**: Visualizes your daily coding consistency to keep you motivated.

### 🛡️ Secure & Scalable Architecture
- **Robust Authentication**: Secure login via **JWT**.
- **High Performance**: **Redis** caching ensures lightning-fast data retrieval and session management.
- **Cloud Media**: Optimized media storage and delivery using **Cloudinary**.

---

## 🛠️ Tech Stack Used in this Project:

**Frontend** (Client-Side)

Core Framework: React 19 (Latest)
Build Tool: Vite
State Management: Redux Toolkit & React-Redux
Styling: Tailwind CSS v4, DaisyUI (Component Library)
Routing: React Router
Form Handling: React Hook Form + Zod (Validation)
Code Editor: Monaco Editor (The engine that powers VS Code)
Video Player: Mux Player & React Player
HTTP Client: Axios
Authentication: Google OAuth 2.0 (@react-oauth/google)
Visualization: React Calendar Heatmap
Icons: Lucide React & FontAwesome

**Backend** (Server-Side)

Runtime: Node.js
Framework: Express.js
Database ODM: Mongoose (for MongoDB)
Caching: Redis
AI Integration: Google Gemini SDK (@google/genai)
Media Management: Cloudinary
Authentication: JWT (JSON Web Tokens), Bcrypt (Password Hashing)
Email Services: Resend & Nodemailer.

**External APIs & Services**

Database: MongoDB (Atlas or Local)
Code Execution Engine: Judge0 (via RapidAPI)
AI Model: Google Gemini (Pro/Flash models)
Cloud Storage: Cloudinary (for images/videos)

## For Recruiters/Viewers
"This project demonstrates my ability to integrate complex third-party services (AI, Code Execution Engines) into a cohesive, user-friendly full-stack application. It tackles real-world challenges like latency (managed via Redis) and security (JWT/OAuth), making it a production-grade prototype."
