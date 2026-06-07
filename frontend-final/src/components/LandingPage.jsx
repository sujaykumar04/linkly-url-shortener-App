import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
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

// URL pairs that cycle — long URL gets "shortened" live
const URL_PAIRS = [
  {
    long: "https://github.com/org/very-long-repo-name/blob/main/README.md",
    short: "lnk.ly/gH3xQp",
    clicks: "1.4k",
  },
  {
    long: "https://youtube.com/watch?v=dQw4w9WgXcQ&list=PLxxx",
    short: "lnk.ly/mK9vRs",
    clicks: "892",
  },
  {
    long: "https://medium.com/@user/article-with-a-very-long-title-here",
    short: "lnk.ly/nT2wYa",
    clicks: "387",
  },
];

// Typewriter hook
const useTypewriter = (texts, typingSpeed = 65, deletingSpeed = 30, pauseTime = 2200) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    if (isPausing) {
      const t = setTimeout(() => { setIsPausing(false); setIsDeleting(true); }, pauseTime);
      return () => clearTimeout(t);
    }
    if (isDeleting) {
      if (displayText.length === 0) { setIsDeleting(false); setTextIndex((p) => (p + 1) % texts.length); return; }
      const t = setTimeout(() => setDisplayText((p) => p.slice(0, -1)), deletingSpeed);
      return () => clearTimeout(t);
    }
    if (displayText.length === current.length) { setIsPausing(true); return; }
    const t = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), typingSpeed);
    return () => clearTimeout(t);
  }, [displayText, isDeleting, isPausing, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
};

// Word blur-in
const AnimatedHeadline = ({ text, className, delay = 0 }) => (
  <span className={className}>
    {text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, delay: delay + i * 0.14, ease: [0.25, 0.1, 0.25, 1] }}
        className="inline-block mr-[0.25em]"
      >
        {word}
      </motion.span>
    ))}
  </span>
);

