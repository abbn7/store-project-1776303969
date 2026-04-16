# Store - Architecture Document
## وثيقة تصميم النظام

---

## 1. نظرة عامة على البنية (System Overview)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │   Next.js   │  │  Tailwind   │  │   Zustand   │  │  Framer Motion  │ │
│  │   App Router│  │    CSS      │  │    Store    │  │   Animation     │ │
│  └──────┬──────┘  └─────────────┘  └─────────────┘  └─────────────────┘ │
│         │                                                                │
│  ┌──────┴────────────────────────────────────────────────────────────┐  │
│  │                     React Components                               │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │  │
│  │  │   UI     │ │  Layout  │ │  Store   │ │ Product  │ │  Admin   │ │  │
│  │  │Components│ │Components│ │Components│ │Components│ │Components│ │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                              API LAYER                                   │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    Next.js API Routes                             │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │   │
│  │  │  /products  │ │ /categories │ │   /cart     │ │   /admin    │ │   │
│  │  │    route.ts │ │   route.ts  │ │  route.ts   │ │  route.ts   │ │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           DATA LAYER                                     │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                         Supabase                                  │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │   │
│  │  │  PostgreSQL │ │    Auth     │ │   Storage   │ │  Realtime   │ │   │
│  │  │  Database   │ │             │ │             │ │             │ │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Stack التقني

| الطبقة | التقنية | الاستخدام |
|--------|---------|-----------|
| Frontend Framework | Next.js 14 (App Router) | SSR, SSG, API Routes |
| Language | TypeScript | Type Safety |
| Styling | Tailwind CSS | Utility-first CSS |
| UI Components | shadcn/ui | Base components |
| Animation | Framer Motion | Transitions, scroll effects |
| State Management | Zustand | Global state, cart |
| Backend | Supabase | Database, Auth, Storage |
| Forms | React Hook Form + Zod | Validation |
| Icons | Lucide React | Consistent icons |
| Fonts | Inter (Google Fonts) | Typography |

---

## 3. هيكل المشروع (Folder Structure)

```
/store
├── /app                          # Next.js App Router
│   ├── layout.tsx               # Root layout + providers
│   ├── page.tsx                 # Homepage
│   ├── loading.tsx              # Loading UI
│   ├── error.tsx                # Error boundary
│   ├── not-found.tsx            # 404 page
│   ├── globals.css              # Global styles
│   │
│   ├── /products
│   │   ├── page.tsx             # Products listing
│   │   ├── loading.tsx
│   │   └── /[slug]
│   │       ├── page.tsx         # Product detail
│   │       └── loading.tsx
│   │
│   ├── /cart
│   │   ├── page.tsx             # Cart page
│   │   └── loading.tsx
│   │
│   ├── /checkout
│   │   ├── page.tsx             # Checkout page
│   │   └── loading.tsx
│   │
│   ├── /about
│   │   └── page.tsx             # About page
│   │
│   ├── /contact
│   │   └── page.tsx             # Contact page
│   │
│   ├── /admin
│   │   ├── page.tsx             # Admin dashboard
│   │   ├── layout.tsx           # Admin layout (protected)
│   │   └── loading.tsx
│   │
│   └── /api
│       ├── /products
│       │   └── route.ts         # Products API
│       ├── /categories
│       │   └── route.ts         # Categories API
│       ├── /cart
│       │   └── route.ts         # Cart API
│       └── /admin
│           └── route.ts         # Admin API
│
├── /components
│   ├── /ui                      # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── modal.tsx
│   │   ├── input.tsx
│   │   ├── skeleton.tsx
│   │   └── ...
│   │
│   ├── /layout                  # Layout components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-menu.tsx
│   │   └── announcement-bar.tsx
│   │
│   ├── /home                    # Homepage sections
│   │   ├── hero.tsx
│   │   ├── featured-categories.tsx
│   │   ├── featured-products.tsx
│   │   ├── marquee-banner.tsx
│   │   ├── why-us.tsx
│   │   ├── best-sellers.tsx
│   │   ├── social-proof.tsx
│   │   ├── new-arrivals.tsx
│   │   ├── flash-sale.tsx
│   │   ├── instagram-feed.tsx
│   │   └── newsletter.tsx
│   │
│   ├── /store                   # Store components
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   ├── product-filters.tsx
│   │   ├── cart-item.tsx
│   │   ├── quantity-selector.tsx
│   │   └── quick-add-button.tsx
│   │
│   ├── /product                 # Product detail components
│   │   ├── image-gallery.tsx
│   │   ├── product-info.tsx
│   │   ├── reviews-section.tsx
│   │   ├── related-products.tsx
│   │   └── stock-indicator.tsx
│   │
│   ├── /cart                    # Cart components
│   │   ├── cart-items.tsx
│   │   ├── order-summary.tsx
│   │   └── empty-cart.tsx
│   │
│   ├── /admin                   # Admin components
│   │   ├── dashboard-stats.tsx
│   │   ├── product-form.tsx
│   │   ├── products-table.tsx
│   │   ├── categories-manager.tsx
│   │   ├── site-settings.tsx
│   │   ├── reviews-manager.tsx
│   │   └── newsletter-list.tsx
│   │
│   └── /marketing               # Marketing components
│       ├── countdown-timer.tsx
│       ├── social-proof-popup.tsx
│       ├── newsletter-popup.tsx
│       └── trust-badges.tsx
│
├── /hooks                       # Custom React hooks
│   ├── use-cart.ts
│   ├── use-products.ts
│   ├── use-categories.ts
│   ├── use-admin.ts
│   ├── use-theme.ts
│   ├── use-scroll.ts
│   └── use-local-storage.ts
│
├── /store                       # Zustand stores
│   ├── cart-store.ts
│   ├── theme-store.ts
│   └── admin-store.ts
│
├── /types                       # TypeScript types
│   ├── index.ts
│   ├── product.ts
│   ├── category.ts
│   ├── cart.ts
│   ├── review.ts
│   └── settings.ts
│
├── /lib                         # Utilities
│   ├── supabase.ts              # Supabase client (browser)
│   ├── supabase-server.ts       # Supabase client (server)
│   ├── utils.ts                 # Helper functions
│   └── constants.ts             # Constants
│
├── /docs                        # Documentation
│   ├── requirements.md
│   ├── architecture.md
│   ├── api-spec.md
│   ├── database-schema.md
│   ├── roadmap.md
│   └── deployment.md
│
├── /public                      # Static assets
│   ├── /images
│   └── /fonts
│
├── middleware.ts                # Next.js middleware
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local
```

