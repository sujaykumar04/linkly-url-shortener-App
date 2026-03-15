import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextField from "./TextField";
import api from "../api/api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { username: "", email: "", password: "" },
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      await api.post("/api/auth/public/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      toast.success("Account created! Please sign in.");
      reset();
      navigate("/login");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Registration failed. Try again.");
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
          Create an account
        </h1>
        <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-8">
          Start shortening and tracking your links
        </p>

        <div className="card p-6">
          <form onSubmit={handleSubmit(registerHandler)} className="flex flex-col gap-5">
            <TextField label="Username" id="username" type="text"
              placeholder="Choose a username"
              errors={errors} register={register}
              required message="Username is required" />
            <TextField label="Email" id="email" type="email"
              placeholder="you@email.com"
              errors={errors} register={register}
              required message="Email is required" />
            <TextField label="Password" id="password" type="password"
              placeholder="Min. 6 characters"
              errors={errors} register={register}
              required message="Password is required" min={6} />
            <button type="submit" disabled={loader} className="btn-primary w-full mt-1">
              {loader ? "Creating account…" : "Create account →"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Already have an account?{" "}
          <Link to="/login"
            className="font-semibold text-primary-600 dark:text-primary-400
                       hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
