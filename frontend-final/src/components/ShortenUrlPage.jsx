import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ShortenUrlPage = () => {
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/${url}`;
    }
  }, [url]);

  return (
    <div className="min-h-screen bg-surface-secondary dark:bg-dark-bg
                    flex flex-col items-center justify-center gap-3
                    transition-colors duration-200">
      <div className="w-8 h-8 border-2 border-slate-200 dark:border-dark-border
                      border-t-primary-500 rounded-full animate-spin" />
      <p className="text-sm text-slate-400 dark:text-slate-500">Redirecting…</p>
    </div>
  );
};

export default ShortenUrlPage;
