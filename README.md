# 🛒 EGA Marketplace

A modern, full-stack e-commerce platform built to make shopping for game and sports products simple, fast, and enjoyable. Customers can browse products, read blogs, join events, and securely purchase items in one seamless experience.

---

## 🚀 Features

- **Home Page** → Landing page with CTAs for shopping, blogs, and events.  
- **Shop Page** → Browse products with search and filtering options.  
- **Product Detail Page** → View product info, multiple images, and add to cart.  
- **Cart Page** → Manage items before checkout.  
- **Events Page** → Explore upcoming, active, and past events.  
- **Blogs Page** → Stay updated with the latest articles.  
- **Authentication** → Secure sign-in and sign-up powered by Clerk.  
- **Admin Panel** → Manage products, blogs, and events.  

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/), [TailwindCSS](https://tailwindcss.com/)  
- **State & Data:** [React Query](https://tanstack.com/query/latest), [React Hook Form](https://react-hook-form.com/)  
- **Auth:** [Clerk](https://clerk.com/)  
- **Database & ORM:** [Prisma](https://www.prisma.io/) with PostgreSQL  
- **Backend:** Node.js + Express (API)  
- **Deployment:** Vercel / Cloud Provider  

---

## ⚡ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/addis-ale/ega_updated
cd ega-marketplace
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables  
Create a `.env` file in the project root and add the following:
```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
```

### 4. Run Prisma migrations
```bash
npx prisma migrate dev
```

### 5. Start the development server
```bash
npm run dev
```

App should now be running on: [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
ega-marketplace/
 ├─ app/                # Next.js App Router pages
 ├─ components/         # Reusable UI components
 ├─ prisma/             # Prisma schema and migrations
 ├─ public/             # Static assets (images, icons, etc.)
 ├─ utils/              # Helper functions
 └─ ...
```

---

## ✅ Roadmap

- [x] Product browsing & cart  
- [x] Blogs & events integration  
- [x] Admin dashboard  
- [ ] Payment gateway integration  
- [ ] Order tracking system  
- [ ] Mobile app (future scope)  

---

## 🤝 Contributing

Pull requests are welcome! Please fork the repo and open a PR with improvements or bug fixes.  

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Built with ❤️ by **Addis Alemayehu**  
