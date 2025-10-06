# 🚀 NASA Space App Challenge 2025 – Project Setup Guide

This guide explains how to set up the **NASA Space App Challenge 2025** project locally.

---

## 🧭 Step 1: Clone the Repository

```bash
git clone git@github.com:TheHoneyBoy/NASA-Space-App-Challenge-2025.git
```

---

## 💻 Front-End Setup

```bash
cd frontend
npm i
npm run dev
```

### 🧩 Front-End Technologies

- React + TypeScript  
- Vite  
- Material UI  
- JavaScript  
- npm

---

## 🗄️ Database Setup

### 1. Install Docker  
If you don’t have Docker, install it from [https://www.docker.com/](https://www.docker.com/).

### 2. Run MySQL Container

```bash
docker run --name spaceapp_db_container \
  -e MYSQL_ROOT_PASSWORD=toor \
  -e MYSQL_DATABASE=spaceapp_db \
  -e MYSQL_USER=authorizedUser \
  -e "MYSQL_PASSWORD=@uth0rizedUs3r*1" \
  -p 3306:3306 \
  -d mysql:8.0
```

---

## ⚙️ Back-End Setup

```bash
cd spaceapp
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### 🧠 Back-End Technologies

- OpenAI  
- LangChain  
- Retrieval-Augmented Generation (RAG)  
- Django Rest Framework  
- scikit-learn  
- Hugging Face Embeddings  
- MySQL  
- ChromaDB  
- Pandas  
- NumPy  
- Docker  
- CUDA  
- XGBoost

---

## 🔐 .env Configuration

Create a `.env` file inside your **backend** folder and fill the following fields:

```env
DB_NAME=spaceapp_db
DB_USER=authorizedUser
DB_PASSWORD=@uth0rizedUs3r*1
DB_HOST=localhost
DB_PORT=3306

API_KEY_OPEN_ROUTER=<api-key>
BASE_URL_OPEN_ROUTER=<base-url>
```

---

✅ You’re all set! Run both servers (frontend and backend), and your NASA Space App Challenge 2025 environment will be ready to explore!
