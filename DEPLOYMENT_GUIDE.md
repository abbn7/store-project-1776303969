# Store - Deployment Guide
## دليل النشر على Vercel

---

## 🚀 خطوات النشر

### الخطوة 1: إعداد GitHub Repository

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Store v1.0"

# Create repository on GitHub (manually or via CLI)
# Then push:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/store.git
git push -u origin main
```

---

### الخطوة 2: إعداد Supabase

1. **إنشاء مشروع جديد:**
   - انتقل إلى [supabase.com](https://supabase.com)
   - أنشئ مشروع جديد
   - احفظ المفاتيح التالية من Settings > API

2. **تشغيل Database Schema:**
   - افتح SQL Editor في Supabase Dashboard
   - انسخ محتوى `/sql/schema.sql`
   - شغّل الـ SQL

3. **إعداد Storage:**
   - اذهب إلى Storage
   - أنشئ bucket جديد: `store-images`
   - اضبط الصلاحيات: Public = true

---

### الخطوة 3: نشر على Vercel

1. **ربط المشروع:**
   - انتقل إلى [vercel.com](https://vercel.com)
   - Import Project → From GitHub
   - اختر repository `store`

2. **إعداد Build:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **إضافة Environment Variables:**

   انسخ والصق المتغيرات التالية:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   SUPABASE_JWT_SECRET=your-jwt-secret
   POSTGRES_URL=your-postgres-url
   ADMIN_EMAIL=admin@example.com
   ```

4. **Deploy:**
   - اضغط على "Deploy"
   - انتظر حتى اكتمال البناء

---

### الخطوة 4: إعداد Custom Domain (اختياري)

1. في Vercel Dashboard → Domains
2. أضف domainك: `yourstore.com`
3. اتبع تعليمات DNS

---

### الخطوة 5: اختبار الموقع

افتح الـ Production URL واختبر:

- [ ] Homepage تحميل
- [ ] Products page
- [ ] Product detail page
- [ ] Cart functionality
- [ ] Admin login (زر سري في Footer)
- [ ] Dark mode toggle
- [ ] Responsive على mobile

---

## 📋 قائمة التحقق قبل النشر

### ✅ الكود
- [ ] TypeScript strict mode
- [ ] No console.log في الكود النهائي
- [ ] No unused imports
- [ ] All components typed

### ✅ البيئة
- [ ] Environment variables مضبوطة
- [ ] Supabase مشروع جاهز
- [ ] Database schema منفذ
- [ ] Storage bucket منشأ

### ✅ الاختبار
- [ ] كل الصفحات تعمل
- [ ] API endpoints تستجيب
- [ ] Admin login يعمل
- [ ] Cart functionality تعمل
- [ ] Images تحمل بشكل صحيح

---

## 🔧 استكشاف الأخطاء

### مشكلة: الصور لا تظهر
**الحل:**
```typescript
// في next.config.js
images: {
  domains: ['your-project.supabase.co'],
}
```

### مشكلة: RLS errors
**الحل:**
- تأكد من تفعيل RLS policies
- تأكد من استخدام service_role للـ Admin

### مشكلة: Build fails
**الحل:**
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

---

## 📞 الدعم

**المطور:** Abdelhaned Nada  
**واتساب:** [https://wa.me/message/64L5CHSAIA2DA1](https://wa.me/message/64L5CHSAIA2DA1)

---

## 🎉 تهانينا!

موقعك جاهز للعمل! 🚀
