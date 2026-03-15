# 🔗 Linklytics — URL Shortener & Analytics

> A full-stack URL shortening platform with real-time click analytics, built with Spring Boot and React.

---

## ✨ Features

- 🔗 **URL Shortening** — Generate clean 8-character short links instantly
- 📊 **Analytics Dashboard** — View total clicks over time with bar charts
- 🔍 **Per-Link Analytics** — Expand any link to see its individual click history
- 🔐 **JWT Authentication** — Secure register & login with token-based auth
- 🌙 **Dark / Light Mode** — System-aware theme toggle, persisted across sessions
- 📋 **Copy to Clipboard** — One-click copy of any short URL
- 🔒 **Protected Routes** — Dashboard requires login, public pages auto-redirect

---

## 🛠 Tech Stack

**Backend**

| Technology | Purpose |
| --- | --- |
| Spring Boot | REST API framework |
| Spring Security | Authentication & authorization |
| JWT (jjwt) | Token-based auth |
| Spring Data JPA | Database ORM |
| PostgreSQL | Relational database |
| Lombok | Boilerplate reduction |

**Frontend**

| Technology | Purpose |
| --- | --- |
| React 18 + Vite | UI framework & build tool |
| Tailwind CSS | Utility-first styling |
| React Query | Server state & caching |
| Chart.js | Analytics bar charts |
| React Hook Form | Form validation |
| React Router v7 | Client-side routing |
| Axios | HTTP client |

---

## 📁 Project Structure

```
URL-Shortener/
│
├── frontend-final/                     # React + Vite frontend
│   └── src/
│       ├── api/                        # Axios instance
│       ├── contextApi/                 # Auth token + dark mode state
│       ├── hooks/                      # React Query custom hooks
│       ├── utils/                      # Subdomain routing helpers
│       └── components/
│           ├── LandingPage.jsx
│           ├── LoginPage.jsx
│           ├── RegisterPage.jsx
│           └── Dashboard/
│               ├── DashboardLayout.jsx
│               ├── Graph.jsx
│               ├── ShortenItem.jsx
│               └── CreateNewShorten.jsx
│
└── url-shortener-Springboot/           # Spring Boot backend
    └── src/main/java/com/url/shortener/
        ├── controller/                 # Auth, URL, Redirect controllers
        ├── service/                    # Business logic
        ├── models/                     # User, UrlMapping, ClickEvent
        ├── dtos/                       # Request / response objects
        ├── repository/                 # JPA repositories
        └── security/                   # JWT filter & config
```

---


---


## 📸 Screenshots

> 🚧 Coming Soon

---

## 🌍 Live Demo

> 🚧 Coming Soon — Deployment in progress

---

## ☁️ Deployment

> 🚧 Coming Soon — Guide for deploying backend to Render and frontend to Netlify will be added here

---

## 👤 Author

**Sujay Kumar**  
GitHub: [@sujaykumar04](https://github.com/sujaykumar04)

---

*Built with Spring Boot + React*
