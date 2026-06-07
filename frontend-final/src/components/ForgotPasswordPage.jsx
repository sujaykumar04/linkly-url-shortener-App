import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";
import TextField from "./TextField";
import api from "../api/api";

// Step indicator
const StepIndicator = ({ current }) => (
  <div className="flex items-center justify-center gap-2 mb-8">
    {["Email", "OTP", "Reset"].map((label, i) => (
      <React.Fragment key={label}>
        <div className="flex flex-col items-center gap-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center
                        text-xs font-bold transition-all duration-300
                        ${i < current
                          ? "bg-primary-500 text-white"
                          : i === current
                          ? "bg-primary-500 text-white ring-4 ring-primary-200 dark:ring-primary-900/40"
                          : "bg-slate-200 dark:bg-dark-surface2 text-slate-400"
                        }`}
          >
            {i < current ? "✓" : i + 1}
          </div>
          <span className={`text-[10px] font-medium ${
            i === current
              ? "text-primary-500"
              : "text-slate-400 dark:text-slate-500"
          }`}>
            {label}
          </span>
        </div>
        {i < 2 && (
          <div className={`h-[2px] w-8 mb-4 rounded-full transition-all duration-300 ${
            i < current
              ? "bg-primary-500"
              : "bg-slate-200 dark:bg-dark-surface2"
          }`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0=email, 1=otp, 2=newpassword
  const [email, setEmail] = useState("");
  const [verifiedOtp, setVerifiedOtp] = useState("");
  const [loader, setLoader] = useState(false);

  // Step 0 — Email form
  const emailForm = useForm({
    defaultValues: { email: "" },
    mode: "onTouched",
  });

  // Step 1 — OTP form
  const otpForm = useForm({
    defaultValues: { otp: "" },
    mode: "onTouched",
  });

  // Step 2 — New password form
  const passwordForm = useForm({
    defaultValues: { newPassword: "", confirmPassword: "" },
    mode: "onTouched",
  });

  // Step 0 — Send OTP
  const sendOtpHandler = async (data) => {
    setLoader(true);
    try {
      await api.post("/api/auth/public/forgot-password", {
        email: data.email,
      });
      setEmail(data.email);
      toast.success("OTP sent! Check your email.");
      setStep(1);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Email not found.");
    } finally {
      setLoader(false);
    }
  };

  // Step 1 — Verify OTP
  const verifyOtpHandler = async (data) => {
    setLoader(true);
    try {
      await api.post("/api/auth/public/verify-otp", {
        email,
        otp: data.otp,
      });
      setVerifiedOtp(data.otp);
      toast.success("OTP verified!");
      setStep(2);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoader(false);
    }
  };

  // Step 2 — Reset password
  const resetPasswordHandler = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoader(true);
    try {
      await api.post("/api/auth/public/reset-password", {
        email,
        otp: verifiedOtp,
        newPassword: data.newPassword,
      });
      toast.success("Password reset successfully! Please sign in.");
      navigate("/login");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoader(false);
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    setLoader(true);
    try {
      await api.post("/api/auth/public/forgot-password", { email });
      toast.success("New OTP sent!");
      otpForm.reset();
    } catch (e) {
      toast.error("Failed to resend OTP.");
    } finally {
      setLoader(false);
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -30 },
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface-secondary dark:bg-dark-bg
                    flex items-center justify-center px-4 py-12
                    transition-colors duration-200">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-custom-gradient
                          flex items-center justify-center
                          text-white font-bold text-lg shadow-glow">
            L
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-1">
          Reset your password
        </h1>
        <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-6">
          {step === 0 && "Enter your email to receive an OTP"}
          {step === 1 && `OTP sent to ${email}`}
          {step === 2 && "Choose your new password"}
        </p>

        <StepIndicator current={step} />

        <div className="card p-6">
          <AnimatePresence mode="wait">

            {/* ── Step 0 — Email ── */}
            {step === 0 && (
              <motion.form
                key="step0"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
                onSubmit={emailForm.handleSubmit(sendOtpHandler)}
                className="flex flex-col gap-5"
              >
                <TextField
                  label="Email address"
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  errors={emailForm.formState.errors}
                  register={emailForm.register}
                  required
                  message="Email is required"
                />
                <button
                  type="submit"
                  disabled={loader}
                  className="btn-primary w-full"
                >
                  {loader ? "Sending OTP…" : "Send OTP →"}
                </button>
              </motion.form>
            )}

            {/* ── Step 1 — OTP ── */}
            {step === 1 && (
              <motion.form
                key="step1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
                onSubmit={otpForm.handleSubmit(verifyOtpHandler)}
                className="flex flex-col gap-5"
              >
                <div>
                  <TextField
                    label="Enter 6-digit OTP"
                    id="otp"
                    type="text"
                    placeholder="123456"
                    errors={otpForm.formState.errors}
                    register={otpForm.register}
                    required
                    message="OTP is required"
                  />
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                    Valid for 10 minutes.{" "}
                    <button
                      type="button"
                      onClick={resendOtp}
                      disabled={loader}
                      className="text-primary-500 hover:underline font-medium"
                    >
                      Resend OTP
                    </button>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="btn-secondary flex-1"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loader}
                    className="btn-primary flex-1"
                  >
                    {loader ? "Verifying…" : "Verify OTP →"}
                  </button>
                </div>
              </motion.form>
            )}

            {/* ── Step 2 — New Password ── */}
            {step === 2 && (
              <motion.form
                key="step2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
                onSubmit={passwordForm.handleSubmit(resetPasswordHandler)}
                className="flex flex-col gap-5"
              >
                <TextField
                  label="New password"
                  id="newPassword"
                  type="password"
                  placeholder="Min. 6 characters"
                  errors={passwordForm.formState.errors}
                  register={passwordForm.register}
                  required
                  message="Password is required"
                  min={6}
                />
                <TextField
                  label="Confirm new password"
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter new password"
                  errors={passwordForm.formState.errors}
                  register={passwordForm.register}
                  required
                  message="Please confirm your password"
                />
                <button
                  type="submit"
                  disabled={loader}
                  className="btn-primary w-full"
                >
                  {loader ? "Resetting…" : "Reset password →"}
                </button>
              </motion.form>
            )}

          </AnimatePresence>
        </div>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Remembered your password?{" "}
          <Link to="/login"
            className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;