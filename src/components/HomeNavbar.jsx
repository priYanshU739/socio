import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function HomeNavbar({ links = [], shadow = false }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!open) return;
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  // Smooth scroll to #hash
  const scrollToHash = (hash) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72; // offset for navbar
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  };

  // Normalize target: treat "FAQ" or "/faq" as "#faq"
  const normalizeTarget = (link) => {
    const to = typeof link === "string" ? link : link?.to || "";
    const label = typeof link === "string" ? "" : (link?.label || "");
    const isFAQ =
      label.toLowerCase().includes("faq") || to.toLowerCase() === "/faq";
    if (isFAQ) return "#faq";
    return to;
  };

  // Unified navigation handler (accepts link object or string)
  const handleNav = async (link) => {
    const target = normalizeTarget(link);

    if (target.startsWith("#")) {
      if (location.pathname !== "/") {
        await navigate("/");
        setTimeout(() => scrollToHash(target), 0);
      } else {
        scrollToHash(target);
      }
    } else {
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
        {/* Logo → Home + scroll top */}
        <button
          onClick={() => handleNav("/")}
          className="flex items-center gap-2 font-extrabold tracking-wide cursor-pointer"
          aria-label="Go to top"
        >
          <span className="h-7 w-7 rounded-lg bg-indigo-400 shadow-[0_0_20px_rgba(34,211,238,.5)]" />
          <div className="flex">
            <span className="text-2xl text-white">Socio</span>
          {/* <span className="text-2xl block bg-linear-to-r from-yellow-500  via-red-500 to-purple-600 
               bg-clip-text text-transparent"
            >VR</span> */}
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-slate-300 font-semibold">
          {links.map((link) => (
            <button
              key={typeof link === "string" ? link : link.to}
              onClick={() => handleNav(link)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {typeof link === "string" ? link : link.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
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

        {/* Mobile dropdown (top-right) */}
        <div
          id="mobile-menu"
          ref={panelRef}
          className={`absolute md:hidden right-4 top-16 w-48 origin-top-right rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl transition-all duration-150
            ${open ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"}`}
        >
          <div className="py-2">
            {links.map((link) => (
              <button
                key={typeof link === "string" ? link : link.to}
                onClick={() => handleNav(link)}
                className="block cursor-pointer w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10"
              >
                {typeof link === "string" ? link : link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
