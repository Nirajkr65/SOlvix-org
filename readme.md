# 🚀 SOLVIX: The Ultimate Competitive Programming Ecosystem

![MERN Stack](https://img.shields.io/badge/MERN-Stack-000000?style=for-the-badge&logo=react&logoColor=61DAFB)
![AI Powered](https://img.shields.io/badge/AI-Powered_by_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Real-Time](https://img.shields.io/badge/Real--Time-Execution-FF4500?style=for-the-badge&logo=judge0&logoColor=white)

> **"SOLVIX isn't just a platform; it's your 24/7 intelligent coding mentor."**

## 🌟 Overview

**SOLVIX** is a next-generation competitive programming platform designed to bridge the gap between learning and mastery. Built with performance and user experience at its core, it combines a powerful coding environment with cutting-edge AI assistance to provide a seamless practice arena for developers of all levels.

Whether you're debugging a complex algorithm or learning a new data structure, SOLVIX empowers you with real-time feedback, editorial video insights, and an intelligent AI tutor that adapts to your needs.

---

## ✨ Key Features

### 🧠 AI-Powered Assistance
- **Integrated Google Gemini AI**: Stuck on a problem? Get context-aware hints, logic explanations, and debugging help without ever leaving the editor.
- **Smart suggestions**: The AI analyzes your code context to provide relevant optimization tips.

### ⚡ Real-Time Code Execution
- **Multi-Language Support**: Run code instantly in **C++, Java, Python, and JavaScript**.
- **Judge0 Integration**: Leverages the robust Judge0 API for fast, secure, and accurate code evaluation against test cases.

### 📚 Immersive Learning Experience
- **Editorial Video Player**: Integrated **Mux Player** for high-quality video editorials and concept breakdowns.
- **Rich Text Editor**: Powered by **Monaco Editor** (VS Code's core) for a familiar and powerful coding experience.
- **Activity Heatmaps**: Visualizes your daily coding consistency to keep you motivated.

### 🛡️ Secure & Scalable Architecture
- **Robust Authentication**: Secure login via **JWT** and **Google OAuth 2.0**.
- **High Performance**: **Redis** caching ensures lightning-fast data retrieval and session management.
- **Cloud Media**: Optimized media storage and delivery using **Cloudinary**.

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | ![React](https://img.shields.io/badge/-React_19-61DAFB?logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) ![Redux](https://img.shields.io/badge/-Redux_Toolkit-764ABC?logo=redux&logoColor=white) ![DaisyUI](https://img.shields.io/badge/-DaisyUI-5A0EF8?logo=daisyui&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white) ![Mongoose](https://img.shields.io/badge/-Mongoose-880000?logo=mongoose&logoColor=white) |
| **Database & Cache** | ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white) ![Redis](https://img.shields.io/badge/-Redis-DC382D?logo=redis&logoColor=white) |
| **Services & APIs** | ![Google Gemini](https://img.shields.io/badge/-Google_Gemini-8E75B2?logo=google&logoColor=white) ![Judge0](https://img.shields.io/badge/-Judge0-orange) ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?logo=cloudinary&logoColor=white) ![Resend](https://img.shields.io/badge/-Resend-black) |

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Local or Atlas)
*   Redis Server
*   API Keys: Google Gemini, Cloudinary, Judge0, Google OAuth

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/solvix.git
    cd solvix
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    *Create a `.env` file in `backend/` with:*
    ```env
    PORT=5000
    DB_CONNECTION_STRING=your_mongo_uri
    JWT_KEY=your_secret
    REDIS_HOST=127.0.0.1
    REDIS_PORT=6379
    REDIS_PD=your_redis_password
    JUDGE0_KEY=your_rapidapi_key
    JUDGE0_URL=https://judge0-ce.p.rapidapi.com
    GEMINI_API_KEY=your_gemini_key
    CLOUDINARY_CLOUD_NAME=...
    CLOUDINARY_API_KEY=...
    CLOUDINARY_API_SECRET=...
    FRONTEND_URL=http://localhost:5173
    CLIENT_ID=your_google_client_id
    EMAIL_USER=...
    EMAIL_PASS=...
    ```
    *Start Server:*
    ```bash
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd ../frontend
    npm install
    ```
    *Create a `.env` file in `frontend/` with:*
    ```env
    VITE_API_BASE_URL=http://localhost:5000
    VITE_GOOGLE_CLIENT_ID=your_google_client_id
    ```
    *Start Client:*
    ```bash
    npm run dev
    ```

4.  **Launch**
    Visit `http://localhost:5173` to start coding!

---

## 📸 Screenshots

*(Placeholder for Screenshots - Add your own here)*

| Landing Page | Code Editor |
|--------------|-------------|
| ![Landing](https://placehold.co/600x400?text=Landing+Page) | ![Editor](https://placehold.co/600x400?text=Code+Editor) |

---

## 🤝 Application In-Depth

### Frontend Architecture
The frontend is built with **React 19** and **Vite** for blazing fast performance. It utilizes **Redux Toolkit** for predictable state management across the complex editor and user session states. Styling is handled by **Tailwind CSS** and **DaisyUI**, ensuring a modern, responsive, and dark-mode-ready interface.

### Backend Infrastructure
The backend is a robust **Express.js** REST API. It handles code submission queues, utilizes **Redis** for caching frequently accessed problem data, and manages secure communications with the Google Gemini API for the AI tutor feature. Data validation is strictly enforced using **Zod** and **Validator**.

---

## pro Tip for Recruiters/Viewers
> "This project demonstrates my ability to integrate complex third-party services (AI, Code Execution Engines) into a cohesive, user-friendly full-stack application. It tackles real-world challenges like latency (managed via Redis) and security (JWT/OAuth), making it a production-grade prototype."

---

Made with ❤️ by [Niraj Kumar](https://www.linkedin.com/in/your-profile)
