# StoryMode

A full-stack web application for creating and managing book clubs.  
Built with a **React (Vite)** frontend and a **FastAPI** backend.

---

## Table of Contents
- [General Information](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Setup](#setup)
  - [Run in GitHub Codespaces](#run-in-github-codespaces)
  - [Run Locally](#run-locally)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

---

## General Information
StoryMode is a platform that allows users to form, manage, and participate in book clubs.  
Users can register, browse existing clubs, and create new ones — all managed through a FastAPI backend and a responsive React interface.

---

## Technologies Used
- **Frontend:** React + Vite + JavaScript  
- **Backend:** Python 3.10+ + FastAPI + Uvicorn  
- **Environment:** Docker / GitHub Codespaces
- **Database:** (if used) SQLite 
- **Other Tools:** Node.js, npm  

---

## Features
- Create, view, and delete book clubs
- Register and list users
- View live API documentation via Swagger (`/docs`)
- Modular separation between backend and frontend
- Configurable `.env` for easy API connection

---

## API Endpoints

### **Authentication**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/v1/auth/register` | Create a new account |
| `POST` | `/api/v1/auth/login` | OAuth2 password flow (Login) |

### **Users**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/v1/users/me` | Get current user profile |
| `GET` | `/api/v1/users/me/bookclubs` | Get all book clubs you are a member of |

### **Book Clubs**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/v1/bookclubs` | List all book clubs (Public Directory) |
| `POST` | `/api/v1/bookclubs` | Create a new book club |
| `DELETE` | `/api/v1/bookclubs/{club_id}` | Delete a book club you own |
| `GET` | `/api/v1/bookclubs/{club_id}` | Get club details and member count |
| `PATCH` | `/api/v1/bookclubs/{club_id}` | Update a book club you own |
| `POST` | `/api/v1/bookclubs/{club_id}/join` | Join a book club |
| `POST` | `/api/v1/bookclubs/{club_id}/leave` | Leave a book club |

### **Books**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/v1/books/{club_id}/` | Create a new book in club |
| `GET` | `/api/v1/books/{club_id}/` | Get all club books |
| `DELETE` | `/api/v1/books/{club_id}/{book_id}` | Delete an existing book from club |
| `PATCH` | `/api/v1/books/{club_id}/books/{book_id}` | Toggle book status (Reading OR Finished) |

### **Admin**
> ⚠️ **Backend Only:** These endpoints do not have a public frontend interface. They are intended to be executed directly via the **[Swagger UI](/docs)** or API Client (Postman).
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/v1/admin` | Create new admin account |
| `GET` | `/api/v1/admin/users` | Get all users |
| `GET` | `/api/v1/admin/clubs` | Get all book clubs (Public and Private) |
| `DELETE` | `/api/v1/admin/users/{user_id}` | Delete a user |
| `DELETE` | `/api/v1/admin/bookclubs/{club_id}` | Delete a book club |

### **Messages**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/v1/bookclubs/{club_id}/messages` | List Messages For Club |
| `POST` | `/api/v1/bookclubs/{club_id}/messages` | Create Message For Club |

### **Default**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/ping` | Ping (Health Check) |

---

## Setup

### Open a Terminal Locally

#### **Make sure you have docker installed first: https://www.docker.com/products/docker-desktop/**
You can check if you have it installed by getting the version inside your terminal:
```bash
docker --version
```
Once Docker is installed you can run StoryMode using the command below.

#### To run:
```bash
docker compose up --build
```

#### To clear data:
```bash
docker compose down -v
```

The link to the website will appear inside the terminal: http://localhost:5173/
Interactive documentation for testing endpoints can be accessed here: http://localhost:8000/docs/
