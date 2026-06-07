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
    `text-sm font-medium transition-all duration-150 rounded-lg px-3 py-2 ${
      path === href
        ? "text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
        : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/70 dark:hover:bg-primary-900/20"
    }`;

  return (
    <nav
      className="sticky top-0 z-50 h-16 transition-colors duration-200"
      style={{
        background: darkMode
          ? "rgba(15, 15, 19, 0.35)"
          : "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(32px) saturate(200%) brightness(110%)",
        WebkitBackdropFilter: "blur(32px) saturate(200%) brightness(110%)",
        borderBottom: darkMode
          ? "1px solid rgba(139, 92, 246, 0.2)"
          : "1px solid rgba(139, 92, 246, 0.15)",
        boxShadow: darkMode
          ? "0 4px 60px rgba(99, 102, 241, 0.12), 0 1px 0 rgba(139,92,246,0.08), inset 0 1px 0 rgba(255,255,255,0.04)"
          : "0 4px 60px rgba(99, 102, 241, 0.08), 0 1px 0 rgba(139,92,246,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      <div className="lg:px-14 sm:px-8 px-4 h-full flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          {/* 3D Logo mark */}
          <div className="relative w-8 h-8">
            {/* Bottom shadow layer */}
            <span
              className="absolute inset-0 rounded-xl translate-y-[3px] translate-x-[1px] opacity-40"
              style={{
                background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
                filter: "blur(3px)",
              }}
            />
            {/* Middle depth layer */}
            <span
              className="absolute inset-0 rounded-xl translate-y-[1.5px]"
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              }}
            />
            {/* Top face */}
            <span
              className="absolute inset-0 rounded-xl flex items-center justify-center
                         text-white font-black text-sm
                         group-hover:-translate-y-[1px] transition-transform duration-200"
              style={{
                background: "linear-gradient(135deg, #818cf8 0%, #6366f1 40%, #8b5cf6 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.15), inset 1px 0 0 rgba(255,255,255,0.15)",
              }}
            >
              L
            </span>
          </div>

          <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight
                           group-hover:text-primary-600 dark:group-hover:text-primary-400
                           transition-colors duration-150">
            Linkly
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-0.5">
          <Link to="/" className={linkCls("/")}>Home</Link>
          <Link to="/about" className={linkCls("/about")}>About</Link>
          {token && (
            <Link to="/dashboard" className={linkCls("/dashboard")}>
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
                       hover:bg-primary-50/70 dark:hover:bg-primary-900/20
                       hover:text-primary-600 dark:hover:text-primary-400
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
                <button
                  className="text-sm font-medium px-3 py-2 rounded-lg
                             text-slate-600 dark:text-slate-300
                             hover:text-primary-600 dark:hover:text-primary-400
                             hover:bg-primary-50/70 dark:hover:bg-primary-900/20
                             transition-all duration-150"
                >
                  Sign in
                </button>
              </Link>
              <Link to="/register">
                <button
                  className="text-sm font-semibold px-4 py-2 rounded-lg
                             text-white transition-all duration-200
                             hover:-translate-y-[1px]"
                  style={{
                    background: "linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #8b5cf6 100%)",
                    boxShadow:
                      "0 2px 0 #3730a3, 0 4px 12px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 0 #3730a3, 0 8px 20px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 2px 0 #3730a3, 0 4px 12px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.25)";
                  }}
                >
                  Get started
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={onLogOutHandler}
              className="text-sm font-semibold px-4 py-2 rounded-lg
                         text-white bg-red-500 hover:bg-red-600
                         transition-all duration-150"
              style={{
                boxShadow: "0 2px 0 #b91c1c, 0 4px 12px rgba(239,68,68,0.3)",
              }}
            >
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
                       hover:bg-primary-50/70 dark:hover:bg-primary-900/20
                       transition-all duration-150"
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
                       hover:bg-primary-50/70 dark:hover:bg-primary-900/20
                       transition-all duration-150"
          >
            {navbarOpen
              ? <RxCross2 className="text-xl" />
              : <IoIosMenu className="text-xl" />
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-200
                     ${navbarOpen ? "max-h-72 py-3" : "max-h-0"}`}
        style={{
          background: darkMode
            ? "rgba(15, 15, 19, 0.5)"
            : "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
          borderBottom: darkMode
            ? "1px solid rgba(139, 92, 246, 0.15)"
            : "1px solid rgba(139, 92, 246, 0.1)",
        }}
      >
        <div className="px-4 flex flex-col gap-1">
          <Link to="/" onClick={() => setNavbarOpen(false)} className={linkCls("/")}>
            Home
          </Link>
          <Link to="/about" onClick={() => setNavbarOpen(false)} className={linkCls("/about")}>
            About
          </Link>
          {token && (
            <Link to="/dashboard" onClick={() => setNavbarOpen(false)} className={linkCls("/dashboard")}>
              Dashboard
            </Link>
          )}
          <div className="pt-2 mt-1 flex flex-col gap-2
                          border-t border-primary-100/50 dark:border-primary-900/20">
            {!token ? (
              <>
                <Link to="/login" onClick={() => setNavbarOpen(false)}>
                  <button
                    className="w-full text-sm font-medium px-3 py-2.5 rounded-lg text-left
                               text-slate-600 dark:text-slate-300
                               hover:text-primary-600 dark:hover:text-primary-400
                               hover:bg-primary-50/70 dark:hover:bg-primary-900/20
                               transition-all duration-150"
                  >
                    Sign in
                  </button>
                </Link>
                <Link to="/register" onClick={() => setNavbarOpen(false)}>
                  <button
                    className="w-full text-sm font-semibold px-3 py-2.5 rounded-lg
                               text-white"
                    style={{
                      background: "linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #8b5cf6 100%)",
                      boxShadow: "0 2px 0 #3730a3, 0 4px 12px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
                    }}
                  >
                    Get started
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={onLogOutHandler}
                className="w-full text-sm font-semibold px-3 py-2.5 rounded-lg text-white"
                style={{
                  background: "#ef4444",
                  boxShadow: "0 2px 0 #b91c1c, 0 4px 12px rgba(239,68,68,0.3)",
                }}
              >
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