import { useAuth } from "../auth/AuthContext";
import DashNavbar from "../components/DashNavBar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#07070b] text-slate-100 relative overflow-hidden">
      {/* Background gradient flares */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 h-80 w-80 bg-gradient-to-br from-cyan-400/20 to-indigo-600/10 blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 h-80 w-80 bg-gradient-to-tr from-emerald-400/15 to-sky-500/20 blur-3xl opacity-30" />
      </div>

      {/* Navbar */}
      <DashNavbar
        shadow={true}
        links={[
          { to: "/friendlist", label: "Friends" },
          { to: "/messages", label: "Messages" },
          { to: "/profile", label: "Profile" },
          { to: "/setting", label: "Settings" },
          { label: "Log Out", onClick: logout },
        ]}
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Welcome Section */}
        <section className="text-center sm:text-left mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight">
            Welcome{user?.name ? ", " : ""} {user?.name || "Creator"}
          </h1>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto sm:mx-0">
            Step into your VR space. Connect, talk, and hang out with up to six
            people in your VR social room.
          </p>
        </section>

        {/* Room Card */}
        <section
  className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-10 
             border border-white/10 bg-white/5 p-8 rounded-2xl 
             backdrop-blur-sm hover:bg-white/10 transition"
>
  {/* Left Text + Button */}
  <div
    className="flex-1 flex flex-col items-center sm:items-start justify-center 
               text-center sm:text-left"
  >
    <h2 className="text-2xl sm:text-3xl font-bold mb-2">
      Virtual Room
    </h2>
    <p className="text-slate-400 mb-4 max-w-md">
      Join a shared VR space for meaningful conversations, laughter, and
      connection — no distractions, just presence.
    </p>
    <button
      onClick={() => navigate("/vrroom")}
      className="cursor-pointer flex h-14 w-40 items-center justify-center rounded-full 
                 p-1 transition-transform duration-500 ease-in-out hover:scale-105
                 bg-gradient-to-r from-yellow-500 via-red-500 to-purple-600"
    >
      <div
        className="flex font-bold h-full w-full items-center justify-center rounded-full
                   bg-black/70 text-white/90
                   shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
      >
        Join VR Room
      </div>
    </button>
  </div>

  {/* Right – Image (centered both axes) */}
  <div className="flex-1 flex items-center justify-center ">
    <img 
      src="/media/dashboard1.png"
      alt="VR Lounge"
      className="w-64 sm:w-72 md:w-80 opacity-90 rounded-md"
    />
  </div>
</section>


        {/* Placeholder for future features */}
        <section className="mt-16 text-center text-slate-500 text-sm">
          <p>More rooms and interactive activities coming soon.</p>
        </section>
      </main>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import axios from "axios";
// import DashNavbar from "../components/DashNavBar";

// // Drop this file in the same route as your existing Dashboard and replace the export below
// // Tailwind-only, no extra libs needed. Works out of the box.
// export default function Dashboard() {
//   const { user, logout } = useAuth();

//   const [stats] = useState({
//     rooms: 3,
//     friends: 42,
//     unread: 7,
//   });

//   const [requests] = useState([
//     { id: 1, name: "Rishabh Sur", mutual: 5 },
//     { id: 2, name: "Priyanshu N.", mutual: 2 },
//     { id: 3, name: "Arjun M.", mutual: 1 },
//   ]);

//   const [online] = useState([
//     { id: 11, name: "Karthik", status: "In VR Room • Lobby" },
//     { id: 12, name: "Meera", status: "Exploring • ‘Neon City’" },
//     { id: 13, name: "Jonas", status: "Idle" },
//     { id: 14, name: "Tanvi", status: "Building Room" },
//   ]);

//   const [feed] = useState([
//     {
//       id: 21,
//       who: "You",
//       what: "created a room",
//       extra: "‘Prototype Hangout’",
//       time: "2m",
//     },
//     {
//       id: 22,
//       who: "Rishabh",
//       what: "joined",
//       extra: "‘Neon City’",
//       time: "18m",
//     },
//     {
//       id: 23,
//       who: "Meera",
//       what: "unlocked badge",
//       extra: "‘Architect’",
//       time: "1h",
//     },
//     {
//       id: 24,
//       who: "Arjun",
//       what: "shared clip",
//       extra: "‘Boss battle’",
//       time: "2h",
//     },
//   ]);

//   const loadSecret = async () => {
//     const res = await axios.get("http://localhost:3000/api/protected/data", {
//       withCredentials: true,
//     });
//     alert(JSON.stringify(res.data, null, 2));
//   };

//   //////////////////////////////////////
//   const [posts, setPosts] = useState([]);
//   const [form, setForm] = useState({ title: "", body: "" });

//   // Base URL for your backend
//   const API_URL = "http://localhost:4000/api";

//   // Fetch all posts when the component mounts
//   // useEffect(() => {
//   //   axios
//   //     .get(`${API_URL}/posts`)
//   //     .then((res) => setPosts(res.data))
//   //     .catch((err) => console.error("Error fetching posts:", err));
//   // }, []);

