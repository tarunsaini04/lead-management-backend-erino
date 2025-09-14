📈 Lead Management System - Backend

This is the robust and secure backend service for the Erino Lead Management System.

Built with Node.js, Express, and MongoDB, it provides a complete RESTful API for:

🔑 User Authentication

📊 Lead Management (Full CRUD)

⚡ High-performance data handling

🌐 Live API Link: (https://lead-management-api-tarun.onrender.com/)


✨ Features

✅ JWT Authentication – Secure login & registration using httpOnly cookies

🔒 Password Hashing – Encrypted passwords with bcryptjs

🔐 Protected Routes – Only authenticated users can access lead APIs

🗂️ Full CRUD API – Create, Read, Update, Delete for leads

📄 Server-Side Pagination – Efficiently manage large datasets

🔍 Dynamic Filtering – Query leads with flexible filters


💻 Tech Stack

⚡ Runtime: Node.js

🏗️ Framework: Express.js

🗄️ Database: MongoDB (with Mongoose ODM)

🔑 Authentication: JWT + cookie-parser

🔒 Security: bcryptjs for password hashing

☁️ Deployment: Render


⚙️ Getting Started (Local Setup)

Follow these steps to set up the project locally 👇

📌 Prerequisites

Install Node.js

Have a MongoDB URI (local or Atlas)

📥 Installation

# Clone the repo
git clone https://github.com/tarunsaini04/lead-management-backend-erino.git

# Navigate to folder
cd lead-management-backend

# Install dependencies
npm install


⚡ Environment Variables

Create a .env file in the root folder:

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

NODE_ENV=development

🚀 Run Development Server

npm run dev


📖 API Endpoints

🔑 Authentication Routes (/api/auth)

| Method | Endpoint  | Access  | Description                |
| ------ | --------- | ------- | -------------------------- |
| POST   | /register | Public  | Register a new user        |
| POST   | /login    | Public  | Log in a user (JWT cookie) |
| POST   | /logout   | Public  | Clear the JWT cookie       |
| GET    | /me       | Private | Get current logged-in user |


📊 Lead Routes (/api/leads)

| Method | Endpoint | Access  | Description             |
| ------ | -------- | ------- | ----------------------- |
| POST   | /        | Private | Create a new lead       |
| GET    | /        | Private | Get all user leads      |
| GET    | /\:id    | Private | Get a single lead by ID |
| PUT    | /\:id    | Private | Update lead by ID       |
| DELETE | /\:id    | Private | Delete lead by ID       |


🔍 Query Parameters (for GET /leads)

📄 Pagination → ?page=1&limit=20

🏷️ Filtering →

?status=new

?company_contains=tech

?score_gt=80

...and more!



