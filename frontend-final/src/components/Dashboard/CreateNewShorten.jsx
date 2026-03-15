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

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { originalUrl: "" },
    mode: "onTouched",
  });

  const createShortUrlHandler = async (data) => {
    setLoading(true);
    try {
      const res = await api.post(
        "/api/urls/shorten",
        { originalUrl: data.originalUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const shortUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${res.data.shortUrl}`;
      navigator.clipboard.writeText(shortUrl).catch(() => {});
      toast.success("Short URL created & copied to clipboard!");
      reset();
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
      {/* Close */}
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
        Paste your long URL below to generate a short link.
      </p>

      <form onSubmit={handleSubmit(createShortUrlHandler)} className="flex flex-col gap-4">
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
