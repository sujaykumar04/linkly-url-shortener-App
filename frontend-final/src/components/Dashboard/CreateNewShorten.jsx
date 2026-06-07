import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import TextField from "../TextField";
import api from "../../api/api";
import { useStoreContext } from "../../contextApi/ContextApi";

const CreateNewShorten = ({ setOpen, refetch }) => {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);
  const [slugType, setSlugType] = useState("auto"); // "auto" or "custom"

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { originalUrl: "", customName: "" },
    mode: "onTouched",
  });

  const customName = watch("customName");

  // Live preview of what the short URL will look like
  const frontendUrl = (import.meta.env.VITE_REACT_FRONT_END_URL || "http://localhost:5173")
    .replace(/^https?:\/\//, "");

  const preview =
    slugType === "custom" && customName?.trim()
      ? `${frontendUrl}/s/4z2_${customName.trim()}`
      : `${frontendUrl}/s/gH3xQpAb`;

  const createShortUrlHandler = async (data) => {
    setLoading(true);
    try {
      const payload = { originalUrl: data.originalUrl };

      // Only send customName if custom mode selected
      if (slugType === "custom" && data.customName?.trim()) {
        payload.customName = data.customName.trim();
      }

      const res = await api.post("/api/urls/shorten", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const shortUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${res.data.shortUrl}`;
      navigator.clipboard.writeText(shortUrl).catch(() => {});
      toast.success("Short URL created & copied to clipboard!");
      reset();
      setSlugType("auto");
      await refetch();
      setOpen(false);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to create short URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 w-full relative
                    shadow-xl dark:shadow-none
                    border border-surface-border dark:border-dark-border">

      {/* Close button */}
      {!loading && (
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                     rounded-lg text-slate-400 hover:text-slate-700
                     dark:hover:text-slate-200
                     hover:bg-slate-100 dark:hover:bg-dark-surface2
                     transition-all duration-150"
        >
          <MdClose className="text-lg" />
        </button>
      )}

      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
        Create short URL
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
        Paste your long URL and choose your link style.
      </p>

      <form onSubmit={handleSubmit(createShortUrlHandler)} className="flex flex-col gap-4">

        {/* Long URL input */}
        <TextField
          label="Long URL"
          id="originalUrl"
          type="url"
          placeholder="https://example.com/very-long-url"
          errors={errors}
          register={register}
          required
          message="URL is required"
        />

        {/* Link type toggle */}
        <div>
          <p className="label mb-2">Link type</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSlugType("auto")}
              className={`flex flex-col items-start px-4 py-3 rounded-xl border
                          text-left transition-all duration-150
                          ${slugType === "auto"
                            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                            : "border-surface-border dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-700"
                          }`}
            >
              <span className={`text-sm font-semibold ${
                slugType === "auto"
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-slate-700 dark:text-slate-200"
              }`}>
                ⚡ Auto
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-mono">
                e.g. /gH3xQpAb
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSlugType("custom")}
              className={`flex flex-col items-start px-4 py-3 rounded-xl border
                          text-left transition-all duration-150
                          ${slugType === "custom"
                            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                            : "border-surface-border dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-700"
                          }`}
            >
              <span className={`text-sm font-semibold ${
                slugType === "custom"
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-slate-700 dark:text-slate-200"
              }`}>
                ✏️ Custom
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-mono">
                e.g. /4z2_myname
              </span>
            </button>
          </div>
        </div>

        {/* Custom name input — only shown in custom mode */}
        {slugType === "custom" && (
          <div>
            <TextField
              label="Custom name"
              id="customName"
              type="text"
              placeholder="e.g. myportfolio"
              errors={errors}
              register={register}
              required={slugType === "custom"}
              message="Custom name is required"
            />
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">
              Letters, numbers, hyphens only. 2–30 characters.
            </p>
          </div>
        )}

        {/* Live preview */}
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl
                        bg-surface-secondary dark:bg-dark-surface2
                        border border-surface-border dark:border-dark-border">
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500
                           uppercase tracking-widest flex-shrink-0">
            Preview
          </span>
          <span className="text-xs font-mono text-primary-600 dark:text-primary-400 truncate">
            {preview}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? "Creating…" : "Create & copy link"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewShorten;