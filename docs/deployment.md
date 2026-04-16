# Store - Deployment Guide
## دليل النشر على Vercel

---

## الخطوة 1: إعداد GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/store.git
git push -u origin main
```

---

## الخطوة 2: إعداد Supabase

1. أنشئ مشروع جديد في Supabase
2. شغّل SQL migrations من `/docs/database-schema.md`
3. احفظ المفاتيح

---

## الخطوة 3: نشر على Vercel

1. Import Project من GitHub
2. أضف Environment Variables
3. Deploy

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=admin123321.com
```

---

**المستند الإصدار:** 1.0  
**آخر تحديث:** 2026-04-16
