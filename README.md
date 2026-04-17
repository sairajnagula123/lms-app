# 🎓 LMS App (Learning Management System)

## 📌 Overview

A full-stack Learning Management System (LMS) that allows users to enroll in courses, access learning content (videos/PDFs), take quizzes, and track their progress.

Built as a scalable MERN-style application with authentication and modular architecture.

---

## 🚀 Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Auth:** JWT (JSON Web Tokens)

---

## ✨ Key Features

* 🔐 User Authentication (Login/Register using JWT)
* 📚 Course Enrollment System
* 🎥 Video & 📄 PDF Content Access
* 📝 Quiz & Assessment Module *(in progress)*
* 📊 Progress Tracking

---

## 📂 Project Structure

```
lms-app/
 ├── client/   → React frontend
 └── server/   → Express backend + APIs
```

---

## ⚙️ Run Locally

### 1. Clone Repository

```bash
git clone https://github.com/sairajnagula123/lms-app.git
cd lms-app
```

### 2. Start Backend

```bash
cd server
npm install
npm start
```

### 3. Start Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside `/server`:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```


## 🚧 Future Improvements

* 💳 Payment Integration
* 🛠️ Admin Dashboard
* 🔔 Notifications System

---

## 👨‍💻 Author

**Sairaj**
