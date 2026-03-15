import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-surface
                        border-t border-surface-border dark:border-dark-border
                        transition-colors duration-200">
      <div className="lg:px-14 sm:px-8 px-4 py-8
                      flex flex-col sm:flex-row items-center
                      justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-custom-gradient
                           flex items-center justify-center
                           text-white font-bold text-xs shadow-sm">L</span>
          <span className="font-semibold text-slate-800 dark:text-white">
            Linkly
          </span>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} Linkly. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex items-center gap-4">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
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
    </footer>
  );
};

export default Footer;
