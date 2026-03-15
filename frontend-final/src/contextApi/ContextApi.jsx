import { createContext, useContext, useState, useEffect } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  // ── Auth token ──────────────────────────────────────────
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
    : null;
  const [token, setToken] = useState(getToken);

  // ── Dark mode ───────────────────────────────────────────
  const getInitialDark = () => {
    const stored = localStorage.getItem("DARK_MODE");
    if (stored !== null) return JSON.parse(stored);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };
  const [darkMode, setDarkMode] = useState(getInitialDark);

  // Apply / remove the "dark" class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("DARK_MODE", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const sendData = { token, setToken, darkMode, toggleDarkMode };

  return (
    <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>
  );
};

export const useStoreContext = () => useContext(ContextApi);
