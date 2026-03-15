import React from "react";
import ShortenItem from "./ShortenItem";

const ShortenUrlList = ({ urlList }) => {
  if (!urlList || urlList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-dark-surface2
                        flex items-center justify-center text-2xl mb-4">
          🔗
        </div>
        <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-1">
          No short links yet
        </h3>
        <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs">
          Click &ldquo;Create Short URL&rdquo; to shorten your first link and
          start tracking clicks.
        </p>
      </div>
    );
  }

  return (
    <div>
      {urlList.map((item) => (
        <ShortenItem
          key={item.id}
          id={item.id}
          originalUrl={item.originalUrl}
          shortUrl={item.shortUrl}
          clickCount={item.clickCount}
          createdDate={item.createdDate}
          username={item.username}
        />
      ))}
    </div>
  );
};

export default ShortenUrlList;
