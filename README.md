# Frontend — Hashem Portfolio (React + Vite)

## تشغيل محلي

```bash
cd frontend
npm install
cp .env.example .env      # عدّل VITE_API_URL إذا لزم
npm run dev
```

الموقع بيشتغل على: http://localhost:5173
(تأكد أن الباك اند شغال على http://localhost:8000 بنفس الوقت)

---

## النشر على Netlify

1. ارفع مجلد `frontend` على GitHub.
2. من [netlify.com](https://netlify.com) → Add new site → Import from Git → اختر المستودع.
3. الإعدادات:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
   - **Environment variable:**
     - `VITE_API_URL` → رابط الباك اند على Render (مثال: `https://hashem-portfolio-api.onrender.com`) **بدون** `/` في النهاية
4. Deploy.

### مهم: صفحات React Router على Netlify
عشان رابط `/admin` يشتغل مباشرة (مو بس من الصفحة الرئيسية)، أنشئ ملف `frontend/public/_redirects` بالمحتوى:
```
/*  /index.html  200
```
(تمت إضافته مسبقاً في المشروع.)

---

## الوصول للوحة التحكم

بعد النشر، افتح: `https://موقعك.netlify.app/admin`
سجّل الدخول ببيانات الأدمن (المحددة في الباك اند)، وبتقدر:
- تعديل النبذة والعنوان الرئيسي
- إضافة/تعديل/حذف: مشاريع، أدوات، تعليم، شهادات، خبرات، لغات، ورش، فعاليات، مهارات، توصيات
- تعديل معلومات التواصل

أي تعديل يترحفظ فوراً في قاعدة البيانات ويظهر لجميع الزوار.

---

## هيكل المشروع

```
frontend/src/
  api.js              # الاتصال بالـ API
  App.jsx             # التوجيه (/  و /admin/login و /admin)
  pages/Home.jsx       # يجمع كل أقسام الموقع العام
  components/           # أقسام الموقع (Hero, Projects, Skills...)
  admin/
    AdminLogin.jsx        # صفحة الدخول
    AdminDashboard.jsx     # الشريط الجانبي + التبويبات
    CrudManager.jsx         # جدول + نموذج عام يُستخدم لكل الأقسام
    fieldConfigs.js          # تعريف حقول كل قسم (يتحكم بالنموذج تلقائياً)
  styles/
    tokens.css                # الألوان والخطوط (Sage + Cream)
    site.css                   # تنسيق الموقع العام
    admin.css                   # تنسيق لوحة التحكم
```
