
# 💸 WealthyFIRE - Luxury Financial Independence Dashboard & Blog

**WealthyFIRE** is a sleek, responsive, and fully functional personal finance dashboard and luxury financial blog platform. Designed for those pursuing **FIRE (Financial Independence, Retire Early)** with style and precision, the app offers intuitive tools to manage transactions and share insights through rich blog content.

Built with modern technologies like **React, Vite, TypeScript, Supabase**, and **shadcn/ui**, it delivers a premium UX across devices with full dark mode support.

---

## 🚀 Features

* 🔐 **User Authentication** (Supabase)
* 📊 **Financial Dashboard**: Track your transactions & spending
* 📝 **Luxury Finance Blog**: Read and publish high-end financial content
* 🌘 **Dark Mode Support**: Elegant and eye-friendly UI
* 🖥️ **Responsive Design**: Tailored for desktop and mobile
* ⚡ **Modern Tech Stack**: Built using Vite, React, Tailwind CSS, TypeScript, shadcn/ui

---

## 📁 Project Structure

```bash
src/
├── components/         # Reusable UI components (includes shadcn/ui)
├── contexts/           # React Contexts (e.g., AuthContext)
├── hooks/              # Custom React Hooks
├── lib/                # Supabase client and other utilities
├── pages/              # App pages (Dashboard, Blog, etc.)
├── services/           # API interaction logic
├── App.tsx             # Root App component
└── main.tsx            # App entry point
```

---

## 🛠️ Getting Started

### Prerequisites

* **Node.js** v18+
* **npm** or **bun**
* Supabase account and project

### 🔧 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aroyy007/WealthyFIRE.git
   cd wealthyfire-main
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables:**

   * Create a `.env` file by copying `.env.example`
   * Add your Supabase credentials:

     ```env
     VITE_SUPABASE_URL=<your-supabase-url>
     VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
     ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. **Visit in your browser:** [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build the app for production     |
| `npm run preview` | Preview production build         |
| `npm run lint`    | Run linter to check code quality |

---

## 🔐 Authentication (Supabase)

The app uses Supabase for user auth. Provided via `AuthContext`.

### Available Functions

* `signUp(email, password)`
* `signIn(email, password)`
* `signOut()`
* `user` – current logged-in user

---

## 🧠 API Services

### 📘 Blog Service – `src/services/blogService.ts`

| Function               | Description             |
| ---------------------- | ----------------------- |
| `getBlogs()`           | Fetch all blog posts    |
| `addBlog(blogData)`    | Create a new blog post  |
| `updateBlog(id, data)` | Edit existing blog post |
| `deleteBlog(id)`       | Remove a blog post      |

### 💰 Transaction Service – `src/services/transactionService.ts`

| Function                      | Description                         |
| ----------------------------- | ----------------------------------- |
| `getTransactions(userId)`     | Fetch user’s financial transactions |
| `addTransaction(data)`        | Add a new transaction               |
| `updateTransaction(id, data)` | Edit existing transaction           |
| `deleteTransaction(id)`       | Delete a transaction                |

---

## 🗃️ Supabase Database Schema

| Table          | Description                     |
| -------------- | ------------------------------- |
| `profiles`     | User profile metadata           |
| `blogs`        | Blog posts                      |
| `transactions` | Personal financial transactions |

---

## 🎨 UI Components

Reusable components built with `shadcn/ui`, styled via Tailwind CSS, available in:

* `src/components/ui/`
* `src/components/` – Includes layout elements, cards, buttons, inputs, etc.
* Pages include `Dashboard.tsx`, `Blog.tsx`, and more

---

## 🌍 Deployment

The app is production-ready and can be deployed to:

* **Vercel**
* **Netlify**
* **Cloudflare Pages**
* Any platform supporting **Vite static site** deployment

**Set your `.env` variables in the deployment dashboard.**

---

## 🛡️ .gitignore (Sensitive File Protection)

The following important paths are ignored:

```gitignore
node_modules
dist
.env
.vscode/*
.idea
*.log
*.suo
*.njsproj
.DS_Store
```

---

## 🧩 Contributing

1. Fork this repo
2. Create a new branch (`git checkout -b feature-name`)
3. Make changes and commit (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a Pull Request

---

## 📅 Roadmap / Future Enhancements

* [ ] Budget forecasting using AI
* [ ] Expense categorization and insights
* [ ] Markdown support for blogs
* [ ] Real-time notifications (e.g., new blog post alerts)
* [ ] Mobile PWA support

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

