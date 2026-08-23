# 🛍️ E-commerce Frontend

A modern and responsive e-commerce frontend built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

This project is the customer-facing part of a full-stack e-commerce application, providing a complete shopping experience from browsing products to checkout and order creation.

## ✨ Features

* 🏠 Modern and responsive homepage
* 🛍️ Product listing and product details
* 🔎 Product browsing and categories
* 🛒 Shopping cart
* 🔐 User authentication
* 👤 User account management
* 📦 Checkout and shipping information
* 🧾 Order creation
* 📱 Fully responsive design
* 🎨 Modern luxury-inspired UI
* ⚡ Fast navigation with Next.js

## 🧰 Tech Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Lucide React**

### Backend Integration

The frontend communicates with a separate REST API backend responsible for:

* Authentication
* Users
* Products
* Categories
* Cart
* Orders
* Admin operations

## 🏗️ Project Structure

```text
app/
├── (auth)/
├── (shop)/
├── cart/
├── checkout/
├── products/
└── ...

components/
├── product/
├── cart/
└── ...

data/
└── ...

public/
└── ...
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SedjaiRadja/ecomerce-frontend.git
```

### 2. Navigate to the project

```bash
cd ecomerce-frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000
```

Make sure the backend API is running on the configured URL.

### 5. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## 🔗 Related Repositories

This frontend is part of a full-stack e-commerce application with separate repositories for the backend API and administration dashboard.

* **Frontend:** This repository
* **Backend:** Node.js / Express REST API
* **Dashboard:** Next.js administration dashboard

## 📌 Project Status

**Completed**

The frontend is integrated with the backend for authentication, products, categories, cart, checkout, and order creation.

## 👩‍💻 Author

**Radja Sedjai**

Frontend / Full-Stack Developer

GitHub: [@SedjaiRadja](https://github.com/SedjaiRadja)

---

⭐ If you find this project interesting, feel free to explore the repository.


The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
