import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";

const CARDS = [
  {
    title: "Instant URL Shortening",
    desc: "Turn any long URL into a clean, shareable link in one click.",
  },
  {
    title: "Real-Time Analytics",
    desc: "Track every click with day-by-day charts and performance trends.",
  },
  {
    title: "Secure & Private",
    desc: "JWT-authenticated dashboard — only you see your links and data.",
  },
  {
    title: "Fast Redirects",
    desc: "Near-zero latency redirections with automatic click recording.",
  },
];

const DEMOS = [
  { slug: "gH3xQp", url: "https://github.com/org/very-long-repo-name/blob/main/README.md", clicks: "1.4k" },
  { slug: "mK9vRs", url: "https://youtube.com/watch?v=dQw4w9WgXcQ&list=PL", clicks: "892" },
  { slug: "nT2wYa", url: "https://medium.com/@user/article-with-a-very-long-title", clicks: "387" },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  const goToDash = () => navigate(token ? "/dashboard" : "/login");

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface-secondary dark:bg-dark-bg
                    transition-colors duration-200">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="lg:px-14 sm:px-8 px-4 pt-16 pb-12
                          flex lg:flex-row flex-col gap-12
                          items-center justify-between max-w-7xl mx-auto">
        {/* Left */}
        <div className="lg:w-[54%] w-full flex flex-col gap-6">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge badge-primary text-xs">
              ✦ URL Shortener &amp; Analytics
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-bold text-slate-900 dark:text-white
                       text-4xl sm:text-5xl leading-tight tracking-tight"
          >
            Shorten smarter.{" "}
            <span className="text-gradient">Track everything.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 text-base leading-relaxed max-w-lg"
          >
            Linkly turns long, messy URLs into clean links — then gives
            you a beautiful dashboard to see exactly who clicked, when, and
            how many times.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <button onClick={goToDash} className="btn-primary">
              Get started free →
            </button>
            <button onClick={() => navigate("/about")} className="btn-secondary">
              Learn more
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-xs text-slate-400 dark:text-slate-500"
          >
            Free to start · No credit card required
          </motion.p>
        </div>

        {/* Right — demo card */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:w-[42%] w-full"
        >
          <div className="card p-5 space-y-3">
            <p className="section-title">Recent links</p>
            {DEMOS.map((d) => (
              <div
                key={d.slug}
                className="flex items-center justify-between gap-3
                           p-3 rounded-xl
                           bg-surface-secondary dark:bg-dark-surface2
                           border border-surface-border dark:border-dark-border"
              >
                <div className="min-w-0">
                  <p className="text-sm font-mono font-medium text-primary-600 dark:text-primary-400">
                    lnk.ly/{d.slug}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                    {d.url}
                  </p>
                </div>
                <span className="badge badge-success flex-shrink-0">
                  {d.clicks}
                </span>
              </div>
            ))}
            {/* Mini chart bars */}
            <div className="pt-2">
              <p className="section-title mb-2">Clicks this week</p>
              <div className="flex items-end gap-1 h-10">
                {[30, 55, 40, 70, 45, 90, 60].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-primary-200 dark:bg-primary-800/50"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <section className="lg:px-14 sm:px-8 px-4 pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-3 divide-x divide-surface-border
                        dark:divide-dark-border
                        border border-surface-border dark:border-dark-border
                        rounded-2xl overflow-hidden">
          {[
            { num: "10K+",    label: "Links created"   },
            { num: "99.9%",   label: "Uptime"          },
            { num: "<100ms",  label: "Redirect speed"  },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="bg-white dark:bg-dark-surface
                         py-6 text-center"
            >
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {num}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature cards ────────────────────────────────── */}
      <section className="lg:px-14 sm:px-8 px-4 pb-16 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="section-title text-center mb-6"
        >
          Everything you need
        </motion.p>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {CARDS.map((c, i) => (
            <Card key={i} title={c.title} desc={c.desc} />
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="lg:px-14 sm:px-8 px-4 pb-20 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="card p-10 max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Ready to shorten your first URL?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            Create a free account and start tracking in under a minute.
          </p>
          <button onClick={() => navigate("/register")} className="btn-primary">
            Create free account →
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
