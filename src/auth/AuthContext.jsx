// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hydrate user on app load
  useEffect(() => {
    let alive = true;

    api
      .get("/api/auth/me")
      .then((res) => {
        if (!alive) return;

        const raw = res.data.user || {};
        // ✅ Normalize so both /auth/google and /auth/me produce user.id
        const normalizedUser = { ...raw, id: raw.id || raw._id };
        setUser(normalizedUser);
      })
      .catch(() => {
        if (alive) setUser(null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      console.log("logged out");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthCtx.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
