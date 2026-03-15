import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useFetchTotalClicks, useFetchMyShortUrls } from "../../hooks/useQuery";
import { dummyData } from "../../dummyData/data";
import Graph from "./Graph";
import Loader from "../Loader";
import ShortenUrlList from "./ShortenUrlList";
import ShortenPopUp from "./ShortenPopUp";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  const [shortenPopup, setShortenPopup] = useState(false);

  const onError = () => navigate("/error");

  const {
    isLoading: isLoadingClicks,
    data: totalClicks,
  } = useFetchTotalClicks(token, onError);

  const {
    isLoading: isLoadingUrls,
    data: myShortUrls,
    refetch: refetchUrls,
  } = useFetchMyShortUrls(token, onError);

  // Summary counts
  const totalCount = myShortUrls?.length ?? 0;
  const totalClickSum = myShortUrls?.reduce((s, u) => s + (u.clickCount || 0), 0) ?? 0;
  const avgClicks = totalCount > 0 ? (totalClickSum / totalCount).toFixed(1) : "—";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface-secondary dark:bg-dark-bg
                    transition-colors duration-200 lg:px-14 sm:px-8 px-4 py-8">

      {/* ── Header ─────────────────────────────────── */}
      <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage and track all your shortened links
          </p>
        </div>
        <button
          onClick={() => setShortenPopup(true)}
          className="btn-primary self-start sm:self-auto"
        >
          + Create Short URL
        </button>
      </div>

      {/* ── Stat cards ─────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total links",       value: isLoadingUrls ? "…" : totalCount,      color: "text-primary-500" },
          { label: "Total clicks",      value: isLoadingUrls ? "…" : totalClickSum,   color: "text-emerald-500" },
          { label: "Avg clicks / link", value: isLoadingUrls ? "…" : avgClicks,       color: "text-amber-500"   },
        ].map(({ label, value, color }) => (
          <div key={label}
            className="card p-4 sm:p-5 flex flex-col gap-1">
            <p className="section-title">{label}</p>
            <p className={`text-2xl sm:text-3xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* ── Analytics chart ────────────────────────── */}
      <div className="card p-5 sm:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800 dark:text-white text-sm">
            Total clicks overview
          </h2>
          <span className="badge badge-muted">2024 – 2026</span>
        </div>

        <div className="h-56 relative">
          {isLoadingClicks ? (
            <Loader />
          ) : totalClicks && totalClicks.length > 0 ? (
            <Graph graphData={totalClicks} />
          ) : (
            <div className="h-full relative">
              {/* faded placeholder graph */}
              <div className="w-full h-full opacity-[0.08] pointer-events-none">
                <Graph graphData={dummyData} />
              </div>
              {/* overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  No click data yet
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Share your links to start seeing analytics here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── URL list ───────────────────────────────── */}
      <div className="card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-slate-800 dark:text-white text-sm">
              My short links
            </h2>
            {totalCount > 0 && (
              <span className="badge badge-muted">{totalCount}</span>
            )}
          </div>
        </div>

        {isLoadingUrls ? <Loader /> : <ShortenUrlList urlList={myShortUrls} />}
      </div>

      {/* ── Create modal ───────────────────────────── */}
      <ShortenPopUp
        open={shortenPopup}
        setOpen={setShortenPopup}
        refetch={refetchUrls}
      />
    </div>
  );
};

export default DashboardLayout;
