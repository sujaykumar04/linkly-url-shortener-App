import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-48">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-slate-200 dark:border-dark-border
                        border-t-primary-500 rounded-full animate-spin" />
        <p className="text-xs text-slate-400 dark:text-slate-500">Loading…</p>
      </div>
    </div>
  );
};

export default Loader;
