# Store - API Specification
## توثيق نقاط النهاية (Endpoints)

---

## 1. Products API

### 1.1 الحصول على كل المنتجات
```http
GET /api/products
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | تصفية حسب الفئة |
| min_price | number | الحد الأدنى للسعر |
| max_price | number | الحد الأقصى للسعر |
| sort | string | ترتيب (newest, price_asc, price_desc, popularity) |
| page | number | رقم الصفحة |
| limit | number | عدد المنتجات لكل صفحة |
| featured | boolean | المنتجات المميزة فقط |
| search | string | البحث بالاسم |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 100,
      "total_pages": 9
    }
  }
}
```

### 1.2 إضافة منتج جديد (Admin)
```http
POST /api/products
```

### 1.3 تحديث منتج (Admin)
```http
PUT /api/products/:id
```

### 1.4 حذف منتج (Admin)
```http
DELETE /api/products/:id
```

---

## 2. Categories API

### 2.1 الحصول على كل الفئات
```http
GET /api/categories
```

### 2.2 إضافة فئة جديدة (Admin)
```http
POST /api/categories
```

---

## 3. Cart API

### 3.1 إضافة منتج للسلة
```http
POST /api/cart
```

---

## 4. Admin API

### 4.1 تسجيل دخول Admin
```http
POST /api/admin/login
```

---

**المستند الإصدار:** 1.0  
**آخر تحديث:** 2026-04-16
