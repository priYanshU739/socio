import { useMemo, useState } from "react";
import DashNavbar from "../components/DashNavbar.jsx";
 import { useAuth } from "../auth/AuthContext";
 import axios from "axios";
// Instagram‑style profile page (Tailwind only)
// Drop as: src/pages/Profile.jsx (or similar) and route to it.
// No external libs required. Replace demo data with your API data.

export default function Profile({ isOwner = false }) {
  const [tab, setTab] = useState("posts"); // posts | reels | tagged
  const { logout } = useAuth();

    

  // --- Demo data (swap with real API) ---
  const user = useMemo(
    () => ({
      username: "socia.vr",
      name: "SociaVR Creator",
      bio: "Building a VR-first social world. Rooms • Clips • Hangouts",
      link: "https://socia.vr",
      avatarUrl: "",
      counts: { posts: 54, followers: 12840, following: 312 },
      highlights: [
        { id: 1, label: "Rooms", emoji: "🏠" },
        { id: 2, label: "Clips", emoji: "🎬" },
        { id: 3, label: "Events", emoji: "🎟️" },
        { id: 4, label: "DevLog", emoji: "🛠️" },
      ],
    }),
    []
  );

  const posts = useMemo(
    () =>
      new Array(12)
        .fill(0)
        .map((_, i) => ({ id: i + 1, type: i % 4 === 0 ? "reel" : "image" })),
    []
  );

  // --- Helpers ---
  const formatCount = (n) => {
    if (n >= 1_000_000)
      return (n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0) + "m";
    if (n >= 1_000) return (n / 1_000).toFixed(n % 1_000 ? 1 : 0) + "k";
    return String(n);
  };

  
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100">
      {/* Top bar */}
      {/* <div className="sticky top-0 z-40 border-b border-white/5 bg-black/30 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold">{user.username}</span>
            <span className="text-xs text-slate-400 hidden sm:inline">VR Profile</span>
          </div>
          <div className="flex items-center gap-2">
            {isOwner ? (
              <>
                <button className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-sm">Create</button>
                <button className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-sm">Edit profile</button>
              </>
            ) : (
              <>
                <FollowButton />
                <button className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-sm">Message</button>
              </>
            )}
          </div>
        </div>
      </div> */}

      <DashNavbar
        shadow={true}
        links={[
          { to: "/friendlist", label: "Friends" },
          { to: "/profile", label: "Profile" },
          { to: "/setting", label: "Settings" },
          { label: "Log Out", onClick: logout },
        ]}
      />

      {/* Header section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-[96px_1fr] sm:grid-cols-[160px_1fr] gap-6">
          {/* Avatar */}
          <div className="h-24 w-24 sm:h-40 sm:w-40 rounded-full bg-gradient-to-br from-indigo-500/30 to-cyan-400/30 p-[3px]">
            <div className="h-full w-full rounded-full bg-white/5 border border-white/10 grid place-items-center text-3xl">
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span>👤</span>
              )}
            </div>
          </div>

          {/* Meta */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-bold truncate">
                {user.username}
              </h1>
              {!isOwner && <FollowButton className="sm:hidden" />}
            </div>

            <div className=" items-center gap-6 grid-cols-1 lg:flex sm:flex md:flex sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 mt-3 text-sm">
              <Stat label="posts" value={formatCount(user.counts.posts)} />
              <Stat
                label="followers"
                value={formatCount(user.counts.followers)}
              />
              <Stat
                label="following"
                value={formatCount(user.counts.following)}
              />
            </div>

            <div className="mt-3">
              <p className="font-semibold">{user.name}</p>
              <p className="text-slate-300 text-sm leading-snug mt-1">
                {user.bio}
              </p>
              {user.link && (
                <a
                  href={user.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-indigo-300 hover:text-indigo-200 mt-1 inline-block"
                >
                  {user.link.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {user.highlights.map((h) => (
            <button
              key={h.id}
              className="shrink-0 flex flex-col items-center gap-2"
            >
              <span className="h-16 w-16 rounded-full bg-white/5 border border-white/10 grid place-items-center text-xl">
                {h.emoji}
              </span>
              <span className="text-xs text-slate-300">{h.label}</span>
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-6 border-t border-white/10">
          <div className="flex items-center justify-center gap-8 text-xs uppercase tracking-wide text-slate-400">
            <Tab
              label="Posts"
              active={tab === "posts"}
              onClick={() => setTab("posts")}
              icon={<GridIcon />}
            />
            <Tab
              label="Reels"
              active={tab === "reels"}
              onClick={() => setTab("reels")}
              icon={<ReelIcon />}
            />
            <Tab
              label="Tagged"
              active={tab === "tagged"}
              onClick={() => setTab("tagged")}
              icon={<TaggedIcon />}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="mt-4 grid grid-cols-3 gap-1 sm:gap-4">
          {posts
            .filter((p) =>
              tab === "posts"
                ? true
                : tab === "reels"
                ? p.type === "reel"
                : p.type !== "reel"
            )
            .map((p) => (
              <PostTile key={p.id} type={p.type} />
            ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold">{value}</span>
      <span className="text-slate-400">{label}</span>
    </div>
  );
}

function FollowButton({ className = "" }) {
  const [following, setFollowing] = useState(false);
  return (
    <button
      onClick={() => setFollowing((v) => !v)}
      className={`px-3 py-1.5 rounded-md text-sm font-semibold ${
        following
          ? "bg-white/5 hover:bg-white/10 border border-white/10"
          : "bg-indigo-500 hover:bg-indigo-400"
      } ${className}`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}

function Tab({ label, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 py-3 ${
        active ? "text-white border-t-2 border-white" : "hover:text-white/80"
      }`}
      aria-pressed={active}
    >
      <span className="h-4 w-4 grid place-items-center">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function PostTile({ type }) {
  return (
    <div className="relative aspect-square bg-white/5 group overflow-hidden">
      {/* placeholder media */}
      <div className="absolute inset-0 bg-[radial-gradient(50%_80%_at_70%_0%,rgba(99,102,241,.25),transparent)]" />
      {type === "reel" && (
        <span className="absolute top-2 right-2 text-xs px-1.5 py-0.5 rounded bg-black/60">
          ▶︎ Reel
        </span>
      )}
      <button className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/40 grid place-items-center text-sm">
        Open
      </button>
    </div>
  );
}

// Minimal inline icons
function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M10 3H3v7h7V3zm11 0h-7v7h7V3zM10 14H3v7h7v-7zm11 0h-7v7h7v-7z" />
    </svg>
  );
}
function ReelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M4 5h6l2 4h8v10H4V5zm2 2v10h12V11H11.2L9.2 7H6z" />
    </svg>
  );
}
function TaggedIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M21 10V3h-7L3 14l7 7 11-11zM7 7h3v3H7V7z" />
    </svg>
  );
}
