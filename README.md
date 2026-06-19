<div align="center">
  <h1>🛒 E-Commerce Pro</h1>
  <p>A Full-Stack MERN Application with Secure Payment Processing</p>

  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<br />

**Live Demo:** [E-Commerce Pro on Netlify](https://buildsbysaif-ecommerce-pro.netlify.app/)  


## 📖 Project Overview

This repository contains the source code for **E-Commerce Pro**, a complete, responsive e-commerce platform developed as part of an internship at Navodita Infotech. 

Built on the MERN stack, this project goes beyond a simple CRUD application by implementing real-world features such as persistent cart state management, role-based authorization, and secure payment simulation via the Stripe API.

## ✨ Core Features

### For Users (Client-Facing)
* **Authentication & Security:** Secure registration and login using JWT (JSON Web Tokens) and bcryptjs for password hashing.
* **Dynamic Catalog:** Search functionality and category filtering to easily browse products.
* **Interactive Shopping Cart:** Persistent cart state managed by Redux Toolkit and LocalStorage.
* **Secure Checkout:** Multi-step checkout flow handling shipping details and Stripe payment processing.
* **User Dashboard:** Logged-in users can manage their profiles, leave product reviews, and track order history.

### For Administrators (Admin Dashboard)
* **Inventory Management:** Full CRUD capabilities for adding, editing, and deleting products with image upload support.
* **Order Fulfillment:** Dedicated portal to view customer orders and update delivery statuses.
* **User Management:** Ability to view the user base and revoke access for non-admin accounts.

## 🏗️ Architecture & Data Flow

The application follows a strict separation of concerns utilizing a **RESTful API** architecture:
* **Frontend (SPA):** Built with React and Tailwind CSS. Redux Toolkit manages global state (cart, user sessions). All API calls are routed through Axios.
* **Backend (API):** Node.js and Express handle business logic, routing, and token validation via custom middleware.
* **Database:** MongoDB stores documents (Users, Products, Orders) utilizing Mongoose as the Object Data Modeling (ODM) library.


## 🚀 How to Run Locally

To set up and run this project on a local machine, please follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/buildsbysaif/mern-ecommerce-project.git](https://github.com/buildsbysaif/mern-ecommerce-project.git)
    ```
2.  **Set up Environment Variables:**
    Create a `.env` file in the `backend` folder and another in the `frontend` folder, then add the required API keys and secrets.

3.  **Install Backend Dependencies & Start Server:**
    ```bash
    cd backend
    npm install
    npm run server
    ```
4.  **Install Frontend Dependencies & Start Client:**
    (In a new terminal)
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

---
