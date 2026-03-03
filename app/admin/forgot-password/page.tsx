"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import api from "@/lib/api";
import Swal from "sweetalert2";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post("/auth/forgot-password", { email });

      Swal.fire({
        title: "Check your email",
        text: "If an account exists for that email, we have sent a password reset link.",
        icon: "success",
        confirmButtonColor: "#01172C",
      });

      router.push("/admin/login");
    } catch (error: any) {
      console.error("Forgot Password Error:", error);
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#01172C",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f6f0] dark:bg-[#01172c] p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">
            Forgot Password
          </h1>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-8">
            Enter your email and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="admin@aksaracakra.id"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        </div>

        <div className="px-8 py-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 text-center">
          <button
            onClick={() => router.push("/admin/login")}
            className="text-xs font-bold text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-1 mx-auto"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}
