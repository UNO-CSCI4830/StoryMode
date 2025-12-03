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
- **Environment:** GitHub Codespaces (recommended) / VS Code  
- **Database:** (if used) SQLite or PostgreSQL  
- **Other Tools:** Docker, Node.js, npm  

---

## Features
- Create, view, and delete book clubs
- Register and list users
- View live API documentation via Swagger (`/docs`)
- Modular separation between backend and frontend
- Configurable `.env` for easy API connection

---

## API Endpoints

### **Book Clubs**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/v1/bookclubs` | Create a new book club |
| `GET` | `/api/v1/bookclubs` | List all book clubs |
| `DELETE` | `/api/v1/bookclubs/{club_id}` | Delete a book club you own |

### **Users**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/v1/users` | Create a new user |
| `GET` | `/api/v1/users` | List all users |
| `DELETE` | `/api/v1/users/{user_id}` | Delete a user |

### **Default**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/ping` | Check API health |

---

## Setup

### Open a Terminal (GitHub Codespaces or Locally)

#### **Make sure you have docker installed first: https://www.docker.com/products/docker-desktop/**
You can check if you have it installed by getting the version inside your terminal:
```bash
docker --version

Inside your terminal:
```bash
docker compose up --build
