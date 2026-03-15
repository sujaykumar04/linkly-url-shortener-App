import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { HiMoon, HiSun } from "react-icons/hi2";
import { useStoreContext } from "../contextApi/ContextApi";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, darkMode, toggleDarkMode } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  const linkCls = (href) =>
    `text-sm font-medium transition-colors duration-150 ${
      path === href
        ? "text-primary-500 dark:text-primary-400"
        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 h-16
                    bg-white/80 dark:bg-dark-surface/80
                    backdrop-blur-md
                    border-b border-surface-border dark:border-dark-border
                    transition-colors duration-200">
      <div className="lg:px-14 sm:px-8 px-4 h-full flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-custom-gradient flex items-center justify-center text-white font-bold text-sm shadow-sm">
            L
          </span>
          <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
            Linkly
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-1">
          <Link to="/" className={`px-3 py-2 rounded-lg ${linkCls("/")}`}>Home</Link>
          <Link to="/about" className={`px-3 py-2 rounded-lg ${linkCls("/about")}`}>About</Link>
          {token && (
            <Link to="/dashboard" className={`px-3 py-2 rounded-lg ${linkCls("/dashboard")}`}>
              Dashboard
            </Link>
          )}
        </div>

        {/* Right side */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 flex items-center justify-center rounded-lg
                       text-slate-500 dark:text-slate-400
                       hover:bg-slate-100 dark:hover:bg-dark-surface2
                       transition-all duration-150"
            aria-label="Toggle dark mode"
          >
            {darkMode
              ? <HiSun className="text-lg text-amber-400" />
              : <HiMoon className="text-lg" />
            }
          </button>

          {!token ? (
            <>
              <Link to="/login">
                <button className="btn-ghost text-sm">Sign in</button>
              </Link>
              <Link to="/register">
                <button className="btn-primary text-sm">Get started</button>
              </Link>
            </>
          ) : (
            <button onClick={onLogOutHandler} className="btn-danger text-sm">
              Log out
            </button>
          )}
        </div>

        {/* Mobile: dark toggle + hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 flex items-center justify-center rounded-lg
                       text-slate-500 dark:text-slate-400
                       hover:bg-slate-100 dark:hover:bg-dark-surface2"
            aria-label="Toggle dark mode"
          >
            {darkMode
              ? <HiSun className="text-lg text-amber-400" />
              : <HiMoon className="text-lg" />
            }
          </button>
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-lg
                       text-slate-600 dark:text-slate-300
                       hover:bg-slate-100 dark:hover:bg-dark-surface2"
          >
            {navbarOpen
              ? <RxCross2 className="text-xl" />
              : <IoIosMenu className="text-xl" />
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden overflow-hidden transition-all duration-200
                       bg-white dark:bg-dark-surface
                       border-b border-surface-border dark:border-dark-border
                       ${navbarOpen ? "max-h-64 py-3" : "max-h-0"}`}>
        <div className="px-4 flex flex-col gap-1">
          <Link to="/" onClick={() => setNavbarOpen(false)}
            className={`px-3 py-2.5 rounded-lg ${linkCls("/")}`}>Home</Link>
          <Link to="/about" onClick={() => setNavbarOpen(false)}
            className={`px-3 py-2.5 rounded-lg ${linkCls("/about")}`}>About</Link>
          {token && (
            <Link to="/dashboard" onClick={() => setNavbarOpen(false)}
              className={`px-3 py-2.5 rounded-lg ${linkCls("/dashboard")}`}>Dashboard</Link>
          )}
          <div className="pt-2 flex flex-col gap-2">
            {!token ? (
              <>
                <Link to="/login" onClick={() => setNavbarOpen(false)}>
                  <button className="btn-ghost w-full text-sm text-left">Sign in</button>
                </Link>
                <Link to="/register" onClick={() => setNavbarOpen(false)}>
                  <button className="btn-primary w-full text-sm">Get started</button>
                </Link>
              </>
            ) : (
              <button onClick={onLogOutHandler} className="btn-danger w-full text-sm">
                Log out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
