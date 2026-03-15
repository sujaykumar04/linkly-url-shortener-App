import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center
                    min-h-[calc(100vh-64px)]
                    bg-surface-secondary dark:bg-dark-bg px-6">
      <div className="text-5xl mb-6 select-none">⚠️</div>
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
        Something went wrong
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-8 max-w-sm">
        {message ?? "An unexpected error has occurred."}
      </p>
      <button
        onClick={() => navigate("/")}
        className="btn-primary text-sm"
      >
        ← Go back home
      </button>
    </div>
  );
};

export default ErrorPage;
