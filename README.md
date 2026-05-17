<<<<<<< HEAD
# Kartik Paver Industries — Full Stack Website

**Premium Quality Paver Block Solutions | Latur, Maharashtra**

---

## 🏗️ Project Structure

```
Bhya/
├── frontend/          # React + Tailwind CSS + Framer Motion
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/       # Reusable components
│   │   │   ├── home/         # Home page sections
│   │   │   └── layout/       # Navbar, Footer
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       └── AdminDashboard.jsx
│   │   └── App.jsx
│   └── package.json
│
└── backend/           # Django + DRF + PostgreSQL
    ├── kartik_paver/  # Django project settings
    ├── api/           # REST API app
    │   ├── models.py
    │   ├── serializers.py
    │   ├── views.py
    │   ├── urls.py
    │   ├── admin.py
    │   └── management/commands/seed_data.py
    ├── requirements.txt
    ├── .env
    └── setup.bat
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL 14+

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend runs at **http://localhost:3000**

---

### Backend Setup

#### 1. Create PostgreSQL Database
```sql
CREATE DATABASE kartik_paver_db;
```

#### 2. Configure Environment
Edit `backend/.env` with your database credentials:
```
DB_NAME=kartik_paver_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

#### 3. Run Setup Script (Windows)
```bash
cd backend
setup.bat
```

Or manually:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py seed_data
python manage.py createsuperuser
python manage.py runserver
```

The backend API runs at **http://localhost:8000/api/**

---

## 🔗 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products/` | GET | List all active products |
| `/api/gallery/` | GET | List all gallery images |
| `/api/inquiries/` | POST | Submit a new inquiry |
| `/api/testimonials/` | GET | List active testimonials |
| `/api/services/` | GET | List active services |
| `/api/settings/` | GET | Get site settings |
| `/api/auth/login/` | POST | Admin JWT login |
| `/api/auth/refresh/` | POST | Refresh JWT token |

---

## 🔐 Admin Access

- **Frontend Admin**: http://localhost:3000/admin/login
- **Django Admin**: http://localhost:8000/django-admin/

Default admin credentials (set during `createsuperuser`).

---

## 📱 Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, Products, Why Choose Us, Factory, Testimonials, CTA |
| About | `/about` | Company story, Vision/Mission, Manufacturing, Timeline |
| Products | `/products` | Product grid with filtering and detail modal |
| Gallery | `/gallery` | Masonry gallery with lightbox |
| Services | `/services` | Service cards with process steps |
| Contact | `/contact` | Contact form, Map, FAQ |
| Admin Login | `/admin/login` | Secure admin authentication |
| Admin Dashboard | `/admin/dashboard` | Full CRUD management |

---

## 🎨 Design System

- **Primary Color**: Orange (`#ea580c` / `#f97316`)
- **Background**: Dark Gray (`#0f0f0f` / `#1a1a1a`)
- **Fonts**: Oswald (headings), Inter (body), Rajdhani (accents)
- **Style**: Industrial Modern

---

## 🏢 Business Information

**Kartik Paver Industries**  
Plot No C10, Near Atul Metal, 1 No MIDC  
Latur - 413531, Maharashtra  
Phone: +91 90548 39964  
Email: kartikpaverindustries@gmail.com  
GSTIN: 27ABCFK5217C1ZP  
Rating: 4.9★ on Justdial

---

## ✅ Features Checklist

- [x] Responsive React frontend
- [x] Tailwind CSS industrial design
- [x] Framer Motion animations
- [x] Hero section with slider
- [x] Product showcase with filtering
- [x] Product detail modal
- [x] Gallery with lightbox
- [x] Contact form with validation
- [x] WhatsApp floating button
- [x] SEO meta tags
- [x] Django REST API
- [x] JWT authentication
- [x] Admin dashboard (CRUD)
- [x] PostgreSQL database
- [x] Email notifications on inquiry
- [x] Data seeding command
- [x] Mobile responsive
=======
# Kartikpaver
>>>>>>> 875f23b54700be37ae54c52e818a9e9109909cd2
