import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextField from "./TextField";
import api from "../api/api";
import { useStoreContext } from "../contextApi/ContextApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setToken } = useStoreContext();
  const [loader, setLoader] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { username: "", password: "" },
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
    setLoader(true);
    try {
      const res = await api.post("/api/auth/public/login", {
        username: data.username,
        password: data.password,
      });
      const tok = res.data.token;
      setToken(tok);
      localStorage.setItem("JWT_TOKEN", JSON.stringify(tok));
      toast.success("Welcome back!");
      reset();
      navigate("/dashboard");
    } catch {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface-secondary dark:bg-dark-bg
                    flex items-center justify-center px-4 py-12
                    transition-colors duration-200">
      <div className="w-full max-w-sm">
        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-custom-gradient
                          flex items-center justify-center
                          text-white font-bold text-lg shadow-glow">
            L
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-8">
          Sign in to your dashboard
        </p>

        <div className="card p-6">
          <form onSubmit={handleSubmit(loginHandler)} className="flex flex-col gap-5">
            <TextField label="Username" id="username" type="text"
              placeholder="Your username"
              errors={errors} register={register}
              required message="Username is required" />
            <TextField label="Password" id="password" type="password"
              placeholder="Your password"
              errors={errors} register={register}
              required message="Password is required" />
            <button type="submit" disabled={loader} className="btn-primary w-full mt-1">
              {loader ? "Signing in…" : "Sign in →"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/register"
            className="font-semibold text-primary-600 dark:text-primary-400
                       hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
