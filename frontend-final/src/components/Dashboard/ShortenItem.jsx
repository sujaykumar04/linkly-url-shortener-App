import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoCopyOutline, IoCheckmarkDone } from "react-icons/io5";
import { MdAnalytics } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { TbClick } from "react-icons/tb";
import dayjs from "dayjs";
import api from "../../api/api";
import { useStoreContext } from "../../contextApi/ContextApi";
import Graph from "./Graph";
import Loader from "../Loader";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const navigate   = useNavigate();
  const { token }  = useStoreContext();

  const [isCopied,       setIsCopied]       = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [selectedUrl,    setSelectedUrl]    = useState(null);
  const [analyticsData,  setAnalyticsData]  = useState([]);
  const [loader,         setLoader]         = useState(false);

  const frontendUrl = import.meta.env.VITE_REACT_FRONT_END_URL || "http://localhost:5173";
  const fullShortUrl = `${frontendUrl}/s/${shortUrl}`;
  const displayHost  = frontendUrl.replace(/^https?:\/\//, "");

  // Fetch per-URL analytics when selectedUrl is set
  useEffect(() => {
    if (!selectedUrl) return;
    const fetch = async () => {
      setLoader(true);
      try {
        const res = await api.get(
          `/api/urls/analytics/${selectedUrl}?startDate=2024-01-01T00:00:00&endDate=2026-12-31T23:59:59`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAnalyticsData(res.data || []);
      } catch {
        navigate("/error");
      } finally {
        setLoader(false);
      }
    };
    fetch();
  }, [selectedUrl]);

  const toggleAnalytics = () => {
    if (!analyticToggle) setSelectedUrl(shortUrl);
    setAnalyticToggle((p) => !p);
  };

  return (
    <div className="card p-5 mb-3 transition-all duration-200
                    hover:border-primary-300 dark:hover:border-primary-700">
      {/* ── Top row ── */}
      <div className="flex sm:flex-row flex-col sm:items-start justify-between gap-3">
        {/* URLs */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <a
              href={fullShortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono font-semibold
                         text-primary-600 dark:text-primary-400
                         hover:underline truncate"
            >
              {displayHost}/s/{shortUrl}
            </a>
            <span className="text-slate-300 dark:text-dark-border text-xs">↗</span>
          </div>
          <p
            className="text-xs text-slate-400 dark:text-slate-500 truncate"
            title={originalUrl}
          >
            {originalUrl}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <CopyToClipboard text={fullShortUrl} onCopy={() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          }}>
            <button
              className={`flex items-center gap-1.5 text-xs font-medium
                          px-3 py-1.5 rounded-lg border transition-all duration-150
                          ${isCopied
                            ? "border-emerald-400 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                            : "border-surface-border dark:border-dark-border text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400"
                          }`}
            >
              {isCopied
                ? <><IoCheckmarkDone className="text-sm" /> Copied</>
                : <><IoCopyOutline className="text-sm" /> Copy</>
              }
            </button>
          </CopyToClipboard>

          <button
            onClick={toggleAnalytics}
            className={`flex items-center gap-1.5 text-xs font-medium
                        px-3 py-1.5 rounded-lg border transition-all duration-150
                        ${analyticToggle
                          ? "border-primary-400 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                          : "border-surface-border dark:border-dark-border text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400"
                        }`}
          >
            <MdAnalytics className="text-sm" />
            Analytics
          </button>
        </div>
      </div>

      {/* ── Meta row ── */}
      <div className="flex items-center gap-4 mt-3 flex-wrap">
        <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <TbClick className="text-primary-500" />
          <span className={`font-semibold ${clickCount > 0 ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
            {clickCount}
          </span>
          <span>{clickCount === 1 ? "click" : "clicks"}</span>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <FaCalendarAlt className="text-primary-500" />
          <span>{createdDate ? dayjs(createdDate).format("MMM D, YYYY") : "—"}</span>
        </div>

        {clickCount > 0 && (
          <span className="badge badge-success">Active</span>
        )}
      </div>

      {/* ── Analytics expand ── */}
      {analyticToggle && (
        <div className="mt-4 pt-4 border-t border-surface-border dark:border-dark-border">
          <p className="section-title mb-3">Click analytics</p>
          {loader ? (
            <Loader />
          ) : analyticsData.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm text-slate-400 dark:text-slate-500">
                No data yet for this link.
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Share it to start tracking clicks.
              </p>
            </div>
          ) : (
            <div className="h-44">
              <Graph graphData={analyticsData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShortenItem;