// Live URL shortening animation card
const UrlShorteningDemo = () => {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("showing-long"); 
  // phases: showing-long → shortening → showing-short → pause → next

  useEffect(() => {
    const timers = {
      "showing-long":   () => setTimeout(() => setPhase("shortening"),    1800),
      "shortening":     () => setTimeout(() => setPhase("showing-short"), 900),
      "showing-short":  () => setTimeout(() => setPhase("pause"),         2000),
      "pause":          () => setTimeout(() => {
        setPhase("showing-long");
        setIndex((p) => (p + 1) % URL_PAIRS.length);
      }, 400),
    };
    const t = timers[phase]?.();
    return () => clearTimeout(t);
  }, [phase, index]);

  const current = URL_PAIRS[index];
  const all = URL_PAIRS;

  return (
    <div className="card p-5 space-y-4">
      <p className="section-title">Live shortening</p>

      {/* Main animation area */}
      <div
        className="rounded-xl p-4 min-h-[88px] flex flex-col justify-center gap-2 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.06) 100%)",
          border: "1px solid rgba(99,102,241,0.15)",
        }}
      >
        <AnimatePresence mode="wait">
          {phase === "showing-long" && (
            <motion.div
              key="long"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className="space-y-1"
            >
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Long URL
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono break-all leading-relaxed">
                {current.long}
              </p>
            </motion.div>
          )}

          {phase === "shortening" && (
            <motion.div
              key="shortening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center gap-2 py-1"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scaleX: [1, 0.3, 1] }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="h-1.5 w-24 rounded-full bg-primary-300 dark:bg-primary-700"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.7, ease: "linear" }}
                  className="w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full"
                />
                <motion.div
                  animate={{ scaleX: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="h-1.5 w-8 rounded-full bg-primary-400 dark:bg-primary-600"
                />
              </div>
              <p className="text-xs text-primary-500 dark:text-primary-400 font-medium">
                Shortening…
              </p>
            </motion.div>
          )}

          {(phase === "showing-short" || phase === "pause") && (
            <motion.div
              key="short"
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="space-y-1"
            >
              <p className="text-[10px] font-semibold text-emerald-500 uppercase tracking-widest">
                ✓ Shortened
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-base font-mono font-bold text-primary-600 dark:text-primary-400">
                  {current.short}
                </p>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(16,185,129,0.12)",
                    color: "#10b981",
                  }}
                >
                  {current.clicks}
                </span>
              </div>
              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="h-0.5 rounded-full origin-left"
                style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* All 3 links — static list below */}
      <div className="space-y-2">
        {all.map((d, i) => (
          <motion.div
            key={d.short}
            animate={{
              opacity: i === index ? 1 : 0.45,
              scale: i === index ? 1 : 0.98,
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg
                       bg-surface-secondary dark:bg-dark-surface2
                       border border-surface-border dark:border-dark-border"
          >
            <div className="min-w-0">
              <p className="text-xs font-mono font-semibold text-primary-600 dark:text-primary-400 truncate">
                {d.short}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                {d.long}
              </p>
            </div>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: "rgba(16,185,129,0.1)",
                color: "#10b981",
              }}
            >
              {d.clicks}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Mini chart */}
      <div>
        <p className="section-title mb-2">Clicks this week</p>
        <div className="flex items-end gap-1 h-10">
          {[30, 55, 40, 70, 45, 90, 60].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${h}%`, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.07, ease: "easeOut" }}
              className="flex-1 rounded-sm bg-primary-200 dark:bg-primary-800/50"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  const goToDash = () => navigate(token ? "/dashboard" : "/login");

  const eyebrowText = useTypewriter(
    ["✦ URL Shortener & Analytics", "✦ Track Every Click", "✦ Free to Start", "✦ Built for Creators"],
    65, 30, 2200
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface-secondary dark:bg-dark-bg
                    transition-colors duration-200 overflow-hidden">

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.07] dark:opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05] dark:opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      {/* ── Hero ── */}
      <section className="lg:px-14 sm:px-8 px-4 pt-14 pb-10
                          flex lg:flex-row flex-col gap-10
                          items-center justify-between max-w-7xl mx-auto relative">
        {/* Left */}
        <div className="lg:w-[54%] w-full flex flex-col gap-5">

          {/* Eyebrow typewriter */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-7 flex items-center"
          >
            <span className="badge badge-primary text-xs font-medium tracking-wide">
              {eyebrowText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="ml-0.5 inline-block w-[2px] h-[12px] bg-primary-500 rounded-full align-middle"
              />
            </span>
          </motion.div>

          {/* Headline — word by word, tighter gap */}
          <h1 className="font-bold text-slate-900 dark:text-white
                         text-4xl sm:text-5xl leading-tight tracking-tight">
            <AnimatedHeadline text="URL Shortener & Analytics  Shorten Smarter." delay={0.2} />
            {" "}
            <AnimatedHeadline text="Track everything." delay={0.55} className="text-gradient" />
          </h1>

          {/* Subtext — fast */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-slate-500 dark:text-slate-400 text-base leading-relaxed max-w-lg"
          >
            Linkly turns long, messy URLs into clean links — then gives
            you a beautiful dashboard to see exactly who clicked, when, and
            how many times.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
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
            transition={{ duration: 0.5, delay: 0.65 }}
            className="text-xs text-slate-400 dark:text-slate-500"
          >
            Free to start · No credit card required
          </motion.p>
        </div>

        {/* Right — live shortening demo */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="lg:w-[42%] w-full"
        >
          <UrlShorteningDemo />
        </motion.div>
      </section>

      {/* ── Stats bar ── */}
      <section className="lg:px-14 sm:px-8 px-4 pb-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 divide-x divide-surface-border dark:divide-dark-border
                      border border-surface-border dark:border-dark-border rounded-2xl overflow-hidden"
        >
          {[
            { num: "10K+",   label: "Links created"  },
            { num: "99.9%",  label: "Uptime"         },
            { num: "<100ms", label: "Redirect speed" },
          ].map(({ num, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white dark:bg-dark-surface py-6 text-center"
            >
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{num}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Feature cards ── */}
      <section className="lg:px-14 sm:px-8 px-4 pb-14 max-w-7xl mx-auto">
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

      {/* ── CTA ── */}
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