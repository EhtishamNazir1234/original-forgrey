"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import { toast } from "@/stores/toast.store";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          router.push("/dashboard");
        } else {
          setCheckingAuth(false);
        }
      } catch (error) {
        console.error("Login session check failed:", error);
        setCheckingAuth(false);
      }
    }
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        toast.success("Welcome back! Signing in...");
        router.push("/dashboard");
      }
    } catch (err: any) {
      const errMsg = err.message || "An unexpected error occurred";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) setError(error.message);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <AuthFormWrapper
      title="Welcome back"
      subtitle={<p className="text-sm text-slate-500">Log in to your account</p>}
      error={error}
      loading={loading}
      onGoogleLogin={handleGoogleLogin}
      onSubmit={handleLogin}
      submitButtonText="Sign in"
      footer={
        <>
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-amber-500 hover:text-amber-600 transition-colors"
          >
            Sign up
          </Link>
        </>
      }
    >
      <div>
        <label className="block text-xs text-black uppercase mb-2">Email</label>
        <input
          type="email"
          required
          placeholder="Type here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-sm"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-xs text-black uppercase">Password</label>
        </div>
        <input
          type="password"
          required
          placeholder="Type here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-sm"
        />
        <div className="flex justify-end mt-2">
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-amber-500 hover:text-amber-600 transition-colors"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </AuthFormWrapper>
  );
}
