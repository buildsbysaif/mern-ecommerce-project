# E-Commerce Pro: A Full-Stack MERN Application

**Author:** Md Saif Sultan
**Internship:** Navodita Infotech
**Project Submission Date:** August 13, 2025

**Live Demo URL:** [https://buildsbysaif-ecommerce-pro.netlify.app/](https://buildsbysaif-ecommerce-pro.netlify.app/)

---

![E-Commerce Pro Screenshot](https://i.postimg.cc/2ySF6t7R/homepage-screenshot.png)

## 1. Project Overview

This repository contains the source code for **E-Commerce Pro**, a complete, full-stack e-commerce platform. The project was developed as part of my internship at Navodita Infotech and fulfills all the core requirements, including user authentication, a detailed product catalog, a persistent shopping cart, secure payment processing via Stripe, and a comprehensive order management system for administrators.

The application is built using the MERN stack (MongoDB, Express, React, Node.js) and features a modern, responsive user interface designed with Tailwind CSS.

## 2. Core Features Implemented

### User-Facing Features:
-   **User Authentication:** Secure user registration and login system using JSON Web Tokens (JWT) with password hashing (bcryptjs).
-   **Product Catalog:** A dynamic product catalog with features for searching by keyword and filtering by category.
-   **Product Details & Reviews:** Users can view detailed product pages and submit ratings and comments.
-   **Shopping Cart:** A fully persistent shopping cart that saves its state in local storage, managed by Redux Toolkit.
-   **Secure Checkout Flow:** A multi-step checkout process for entering shipping information and selecting a payment method.
-   **Payment Processing:** Real-world payment simulation handled securely via the Stripe payment gateway.
-   **Personalized User Profile:** Logged-in users can view their complete order history and update their profile details.

### Admin-Specific Features:
-   **Admin Dashboard:** A secure, role-based dashboard accessible only to admin users.
-   **User Management:** Admins have the ability to view a list of all registered users and delete non-admin accounts.
-   **Product Management:** Full CRUD (Create, Read, Update, Delete) functionality for all products, including image upload functionality.
-   **Order Management:** Admins can view all orders placed by customers and update their status to "Delivered."

## 3. Tech Stack & Architecture

-   **Frontend:** React, Redux Toolkit, Tailwind CSS, Axios, Vite
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB with Mongoose
-   **Authentication:** JSON Web Tokens (JWT)
-   **Payment Gateway:** Stripe
-   **Deployment:**
    -   Backend API deployed on **Render**.
    -   Frontend client deployed on **Netlify**.

## 4. How to Run the Project Locally

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