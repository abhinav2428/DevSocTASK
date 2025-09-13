# DevSocTASK
Title: Lost and Found API

Introduction

1. **Clone Repository**

   ```bash
   git clone https://github.com/abhinav2428/DevSocTask.git
   cd server
   npm install
   ```
   2. **Environment Variables**
   Create a `.env` file with:

   ```env
    PORT=8800 
    MONGO_URL="mongodb+srv://abhinavbhardwaj2805_db_user:hello1234@cluster01.avrissd.mongodb.net/"
    JWT_SECRET_KEY="ee8ab388a8071c77d59d8e292044f52f"
    JWT_EXPIRES=7d
    RATE_LIMIT_WINDOW_MS=15*60*1000
    RATE_LIMIT_MAX=100
   ```
3. **Run Server** 
    ``` bash
    npm start
    ```
    access API at `http://localhost:8800`

    ---

## Usage

* **Login:** `POST /auth/login` with `{ "username": "alice", "password": "secret" }` → returns JWT token.
* **List Items:** `GET /items` → fetch all items. Supports filters: `status`, `category`, `location`, `date`.
* **Get Item:** `GET /items/:id` → details of a single item.
* **Create Item:** `POST /items` → create report (requires login).
* **Update Item:** `PUT /items/:id` → update report (owner or admin).
* **Delete Item:** `DELETE /items/:id` → delete report (admin only).

---

## Challanges and experience gained

* This was my first time working on a project like this before this I have only made one or 2 front end projects in nextjs using tailwind so I had a lot to learn from this.

* Later on including JWT authentication to the project was also a new learning

* Initially I was looking at some of other people's projects which had a lot of folders and a lot of files but then I felt that this project didn't require that much and could be executed in a simpler directory so I went with that.

* Also learned to use postman that was also a new experience for me