"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { signUp } from "@/lib/auth";

export function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Compute password strength score (0 to 4)
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "bg-white/10" };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[0-9]/.test(password) && /[a-zA-Z]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    switch (score) {
      case 1:
        return { score: 1, label: "Weak", color: "bg-red-500" };
      case 2:
        return { score: 2, label: "Fair", color: "bg-amber-500" };
      case 3:
        return { score: 3, label: "Good", color: "bg-yellow-400" };
      case 4:
        return { score: 4, label: "Strong", color: "bg-emerald-400" };
      default:
        return { score: 0, label: "Weak", color: "bg-red-500" };
    }
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms of Service & Privacy Policy.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = signUp(name, email);
      setIsLoading(false);

      if (res.success) {
        setSuccessMsg("Account created successfully! Welcome to the Gallery.");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        setError(res.error || "Failed to create account.");
      }
    }, 750);
  };

  const handleSocialSignUp = (provider: string) => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      const demoEmail = `patron.${provider.toLowerCase()}@artgallery.com`;
      signUp(`Art Patron (${provider})`, demoEmail);
      setIsLoading(false);
      setSuccessMsg(`Registered with ${provider}! Redirecting...`);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }, 600);
  };

  return (
    <div>
      {/* Alert Error / Success Messages */}
      {error && (
        <div className="mb-5 rounded-lg border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-300 animate-fade-in flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-red-400" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-5 rounded-lg border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-300 animate-fade-in flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Field */}
        <div>
          <label htmlFor="signup-name" className="block text-xs font-medium text-cream/80">
            Full Name
          </label>
          <div className="relative mt-1.5">
            <input
              id="signup-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Eleanor Vance"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-cream placeholder-muted/50 transition-colors focus:border-gold focus:bg-black/60 focus:outline-none"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted/60">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="signup-email" className="block text-xs font-medium text-cream/80">
            Email Address
          </label>
          <div className="relative mt-1.5">
            <input
              id="signup-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="curator@gallery.com"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-cream placeholder-muted/50 transition-colors focus:border-gold focus:bg-black/60 focus:outline-none"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted/60">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="signup-password" className="block text-xs font-medium text-cream/80">
            Password
          </label>
          <div className="relative mt-1.5">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 pr-10 text-sm text-cream placeholder-muted/50 transition-colors focus:border-gold focus:bg-black/60 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted/70 transition-colors hover:text-cream"
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2 animate-fade-in">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-muted">Password Strength:</span>
                <span className="font-semibold text-cream/90">{passwordStrength.label}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-full rounded-full transition-all duration-300 ${
                      step <= passwordStrength.score ? passwordStrength.color : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="signup-confirm-password" className="block text-xs font-medium text-cream/80">
            Confirm Password
          </label>
          <div className="relative mt-1.5">
            <input
              id="signup-confirm-password"
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-cream placeholder-muted/50 transition-colors focus:border-gold focus:bg-black/60 focus:outline-none"
            />
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-cream/70 select-none">
            <input
              type="checkbox"
              required
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-white/20 bg-black/50 text-gold focus:ring-gold/30 focus:ring-offset-0 accent-gold cursor-pointer"
            />
            <span>
              I agree to the{" "}
              <a href="#" onClick={(e) => e.preventDefault()} className="text-gold underline hover:text-gold-light">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" onClick={(e) => e.preventDefault()} className="text-gold underline hover:text-gold-light">
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold-btn py-3.5 px-4 font-body text-sm font-medium text-black transition-all hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50 cursor-pointer shadow-lg shadow-gold/10"
        >
          {isLoading ? (
            <>
              <svg className="h-4 w-4 animate-spin text-black" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creating Account...
            </>
          ) : (
            <>
              Join the Atelier
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <span className="relative bg-panel px-3 font-body text-[11px] uppercase tracking-wider text-muted">
          Or sign up with
        </span>
      </div>

      {/* Social Logins */}
      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => handleSocialSignUp("Google")}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/30 py-2.5 px-3 text-xs text-cream transition-colors hover:border-gold/30 hover:bg-white/5 cursor-pointer"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.8s.7 5.1 1.9 7.5l3.7-2.9c-.6-.8-1-1.7-1-2.6z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          Google
        </button>

        <button
          type="button"
          onClick={() => handleSocialSignUp("Apple")}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/30 py-2.5 px-3 text-xs text-cream transition-colors hover:border-gold/30 hover:bg-white/5 cursor-pointer"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.65-.79 1.1-1.89.98-2.99-.95.04-2.1.64-2.78 1.43-.61.71-1.14 1.83-.99 2.92 1.06.08 2.14-.56 2.79-1.36z" />
          </svg>
          Apple
        </button>

        <button
          type="button"
          onClick={() => handleSocialSignUp("GitHub")}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/30 py-2.5 px-3 text-xs text-cream transition-colors hover:border-gold/30 hover:bg-white/5 cursor-pointer"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </button>
      </div>

      {/* Switch link */}
      <div className="mt-8 text-center text-xs text-cream/70">
        Already have an account?{" "}
        <Link href="/signin" className="font-medium text-gold hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
