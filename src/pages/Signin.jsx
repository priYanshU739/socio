import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../lib/api";

export default function SignIn() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAuth(); // access user from context

  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  const onGoogleSuccess = async (response) => {
    try {
      setError("");
      setLoading(true);

      const { credential } = response || {};
      if (!credential) throw new Error("No credential received from Google");

      // Send to backend to create/fetch user — backend must return _id
      const authRes = await api.post("/api/auth/google", { credential });

      const user = authRes.data?.user;
      if (!user?._id) {
        console.error("Auth response missing _id:", authRes.data);
        throw new Error("Login did not return a valid user id");
      }

      setUser(user); // store user with _id

      // Call /api/preference/check with a valid ObjectId
      const { data: check } = await api.get("/api/preference/check", {
        params: { userId: user._id },
      });

      // Navigate based on result
      navigate(check?.isFilled ? "/dashboard" : "/preference");
    } catch (e) {
      console.error("Google sign-in error:", e);
      // helpful debug:
      console.log("Server said:", e.response?.status, e.response?.data);
      setError("Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onGoogleError = () =>
    setError("Google sign-in was cancelled or failed.");

  // ✅ Show a quick loading spinner while redirecting
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-slate-200">
        Redirecting to dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl text-center">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Sign in to <span className="text-indigo-400">SociaVR</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Continue with Google to access your dashboard.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <GoogleLogin onSuccess={onGoogleSuccess} onError={onGoogleError} />
        </div>

        {loading && (
          <div className="mt-4 text-sm text-slate-400">Signing you in…</div>
        )}
        {error && <div className="mt-4 text-sm text-red-400">{error}</div>}

        <div className="mt-8 text-xs text-slate-400">
          By continuing, you agree to our{" "}
          <Link to="/terms" className="underline hover:text-slate-200">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline hover:text-slate-200">
            Privacy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