//   // Create a new post
//   // const createPost = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const res = await axios.post(`${API_URL}/posts`, form, {
//   //       withCredentials: true, // include if you use cookies/session
//   //     });
//   //     setPosts((p) => [res.data, ...p]);
//   //     setForm({ title: "", body: "" });
//   //   } catch (err) {
//   //     console.error("Error creating post:", err);
//   //   }
//   // };

//   //////////////////////////////////////

//   // simple avatar circle with initials
//   const Avatar = ({ name }) => (
//     <div className="shrink-0 h-9 w-9 rounded-full bg-white/10 border border-white/10 grid place-items-center text-sm font-bold text-white/80">
//       {name
//         .split(" ")
//         .map((s) => s[0])
//         .join("")
//         .slice(0, 2)}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#07070b] text-slate-100">
//       {/* Background Flares */}
//       <div className="fixed inset-0 -z-10 pointer-events-none">
//         <div className="absolute -top-24 right-0 h-80 w-80 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-cyan-400/30 to-indigo-500/20" />
//         <div className="absolute -bottom-24 -left-10 h-96 w-96 rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-emerald-400/25 to-sky-500/20" />
//       </div>

//       <DashNavbar
//         shadow={true}
//         links={[
//           { to: "/friendlist", label: "Friends" },
//           { to: "/messages", label: "Messages" },
//           { to: "/profile", label: "Profile" },
//           { to: "/setting", label: "Settings" },
//           { label: "Log Out", onClick: logout },
//         ]}
//       />

//       <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
//         {/* Header */}
//         <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
//               Welcome{user?.name ? ", " : ""} {user?.name || "Creator"}
//             </h1>
//             <p className="text-slate-400 mt-1">
//               Join rooms, hang out with friends, and share moments — all in VR.
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             {/* <button
//               onClick={loadSecret}
//               className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm"
//             >
//               Test Secure API
//             </button> */}
//             <button className="cursor-pointer px-3 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-500/80 text-sm font-semibold shadow-[0_8px_30px_rgba(79,70,229,.25)]">
//               Join VR Room
//             </button>
//           </div>
//         </section>

//         {/* Stats */}
//         {/* <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
//           <StatCard
//             label="Active Rooms"
//             value={stats.rooms}
//             hint="You can host up to 8 free rooms"
//           />
//           <StatCard
//             label="Friends"
//             value={stats.friends}
//             hint="Keep the vibe alive"
//           />
//           <StatCard
//             label="Unread"
//             value={stats.unread > 100 ? "100+" : stats.unread}
//             hint="Messages & invitations"
//           />
//         </section> */}

//         {/* <section>
//           <div className="p-4">
//             <form onSubmit={createPost} className="mb-6 flex flex-col gap-2">
//               <input
//                 value={form.title}
//                 onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 placeholder="Title"
//                 className="border p-2 rounded"
//               />
//               <textarea
//                 value={form.body}
//                 onChange={(e) => setForm({ ...form, body: e.target.value })}
//                 placeholder="Body"
//                 className="border p-2 rounded"
//               />
//               <button
//                 type="submit"
//                 className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded"
//               >
//                 Create Post
//               </button>
//             </form>

//             <ul className="space-y-4">
//               {posts.map((p) => (
//                 <li key={p._id} className="border-b pb-2">
//                   <h3 className="font-semibold">{p.title}</h3>
//                   <p>{p.body}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </section> */}

//         {/* Main grid */}
//         <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
//           {/* Left column: Friend requests & Online now */}
//           <div className="lg:col-span-1 space-y-6">
//             <Card
//               title="Friend Requests"
//               right={<Badge>{requests.length}</Badge>}
//             >
//               <ul className="divide-y divide-white/5">
//                 {requests.map((r) => (
//                   <li key={r.id} className="py-3 flex items-center gap-3">
//                     <Avatar name={r.name} />
//                     <div className="min-w-0">
//                       <p className="font-semibold truncate">{r.name}</p>
//                       <p className="text-slate-400 text-xs">
//                         {r.mutual} mutual
//                       </p>
//                     </div>
//                     <div className="ml-auto flex gap-2">
//                       <button className="px-2.5 py-1.5 text-xs rounded-md bg-emerald-500/90 hover:bg-emerald-500 font-semibold">
//                         Accept
//                       </button>
//                       <button className="px-2.5 py-1.5 text-xs rounded-md bg-white/5 hover:bg-white/10 border border-white/10">
//                         Ignore
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </Card>

//             <Card
//               title="Online Now"
//               right={
//                 <span className="text-xs text-slate-400">
//                   {online.length} online
//                 </span>
//               }
//             >
//               <ul className="space-y-3">
//                 {online.map((o) => (
//                   <li key={o.id} className="flex items-center gap-3">
//                     <span className="relative">
//                       <Avatar name={o.name} />
//                       <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#07070b]" />
//                     </span>
//                     <div className="min-w-0">
//                       <p className="font-medium truncate">{o.name}</p>
//                       <p className="text-slate-400 text-xs truncate">
//                         {o.status}
//                       </p>
//                     </div>
//                     <button className="ml-auto px-2.5 py-1.5 text-xs rounded-md bg-indigo-500/90 hover:bg-indigo-500 font-semibold">
//                       Invite
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </Card>
//           </div>

