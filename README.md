Here's a clean and well-structured `README.md` version of your instructions:

---

# 📘 PDF Q\&A Local

A local clone of a notebook-style PDF question-answering app using LLMs.

---

## 📦 Installation & Running Guide

### 📁 Clone the Repository

```bash
git clone https://Pritam499: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@github.com/Pritam499/notebook-lm-clone.git
cd notebook-lm-clone
```

---

## 🔧 1. Backend Setup

### I. Navigate to `server` Directory

```bash
cd server
```

### II. Install Dependencies

```bash
npm install
```

### III. Create `.env` File

Create a file named `.env` in the `server` directory and paste the following contents:

```env
PORT=4000
DATABASE_URL=postgresql://postgres:9P8as51sSt3r472on9g1@seodb.c7u6c6a423bu.eu-north-1.rds.amazonaws.com:5432/dbtools
OPENROUTER_API_KEY=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
CHUNK_SIZE=1000
```

### IV. Start the Backend Server

```bash
node app.js
```

🚀 Your backend will be running at: [http://localhost:4000](http://localhost:4000)

---

## 💻 2. Frontend Setup

### I. Open a New Terminal Window

Navigate to the `client` directory:

```bash
cd client
```

### II. Install Dependencies

```bash
npm install
```

### III. Create `.env` File

Create a file named `.env` in the `client` directory and paste the following:

```env
VITE_API_BASE_URL=http://localhost:4000
OPENROUTER_API_KEY=
VITE_OPENROUTER_API_KEY=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
VITE_CHUNK_SIZE=1000
VITE_SITE_URL=http://localhost:5173
VITE_SITE_TITLE=PDF Q&A Local
```

### IV. Start the Frontend Server

```bash
npm run dev
```

🌐 Visit: [http://localhost:5173](http://localhost:5173)

---

## ✅ Ready to Use!

Upload a PDF, ask questions, and interact with the document intelligently.

---

Let me know if you'd like to add sections like **Tech Stack**, **Features**, or **Contributing**.
