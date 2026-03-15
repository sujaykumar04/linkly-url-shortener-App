## Linkly — URL Shortener & Analytics

A full-stack URL shortening platform with real-time click analytics, built with Spring Boot and React.


## What is Linkly?
Linklylets you turn any long URL into a clean, shareable short link — and then tracks every click with a day-by-day analytics dashboard. Built as a production-grade full-stack project with JWT authentication, PostgreSQL, and a minimal dark/light mode UI.

## Features

🔗 URL Shortening — Instantly generate short 8-character slugs for any URL
📊 Analytics Dashboard — View total clicks over time with interactive bar charts
🔍 Per-Link Analytics — Expand any link to see its individual click history
🔐 JWT Authentication — Secure register/login with token-based auth
🌙 Dark / Light Mode — System-aware theme toggle, persisted across sessions
📋 Copy to Clipboard — One-click copy of any short URL
↩️ Smart Redirects — Short links redirect to original URLs with click tracking
🔒 Protected Routes — Dashboard is private; public pages auto-redirect if logged in


## Tech Stack
## Backend
TechnologyPurposeSpring Boot 4REST API frameworkSpring SecurityAuthentication & authorizationJWT (jjwt)Token-based authSpring Data JPADatabase ORMPostgreSQLRelational databaseLombokBoilerplate reduction
## Frontend
TechnologyPurposeReact 18 + ViteUI framework & build toolTailwind CSSUtility-first stylingReact QueryServer state & cachingChart.jsAnalytics bar chartsReact Hook FormForm validationReact Router v7Client-side routingAxiosHTTP clientMUI (Modal)Accessible popup components

## Project Structure

URL-Shortener/
├── frontend-final/               # React + Vite frontend
│   └── src/
│       ├── api/                  # Axios instance
│       ├── components/
│       │   ├── Dashboard/        # DashboardLayout, Graph, ShortenItem...
│       │   ├── LandingPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   └── ...
│       ├── contextApi/           # Auth token + dark mode context
│       ├── hooks/                # React Query custom hooks
│       └── utils/                # Subdomain routing helpers
│
└── url-shortener-Springboot/     # Spring Boot backend
    └── src/main/java/com/url/shortener/
        ├── controller/           # Auth, URL, Redirect controllers
        ├── service/              # Business logic
        ├── models/               # User, UrlMapping, ClickEvent
        ├── dtos/                 # Request/response objects
        ├── repository/           # JPA repositories
        └── security/             # JWT filter, config


Screenshots

🚧 Coming Soon


Live Demo

🚧 Coming Soon — Deployment in progress




Author
Sujay Kumar
GitHub: @sujaykumar04

Built with Spring Boot + React

