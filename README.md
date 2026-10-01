# Job Application Portal

A backend-focused mini project built using Node.js and Express.js.

This project provides REST APIs for candidate registration, login, job listing, resume upload, and job applications.

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Multer

## Main Features

* Candidate registration and login
* Password hashing using bcrypt
* JWT-based authentication
* Job listing
* Job details
* Resume upload
* Apply for jobs
* View submitted applications
* MongoDB database integration

## API Endpoints

### Authentication

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register a candidate  |
| POST   | `/api/auth/login`    | Login and receive JWT |

### Jobs

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| GET    | `/api/jobs`     | Get all jobs     |
| GET    | `/api/jobs/:id` | Get a single job |
| POST   | `/api/jobs`     | Create a job     |

### Resume

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/resume/upload` | Upload candidate resume |

### Applications

| Method | Endpoint               | Description                            |
| ------ | ---------------------- | -------------------------------------- |
| POST   | `/api/applications`    | Apply for a job                        |
| GET    | `/api/applications/my` | Get logged-in candidate's applications |

> Protected endpoints require a JWT token in the `Authorization` header using the `Bearer <token>` format.


## How to Run the Project

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

Create a `.env` file in the project root and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the server

For development:

```bash
npm run dev
```

For normal start:

```bash
npm start
```

The API will run on:

```text
http://localhost:5000
```

### 5. Test the API

You can test the APIs using Thunder Client or Postman.

## Project Structure

```text
job-application-portal/
│
├── middleware/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Job.js
│   └── Application.js
│
├── routes/
│   ├── authRoutes.js
│   ├── jobRoutes.js
│   ├── resumeRoutes.js
│   └── applicationRoutes.js
│
├── uploads/
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```
## API Request and Response Examples

### 1. Register Candidate

**POST** `/api/auth/register`

**Request:**

```json
{
  "name": "Tanvi",
  "email": "tanvi@example.com",
  "password": "Test@12345"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": "USER_ID",
    "name": "Tanvi",
    "email": "tanvi@example.com"
  }
}
```

### 2. Login

**POST** `/api/auth/login`

**Request:**

```json
{
  "email": "tanvi@example.com",
  "password": "Test@12345"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "Tanvi",
    "email": "tanvi@example.com"
  }
}
```

### 3. Get All Jobs

**GET** `/api/jobs`

**Response:**

```json
{
  "success": true,
  "count": 3,
  "jobs": [
    {
      "_id": "JOB_ID",
      "title": "Java Backend Developer",
      "company": "Tech Solutions Pvt Ltd",
      "location": "Ahmedabad"
    }
  ]
}
```

### 4. Apply for a Job

**POST** `/api/applications`

**Header:**

```text
Authorization: Bearer JWT_TOKEN
```

**Request:**

```json
{
  "jobId": "JOB_ID"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Application submitted successfully",
  "application": {
    "_id": "APPLICATION_ID",
    "candidate": "USER_ID",
    "job": "JOB_ID",
    "resume": "resume.pdf",
    "status": "Applied"
  }
}
```

### 5. View My Applications

**GET** `/api/applications/my`

**Header:**

```text
Authorization: Bearer JWT_TOKEN
```

**Response:**

```json
{
  "success": true,
  "count": 1,
  "applications": []
}
```

### 6. Upload Resume

**POST** `/api/resume/upload`

**Header:**

```text
Authorization: Bearer JWT_TOKEN
```

**Body:**

```text
form-data
resume: <PDF file>
```

**Response:**

```json
{
  "success": true,
  "message": "Resume uploaded successfully",
  "resume": "resume-file-name.pdf"
}
```
