# Task Management System

A modern **full-stack Task Management application** built with a clean backend architecture and a beautiful, responsive frontend.

This project demonstrates **real-world engineering practices** including authentication, protected APIs, optimistic UI updates, and polished UX.

---

## ✨ Features

### 🔐 Authentication
- User registration & login
- JWT-based authentication
- Protected routes

### 📝 Task Management
- Create tasks
- View all tasks
- Toggle task completion
- Delete tasks
- Empty state handling

### 🎨 User Experience
- Clean and modern UI
- Skeleton loaders
- Toast notifications
- Smooth animations
- Responsive design

---

## 🧱 Tech Stack

### Frontend
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **React Hot Toast**

### Backend
- **Node.js**
- **Express**
- **TypeScript**
- **Prisma ORM**
- **SQLite (dev)**
- **JWT Authentication**

---

## 🗂️ Project Structure
taskManagementSystem/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── middlewares/
│ │ ├── app.ts
│ │ └── server.ts
│ ├── prisma/
│ │ └── schema.prisma
│ └── package.json
│
└── task-manager-frontend/
├── src/
│ ├── app/
│ ├── components/
│ ├── lib/
│ └── styles/
└── package.json


---

## 🔧 Environment Variables

### Backend (`backend/.env`)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret"
PORT=4000

Frontend (task-manager-frontend/.env.local)
NEXT_PUBLIC_API_URL=http://localhost:4000

▶️ Running Locally
1️⃣ Clone the repository
git clone https://github.com/your-username/task-management-system.git
cd task-management-system

2️⃣ Backend Setup
cd backend
npm install
npx prisma migrate dev
npm run dev


Backend will run at:

http://localhost:4000

3️⃣ Frontend Setup
cd task-manager-frontend
npm install
npm run dev


Frontend will run at:
http://localhost:3000

🔑 API Endpoints
| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | /auth/register | Register user |
| POST   | /auth/login    | Login user    |

Tasks (Protected)
Method	Endpoint	Description
GET	/tasks	Get all tasks
POST	/tasks	Create task
PATCH	/tasks/:id/toggle	Toggle completion
DELETE	/tasks/:id	Delete task

🧠 Architecture Highlights

Separation of concerns (controllers / services / routes)

Centralized API handling on frontend

Strong TypeScript typing

Scalable and maintainable structure

Production-ready patterns


👨‍💻 Author

Muhammad Tehami
Full-Stack Developer
📧 muhammadtehami129@gmail.com
