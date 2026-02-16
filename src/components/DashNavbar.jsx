import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DashNavbar({ links = [], shadow = false }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [location.pathname, location.hash]);
  const notification = 101;
  useEffect(() => {
    const onDocClick = (e) => {
      if (!open) return;
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      )
        setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const scrollToHash = (hash) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  };

  const normalizeTarget = (link = {}) => {
    const to = link.to || "";
    const label = (link.label || "").toLowerCase();
    if (label.includes("faq") || to.toLowerCase() === "/faq") return "#faq";
    return to;
  };

  const handleAction = async (link = {}) => {
    // If a custom handler exists (e.g., logout), run it and stop
    if (typeof link.onClick === "function") {
      await Promise.resolve(link.onClick());
      setOpen(false);
      return;
    }

    const target = normalizeTarget(link);

    if (target?.startsWith("#")) {
      if (location.pathname !== "/") {
        await navigate("/");
        setTimeout(() => scrollToHash(target), 0);
      } else {
        scrollToHash(target);
      }
    } else if (target) {
      navigate(target);
      if (target === "/") window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setOpen(false);
  };

  return (
    <div
      className={`sticky top-0 z-50 border-b border-white/5 backdrop-blur-md bg-black/30 ${
        shadow ? "shadow-[0_10px_30px_rgba(0,0,0,.35)]" : ""
      }`}
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleAction({ to: "/dashboard" })}
          className="flex items-center gap-2 font-extrabold tracking-wide cursor-pointer"
          aria-label="Go to top"
        >
          <span className="h-7 w-7 rounded-lg bg-indigo-400 shadow-[0_0_20px_rgba(34,211,238,.5)]" />
          <div className="flex">
            <span className="text-2xl text-white">Socia</span>
            <span
              className="text-2xl block bg-linear-to-r from-yellow-500  via-red-500 to-purple-600 
               bg-clip-text text-transparent"
            >
              VR
            </span>
          </div>
        </button>

        {/* Desktop */}
        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-slate-300 font-semibold">
          {links.map((link, idx) => (
            <div
              key={`${link.label || link.to || "item"}-${idx}`}
              className="relative"
            >
              <button
                onClick={() => handleAction(link)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </button>

              {/* 🔔 Notification badge only for "Friends" */}
              {link.label === "Friends" && (
                <div className="absolute -top-3 -right-4 px-1.5 bg-indigo-700 rounded-full text-center text-white text-xs font-bold">
                  {notification > 100 ? "100+" : notification}
                  <div
                    className={`absolute top-0 left-0 rounded-full -z-10 ${
                      notification === 0 ? "" : "animate-ping"
                    } bg-teal-200 w-full h-full`}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          ref={btnRef}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Open menu"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Mobile dropdown */}
        <div
          id="mobile-menu"
          ref={panelRef}
          className={`absolute md:hidden right-4 top-16 w-48 origin-top-right rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl transition-all duration-150 ${
            open
              ? "opacity-100 scale-100"
              : "pointer-events-none opacity-0 scale-95"
          }`}
        >
          <div className="py-2">
            {links.map((link, idx) => (
              <button
                key={`${link.label || link.to || "item"}-m-${idx}`}
                onClick={() => handleAction(link)}
                className="block w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10"
              >
                <span className="inline-flex items-center">
                  {link.label}

                  {link.label === "Friends" && (
                    <span className="ml-2 relative inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-indigo-700 text-white text-xs font-bold">
                      {/* ping background */}
                      <span
                        className={`absolute inset-0 rounded-full ${
                          notification === 0 ? "" : "animate-ping"
                        } bg-teal-200 opacity-60`}
                      />
                      {/* number on top */}
                      <span className="relative">
                        {notification > 100 ? "100+" : notification}
                      </span>
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
