import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-white dark:bg-dark-surface
                        border-t border-surface-border dark:border-dark-border
                        transition-colors duration-200"
    >
      <div
        className="lg:px-14 sm:px-8 px-4 py-10
                      max-w-7xl mx-auto"
      >
        {/* Top row */}
        <div
          className="flex flex-col sm:flex-row items-start
                        justify-between gap-8 mb-8"
        >
          {/* Brand + tagline */}
          <div className="flex flex-col gap-2 max-w-xs">
            <div className="flex items-center gap-2">
              <span
                className="w-7 h-7 rounded-lg bg-custom-gradient
                               flex items-center justify-center
                               text-white font-bold text-sm shadow-sm"
              >
                L
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-lg">
                Linkly
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
              Shorten URLs, track every click, and share smarter — all from one
              free, beautiful dashboard.
            </p>
          </div>

          {/* Links columns */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <p
                className="text-xs font-semibold text-slate-700 dark:text-slate-300
                             uppercase tracking-widest mb-1"
              >
                Product
              </p>
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/dashboard", label: "Dashboard" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-xs text-slate-400 dark:text-slate-500
                             hover:text-primary-500 dark:hover:text-primary-400
                             transition-colors duration-150"
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <p
                className="text-xs font-semibold text-slate-700 dark:text-slate-300
                             uppercase tracking-widest mb-1"
              >
                Account
              </p>
              {[
                { to: "/login", label: "Sign in" },
                { to: "/register", label: "Sign up" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-xs text-slate-400 dark:text-slate-500
                             hover:text-primary-500 dark:hover:text-primary-400
                             transition-colors duration-150"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-surface-border dark:border-dark-border mb-6" />

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-center
                        justify-between gap-4"
        >
          {/* Copyright */}
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} Linkly. Built by{" "}
            <a
              href="https://github.com/sujaykumar04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:underline font-medium"
            >
              Sujay Kumar
            </a>
            . All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/sujaykumar04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 dark:text-slate-500
                         hover:text-slate-700 dark:hover:text-white
                         transition-colors duration-150"
              aria-label="GitHub"
            >
              <FaGithub className="text-lg" />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 dark:text-slate-500
                         hover:text-slate-700 dark:hover:text-white
                         transition-colors duration-150"
              aria-label="Twitter"
            >
              <FaTwitter className="text-lg" />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 dark:text-slate-500
                         hover:text-slate-700 dark:hover:text-white
                         transition-colors duration-150"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;