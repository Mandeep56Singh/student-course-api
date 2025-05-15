# 🎓 Student Course API

A RESTful API for managing students and courses built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB** using **Mongoose**.

---

## 📦 Features

### ✅ Mandatory Features:

* JWT-based authentication for admins
* CRUD for Students and Courses
* Student–Course relationship using references
* Project structured using Clean Architecture principles

### 💡 Optional Bonus Features Implemented:

* 🔍 Search courses by title
* 🔢 Pagination and filtering for students
* ✅ Input validation using `zod`
* 📜 Logging with `morgan`
* 🔐 Environment variables with `dotenv`

---

## 📁 Project Structure

```
src/
│
├── config/        # DB and config setup
├── controllers/   # Route controllers
├── middlewares/   # Auth, logging, validation
├── models/        # Mongoose schemas
├── routes/        # All API routes
├── services/      # Business logic
├── utils/         # Reusable utilities
├── validator/     # zod schemas
├── index.ts       # App entry point
```

---

## 🧪 Postman Collection

A Postman collection is provided for testing all endpoints:

* ✅ Auth (register/login)
* 📘 Student CRUD
* 📗 Course CRUD
* 🔑 Token-protected routes
* 🔍 Search, filter, paginate

> 💡 Import `postman_collection.json` in Postman.

---

## ⚙️ Setup & Installation

### 1. Clone the Repo

```bash
git clone https://github.com/Mandeep56Singh/student-course-api.git
cd student-course-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file (or use `.env.example` as reference):

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/student-course-api
JWT_SECRET=your_jwt_secret_key
```


### 4. Run the Server

```bash
npm run dev
```

Server will start at: `http://localhost:5000`

---

## 🔐 Authentication Guide

Use the following endpoints to authenticate and access protected routes:

### Register Admin

`POST /auth/register`

```json
{
  "email": "admin@example.com",
  "password": "your_password"
}
```

### Login Admin

`POST /auth/login`

Response:

```json
{
  "token": "your_jwt_token"
}
```

👉 Use this token as `Bearer <token>` in **Authorization headers** for all protected routes.

---

## 🔄 API Endpoints

### 📘 Students

| Method | Route           | Description                                                   |
| ------ | --------------- | ------------------------------------------------------------- |
| GET    | `/students`     | List all students (supports `?page`, `?limit`, `?department`) |
| GET    | `/students/:id` | Get student by ID                                             |
| POST   | `/students`     | Add a student                                                 |
| PUT    | `/students/:id` | Update student                                                |
| DELETE | `/students/:id` | Delete student                                                |

### 📗 Courses

| Method | Route          | Description                                 |
| ------ | -------------- | ------------------------------------------- |
| GET    | `/courses`     | List all courses (supports `?title` search) |
| POST   | `/courses`     | Add a course                                |
| PUT    | `/courses/:id` | Update course                               |
| DELETE | `/courses/:id` | Delete course                               |

---

## ✅ Testing Tips

* Use Postman or Thunder Client
* Use `limit=1` and `page=2` to test pagination
* Test `/courses?title=react` for search
* Try `/students?department=IT` for filtering

---

## 📄 License

This project is for educational purposes. No license attached.

---