---

## 4. مخطط تدفق البيانات (Data Flow)

### 4.1 عرض المنتجات
```
User → /products → ProductGrid → useProducts → Supabase
                                        ↓
                              Zustand Cache (optional)
```

### 4.2 إضافة للسلة
```
User → ProductCard → QuickAdd → cart-store.ts → localStorage
                                        ↓
                              Navbar (cart count update)
```

### 4.3 إدارة المنتجات (Admin)
```
Admin → /admin → ProductForm → API /admin → Supabase
                                        ↓
                              Storage (images)
```

---

## 5. State Management

### 5.1 Zustand Stores

| Store | البيانات | Persist |
|-------|----------|---------|
| cart-store | items, total, count | localStorage |
| theme-store | theme (light/dark) | localStorage |
| admin-store | isAuthenticated, session | localStorage |

### 5.2 Server State
- React Server Components (RSC) لجلب البيانات
- Revalidation عند التعديل

---

## 6. Authentication & Authorization

### 6.1 Admin Access
```
User → Footer (secret button) → Email Modal → Verify → /admin
                                                         ↓
                                              Middleware Check
                                                         ↓
                                              Access Granted
```

### 6.2 Middleware Logic
```typescript
// middleware.ts
if (path.startsWith('/admin')) {
  const session = await getAdminSession();
  if (!session) {
    return redirect('/');
  }
}
```

---

## 7. Animation Strategy

| Animation | Library | Trigger |
|-----------|---------|---------|
| Page transitions | Framer Motion | Route change |
| Scroll reveal | Framer Motion | InView |
| Hero text | Framer Motion | Mount |
| Product cards stagger | Framer Motion | InView |
| Navbar hide/show | Framer Motion | Scroll direction |
| Cart bounce | Framer Motion | Item added |
| Counter up | Framer Motion | InView |
| Marquee | CSS Animation | Always |
| Button hover | CSS + Framer | Hover |
| Image zoom | CSS | Hover |
| Modal | Framer Motion | Open/Close |

---

## 8. Performance Strategy

### 8.1 Image Optimization
- Next/Image لكل الصور
- Lazy loading تلقائي
- WebP format
- Responsive sizes

### 8.2 Code Splitting
- Dynamic imports للمكونات الثقيلة
- Route-based splitting

### 8.3 Caching
- Next.js Data Cache
- Supabase CDN للصور

---

## 9. Security Measures

| Layer | Measure |
|-------|---------|
| Database | RLS policies |
| API | Input validation (Zod) |
| Admin | Middleware protection |
| Client | No secrets exposed |
| Forms | CSRF protection |

---

**المستند الإصدار:** 1.0  
**آخر تحديث:** 2026-04-16  
**المسؤول:** Abdelhaned Nada
