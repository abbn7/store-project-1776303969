# Store - Premium E-commerce Platform

A modern, full-featured e-commerce platform built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

### Core Features
- 🛍️ Product catalog with categories
- 🛒 Shopping cart with localStorage persistence
- 🔍 Product search and filtering
- 📱 Fully responsive design
- 🌙 Dark mode support
- ⚡ Fast performance with Next.js App Router

### Admin Features
- 🔐 Secure admin dashboard
- 📦 Product management (CRUD)
- 📁 Category management
- ⭐ Review management
- 📧 Newsletter subscribers
- ⚙️ Site settings

### Marketing Features
- 📢 Announcement bar
- 📨 Newsletter popup
- ⏰ Countdown timer
- 🏷️ Trust badges
- 📊 Social proof stats

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Project Structure

```
/store
├── /app                  # Next.js App Router
│   ├── /api             # API Routes
│   ├── /products        # Product pages
│   ├── /cart            # Cart page
│   ├── /admin           # Admin dashboard
│   └── ...
├── /components          # React components
│   ├── /ui             # UI components
│   ├── /layout         # Layout components
│   ├── /home           # Homepage sections
│   ├── /store          # Store components
│   ├── /product        # Product detail components
│   ├── /cart           # Cart components
│   ├── /admin          # Admin components
│   └── /marketing      # Marketing components
├── /store              # Zustand stores
├── /types              # TypeScript types
├── /lib                # Utilities
├── /docs               # Documentation
└── /sql                # Database schema
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=admin@example.com
```

## Database Setup

Run the SQL schema in `/sql/schema.sql` in your Supabase SQL Editor.

## Admin Access

1. Scroll to the bottom of any page
2. Click the small transparent button in the bottom right corner
3. Enter the admin email
4. Access the dashboard

## Developer

**Abdelhaned Nada**
- WhatsApp: [https://wa.me/message/64L5CHSAIA2DA1](https://wa.me/message/64L5CHSAIA2DA1)

## License

MIT