//           {/* Middle column: Activity feed */}
//           <div className="lg:col-span-2">
//             <Card title="Activity" right={<FilterTabs />}>
//               <ul className="divide-y divide-white/5">
//                 {feed.map((f) => (
//                   <li key={f.id} className="py-4 flex items-start gap-3">
//                     <div className="h-8 w-8 rounded-md bg-white/5 grid place-items-center">
//                       🎮
//                     </div>
//                     <div className="min-w-0">
//                       <p className="text-sm">
//                         <span className="font-semibold">{f.who}</span> {f.what}{" "}
//                         <span className="text-indigo-300">{f.extra}</span>
//                       </p>
//                       <p className="text-slate-400 text-xs mt-1">
//                         {f.time} ago
//                       </p>
//                     </div>
//                     <button className="ml-auto px-2.5 py-1.5 text-xs rounded-md bg-white/5 hover:bg-white/10 border border-white/10">
//                       Open
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </Card>

//             {/* Quick actions row */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
//               <ActionTile
//                 title="Start Hangout"
//                 desc="Instant join with a code"
//                 icon="🕹️"
//                 cta="Start"
//               />
//               <ActionTile
//                 title="Join Room"
//                 desc="Enter a 6‑digit code"
//                 icon="🎧"
//                 cta="Join"
//               />
//               <ActionTile
//                 title="Invite Friend"
//                 desc="Share link or QR"
//                 icon="👥"
//                 cta="Invite"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Discover rooms */}
//         {/* <section className="mt-10">
//           <h2 className="text-lg font-bold mb-3">Trending VR Rooms</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {["Neon City", "Zen Dojo", "Sky Lounge"].map((room, i) => (
//               <div
//                 key={room}
//                 className="group rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] hover:from-white/[0.06] hover:to-white/[0.03] transition"
//               >
//                 <div className="h-28 bg-[radial-gradient(60%_80%_at_70%_0%,rgba(99,102,241,.25),transparent)]" />
//                 <div className="p-4 flex items-start gap-3">
//                   <div className="h-9 w-9 rounded-md bg-white/5 grid place-items-center">
//                     🏙️
//                   </div>
//                   <div className="min-w-0">
//                     <p className="font-semibold truncate">{room}</p>
//                     <p className="text-xs text-slate-400 truncate">
//                       {i * 12 + 28} people inside • Public
//                     </p>
//                   </div>
//                   <button className="ml-auto px-2.5 py-1.5 text-xs rounded-md bg-indigo-500/90 hover:bg-indigo-500 font-semibold">
//                     Enter
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section> */}
//       </main>
//     </div>
//   );
// }

// function StatCard({ label, value, hint }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_8px_30px_rgba(0,0,0,.25)]">
//       <p className="text-slate-400 text-sm">{label}</p>
//       <p className="mt-1 text-2xl font-extrabold tracking-tight">{value}</p>
//       {hint && <p className="text-slate-500 text-xs mt-1">{hint}</p>}
//     </div>
//   );
// }

// function Card({ title, right, children }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="text-base font-bold">{title}</h3>
//         {right}
//       </div>
//       {children}
//     </div>
//   );
// }

// function Badge({ children }) {
//   return (
//     <span className="inline-flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-indigo-600/90 text-white text-xs font-bold">
//       <span className="relative z-10">{children}</span>
//     </span>
//   );
// }

// function ActionTile({ title, desc, icon, cta }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-start gap-3 hover:bg-white/[0.05] transition group">
//       <div className="h-10 w-10 rounded-xl bg-white/5 grid place-items-center text-lg">
//         {icon}
//       </div>
//       <div className="min-w-0">
//         <p className="font-semibold truncate">{title}</p>
//         <p className="text-slate-400 text-xs mt-0.5 line-clamp-2">{desc}</p>
//       </div>
//       <button className="ml-auto px-2.5 py-1.5 text-xs rounded-md bg-indigo-500/90 hover:bg-indigo-500 font-semibold">
//         {cta}
//       </button>
//     </div>
//   );
// }

// function FilterTabs() {
//   return (
//     <div className="flex items-center gap-1 text-xs bg-white/5 border border-white/10 rounded-lg p-1">
//       {[
//         { k: "all", lbl: "All" },
//         { k: "rooms", lbl: "Rooms" },
//         { k: "clips", lbl: "Clips" },
//       ].map((t, i) => (
//         <button
//           key={t.k}
//           className={`${
//             i === 0 ? "bg-white/10" : "hover:bg-white/10"
//           } px-2 py-1 rounded-md`}
//         >
//           {t.lbl}
//         </button>
//       ))}
//     </div>
//   );
// }
