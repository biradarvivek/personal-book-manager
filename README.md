# 📚 Bindery

A modern full-stack Book Manager web application built with **Next.js**, **TypeScript**, **Node.js**, **Express.js**, and **MongoDB**.

Bindery helps users organize their personal library, track reading progress, manage favorite books, and monitor reading statistics through a clean and responsive dashboard.

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- HTTP-only Cookie Authentication
- Protected Routes
- Logout

### 📚 Book Management
- Add Book
- Edit Book
- Delete Book
- View Book Details
- Reading Progress
- Reading Status
- Favorite Books
- Notes
- Rating
- Genre
- Tags

### 📊 Dashboard
- Total Books
- Currently Reading
- Reading Goal Progress
- Continue Reading
- Recent Books

### 📈 Analytics
- Books Read
- Favorite Genre
- Books by Status
- Reading Progress
- Completed Percentage

### ⚙️ Settings
- Dark / Light Mode
- Account Information

### 👤 Profile
- User Information
- Joined Date
- Total Books

### 📱 Responsive Design
- Mobile Friendly
- Tablet Friendly
- Desktop Friendly


## 🛠️ Tech Stack

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Axios
- Framer Motion
- Sonner

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Cookie Parser

---

## 📂 Project Structure

```
personal-book-manager
│
├── frontend
│   ├── app
│   ├── components
│   ├── services
|   ├── providers
│   ├── lib
│   ├── types
|   ├── middleware.ts
│   └── public
│
├── backend
|   ├── src
│     ├── controllers
│     ├── middlewares
│     ├── models
│     ├── routes
│     ├── utils
│     ├──config
|     ├── app.ts
|     └── server.ts
│
└── README.md
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/biradarvivek/personal-book-manager.git .
```

---

### Install Frontend

```bash
cd frontend
npm install
```

Run

```bash
npm run dev
```

---

### Install Backend

```bash
cd backend
npm install
```

Run

```bash
npm run dev
```

---

## 🔑 Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

### Backend (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
```

---


GitHub: https://github.com/biradarvivek

LinkedIn: https://linkedin.com/in/biradarvivek
