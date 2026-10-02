# DroneTV AI Support & Lead Assistant

A full-stack web application built for **DroneTV** featuring a responsive service/course showcase, a rule-based AI support assistant, lead capture forms with validation, and an Admin Enquiry Management dashboard[cite: 32, 33].

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Setup](#database-setup)
- [Screenshots](#screenshots)

---

## Features

### Frontend (User Interface)
- **Landing Page**: Showcase for DroneTV's professional services (Aerial Cinematography, Industrial Inspection, Mapping & Surveying) and training courses (DGCA Remote Pilot, Cinematic Masterclass)[cite: 32].
- **Rule-Based AI Assistant**: Floating chatbot with quick-prompt buttons, message history, automated responses, and conversation reset functionality[cite: 32, 33].
- **Enquiry Form**: Form collecting user contact details, category (Customer/Student), service interest, and message.
- **Client Validation**: Input validation for empty fields, email formats, and minimum 10-digit phone numbers with inline feedback[cite: 33, 34].

### Admin Dashboard
- **Enquiry Management**: Overview table showing submitted leads with details, timestamps, and categories.
- **Search & Filter**: Live text search across names, emails, and phone numbers, alongside filtering by user type (Student / Customer).
- **Status Updates**: Dropdown control to change lead status (`New`, `Contacted`, `In Progress`, `Closed`) with instant database synchronization.
- **Delete Enquiries**: Safe removal of lead records.

### Backend API & Security
- **RESTful Endpoints**: Full CRUD operations for enquiries built on Express and Mongoose.
- **Server-Side Validation**: Backend validation and sanitization preventing invalid submissions directly at the database boundary[cite: 34].
- **CORS & Environment Configuration**: Configured CORS origin handling to prevent cross-origin issues during development and deployment.

---

## Tech Stack

- **Frontend**: React.js, TypeScript, Vite, CSS3 / Custom Styles, Lucide Icons[cite: 32]
- **Backend**: Node.js, Express.js, TypeScript, `tsx`[cite: 32, 33]
- **Database**: MongoDB & Mongoose ORM[cite: 33]
- **Environment Management**: `dotenv`, `cors`[cite: 34]

---
## Getting Started
Prerequisites
Ensure you have the following installed on your machine:

Node.js: v18.x or higher

npm: v9.x or higher

MongoDB: Local MongoDB server instance (mongodb://127.0.0.1:27017) or MongoDB Atlas URI
## Backend Setup
- Open a terminal and navigate to the backend folder:
  cd server
- Install dependencies:
  npm install
- Create a .env file in the server root directory:
 PORT=5000
 MONGO_URI=mongodb://127.0.0.1:27017/dronetv
 CLIENT_URL=http://localhost:5173
 NODE_ENV=development
- Start the development server with live reload:
  npm run dev
The server will run on http://localhost:5000.

## Frontend Setup
- Open a new terminal tab and navigate to the frontend folder:
  cd client
   
- Install dependencies:
  npm install

- Start the Vite development server:
   npm run dev
The application will open on http://localhost:5173.

## Database Setup
- Start your local MongoDB service:
  mongod
The database dronetv and the collection enquiries will automatically be generated upon submitting the first enquiry form through the frontend or API.

## Sample Document Structure
JSON
{
  "_id": "660f1a2b3c4d5e6f7a8b9c0d",
  "name": "Nikhil Moudgil",
  "email": "nikhil@example.com",
  "phone": "9876543210",
  "userType": "Student",
  "interest": "DGCA Remote Pilot",
  "message": "I would like to register for the upcoming drone pilot batch.",
  "status": "New",
  "createdAt": "2026-10-02T10:00:00.000Z",
  "updatedAt": "2026-10-02T10:00:00.000Z"
}
## Project Architecture

```text
FullStack_Chatbot_Task_Nikhil_Moudgil/
├── client/                      # React + TypeScript Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable components (Navbar, Chatbot, Form, Admin)
│   │   ├── types/               # TypeScript interface definitions
│   │   ├── App.tsx              # Main application root
│   │   ├── main.tsx             # React entry point
│   │   └── index.css            # Global styling
│   ├── package.json
│   └── vite.config.ts
│
└── server/                      # Node.js + Express Backend
    ├── src/
    │   ├── config/              # Database connection setup
    │   ├── controllers/         # API business logic
    │   ├── models/              # Mongoose schemas
    │   ├── routes/              # Express API route declarations
    │   └── server.ts            # Entry point & CORS middleware
    ├── .env                     # Backend environment secrets
    ├── package.json
    └── tsconfig.json

Getting Started
Prerequisites
Ensure you have the following installed on your machine:

Node.js: v18.x or higher

npm: v9.x or higher

MongoDB: Local MongoDB server instance (mongodb://127.0.0.1:27017) or MongoDB Atlas URI[cite: 33]