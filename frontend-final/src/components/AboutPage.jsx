import React from "react";
import { motion } from "motion/react";

const FEATURES = [
  { icon: "🔗", title: "Simple URL Shortening",  desc: "Transform any long URL into a clean, concise link instantly. Perfect for social media, emails, or anywhere brevity matters." },
  { icon: "📊", title: "Powerful Analytics",      desc: "View click counts, day-by-day trends, and per-link breakdowns from a beautiful, real-time dashboard." },
  { icon: "🔐", title: "Secure & Private",         desc: "JWT-based authentication keeps your links and analytics private. Only you control your account." },
  { icon: "⚡", title: "Fast Redirects",           desc: "Near-zero latency redirects with automatic click tracking built in — no configuration needed." },
];

const STACK = [
  "Spring Boot","Spring Security","JWT Auth","PostgreSQL",
  "JPA / Hibernate","React","Vite","Tailwind CSS","React Query","Chart.js",
];

const AboutPage = () => (
  <div className="min-h-[calc(100vh-64px)] bg-surface-secondary dark:bg-dark-bg
                  transition-colors duration-200 lg:px-14 sm:px-8 px-4 py-16">

    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-14 max-w-2xl mx-auto"
    >
      <span className="badge badge-primary mb-4">About Linkly</span>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
        Built for creators &amp;{" "}
        <span className="text-gradient">developers</span>
      </h1>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
        Linkly is a full-stack URL shortening platform with real-time
        analytics. Built with Spring Boot and React — fast, secure, and free
        to start.
      </p>
    </motion.div>

    {/* Feature grid */}
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 max-w-3xl mx-auto mb-16">
      {FEATURES.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="card card-hover p-6 flex gap-4"
        >
          <span className="text-2xl mt-0.5">{f.icon}</span>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-1.5">
              {f.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {f.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Tech stack */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-center max-w-2xl mx-auto"
    >
      <p className="section-title mb-5">Tech stack</p>
      <div className="flex flex-wrap justify-center gap-2">
        {STACK.map((t) => (
          <span key={t} className="badge badge-muted px-3 py-1 text-xs">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  </div>
);

export default AboutPage;
