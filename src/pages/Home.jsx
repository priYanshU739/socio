// SocioEventLanding.jsx (Tailwind version)
// Drop in src/SocioEventLanding.jsx and render from App.jsx
// Requires Tailwind set up (v3 or v4). In v4 CSS, ensure src/index.css has `@import "tailwindcss";`

import { useEffect, useRef, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import { useNavigate } from "react-router-dom";
import logo from "../../public/media/logo.png";
export default function Home() {
  // simple parallax for the showcase bg image & sticky shadow toggle
  const [shadow, setShadow] = useState(false);
  const parallaxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setShadow(window.scrollY > 10);
      const y = Math.min(80, window.scrollY * 0.15);
      if (parallaxRef.current)
        parallaxRef.current.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100">
      {/* NAV */}
      <HomeNavbar
        shadow={true}
        links={[
          { to: "/about", label: "About" },
          { to: "/contactus", label: "Contact" },
          { to: "/faq", label: "FAQ" },
          { to: "/signin", label: "Sign In" },
        ]}
      />

      {/* HERO */}
      <section
        id="top"
        className="relative grid place-items-center min-h-[88vh] overflow-hidden bg-[#07070b]"
      >
        {/* subtle gradient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-0 h-[600px] w-[1200px] rounded-full blur-3xl bg-cyan-500/20" />
          <div className="absolute -top-32 left-0 h-[500px] w-[1000px] rounded-full blur-3xl bg-emerald-400/15" />
        </div>

        {/* background media */}
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-50 saturate-[.95] contrast-[1.05]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/meeting-hero.jpg"
          aria-hidden="true"
        >
          <source src="/media/meeting-vedio1.mp4" type="video/mp4" />
        </video>

        {/* gradient shade */}
        <div className="absolute inset-0 from-black/20 via-black/70 to-[#07070b]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center">
          <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs sm:text-sm text-cyan-100 border border-white/20 bg-cyan-500/10">
            Next Dimension of Social Connection
          </span>

          {/* Responsive title */}
          <h1
            className="mt-2 mb-3 tracking-tight leading-tight
             font-extrabold text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
             bg-linear-to-r from-yellow-400 via-red-500  to-purple-600
              bg-clip-text text-transparent"
            style={{ backgroundPosition: "left center" }}
          >
            <span className="block">Welcome to the </span> Social Verse
          </h1>

          {/* Responsive paragraph */}
          <p className="mx-auto mb-7 max-w-3xl text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl">
            Step into a high-fidelity real-world experience — explore,
            socialize, and meet people in an exclusive realm of virtual and
            augmented reality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate("/signin")}
              className="cursor-pointer flex h-14 w-40 items-center justify-center rounded-full 
               p-1 transition-transform duration-500 ease-in-out hover:scale-105
              bg-linear-to-r from-yellow-500  via-red-500 to-purple-600"
            >
              {/* Inner fills the button, keeps the thin gradient strip visible */}
              <div
                className="flex font-bold h-full w-full items-center justify-center rounded-full
                 bg-black/70 text-white/90
                 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
              >
                Start
              </div>
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("trailer")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="cursor-pointer  items-center justify-center  flex h-14 w-40 rounded-full font-bold border border-white/20 text-white/90 hover:bg-white/5 transition-transform duration-500 ease-in-out hover:scale-105 text-center"
            >
              Explore
            </button>
          </div>

          {/* Feature tags */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {["Photo Realism", "Real World Locations", "Fun Activities"].map(
              (tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full border border-white/10 text-slate-300 text-xs sm:text-sm"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="overview" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold">
            World’s First Social Platform
          </h2>
          <p className="text-slate-400 mt-2">
            powered by Virtual Reality — where you can explore, connect, and
            meet people in fully immersive 3D worlds.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 ">
            {[
              {
                title: "Photo Realism",
                desc: "Lifelike graphics that blur the line between real and virtual.",
              },
              {
                title: "Real World Location",
                desc: "Discover virtual worlds inspired by real places.",
              },
              {
                title: "Fun Games",
                desc: "Play, compete, and enjoy fun activities with friends.",
              },
              {
                title: "Make New Friends",
                desc: "Meet people and build real connections in virtual worlds.",
              },
              {
                title: "Voice Rooms",
                desc: "Join live talks and share your ideas freely.",
              },
              {
                title: "Exclusive Rewards",
                desc: "Unlock outfits, emotes, and special bonuses.",
              },
            ].map((f, i) => (
              <article
                key={i}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 
                transition-transform duration-500 ease-in-out hover:scale-105"
              >
                {/* <span className="text-xs text-cyan-200">Feature #{i + 1}</span> */}
                <h3 className="mt-1 font-semibold">{f.title}</h3>
                <p className="text-slate-300 mt-1">{f.desc}</p>
                <div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-cyan-400/15 blur-2xl" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE / PARALLAX */}
      <section
        id="trailer"
        className="relative overflow-hidden min-h-[30vh] sm:min-h-[40vh] bg-[#07070b] flex items-center justify-center"
      >
        {/* background image */}
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606943137305-0614673d846f?q=80&w=1600&auto=format&fit=crop')] 
               bg-cover bg-center opacity-25 will-change-transform"
        />

        {/* content container */}
        <div
          className="relative flex flex-col lg:flex-row items-center justify-between 
                  max-w-7xl w-full mx-auto px-6 py-20 gap-10"
        >
          {/* LEFT: Text content */}
          <div className="lg:w-[40%] text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-white">
              Cinematic Showcase
            </h2>
            <p className="max-w-md text-slate-400 mb-6">
              Watch this cinematic experience and step into{" "}
              <span className="text-gray-300 font-bold gap-0 ">
                Socio{" "}
                {/* <span className=" bg-linear-to-r from-yellow-500  via-red-500 to-purple-600  bg-clip-text text-transparent">
                  VR
                </span> */}
              </span>
              — a space where you don’t just see virtual worlds, you live them,
              connect with others, and create your own moments
            </p>
          </div>

          {/* RIGHT: Video */}
          {/* <div className="lg:w-[60%] flex justify-center">
            <video
              src="/media/meeting-vedio3.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="rounded-2xl shadow-2xl border border-white/10 
                   w-[95%] sm:w-[90%] md:w-[85%] lg:w-[90%] xl:w-[85%] aspect-video"
            />
          </div> */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <iframe
              // src="https://www.youtube.com/embed/6P4AF8eP-Yg?autoplay=1&mute=1&loop=1&playlist=6P4AF8eP-Yg"
              title="YouTube video player"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="rounded-2xl shadow-2xl border border-white/10 
               w-[95%] sm:w-[90%] md:w-[85%] lg:w-[95%] xl:w-[90%] 
               aspect-video min-h-[220px] sm:min-h-[300px] md:min-h-[380px]"
            ></iframe>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="howto" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold">How It Works</h2>
          <p className="text-slate-400 mt-2">
            Simple steps to hop in from your browser
          </p>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Sign In",
                desc: "Start your journey by signing in to access your personalized VR world.",
              },
              {
                title: "Pick Your Look",
                desc: "Customize your avatar with unique outfits and styles that express you.",
              },
              {
                title: "Squad Up",
                desc: "Invite friends or meet new ones to explore and play together in real time.",
              },
              {
                title: "Complete Challenges",
                desc: "Take on daily quests and events to unlock rewards and exclusive content.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-3 items-start rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div
                  className="h-9 w-9 rounded-full grid place-items-center font-extrabold 
                      bg-linear-to-r from-yellow-400 via-red-400 to-purple-500 text-white"
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-white">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REWARDS / GALLERY */}
      <section id="rewards" className="pt-0 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Avatars & Emotes</h2>
          <p className="text-slate-400 mt-2">
            Explore different realistic avatars and expressive emotes that bring
            your virtual personality to life.
          </p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 ">
            {[
              "https://images.unsplash.com/photo-1520975922322-54b0d24a0a44?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1600&auto=format&fit=crop",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="reward"
                loading="lazy"
                className="h-56 w-full object-cover rounded-xl border border-white/10 transition-transform duration-500 ease-in-out hover:scale-105"
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold">FAQ</h2>
          <div className="grid gap-3 mt-2">
            <details className="rounded-xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer font-semibold">
                Do I need to install anything?
              </summary>
              <p className="text-slate-300 mt-2">
                No, it streams to your browser via WebRTC. Use a modern Chromium
                or Firefox build on desktop for best results.
              </p>
            </details>
            <details className="rounded-xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer font-semibold">
                Will this run on my phone?
              </summary>
              <p className="text-slate-300 mt-2">
                We recommend desktop for full fidelity. A lightweight mobile
                preview can be provided separately.
              </p>
            </details>
            <details className="rounded-xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer font-semibold">
                How do I squad up?
              </summary>
              <p className="text-slate-300 mt-2">
                Invite friends from your dashboard and join a shared session.
                Voice chat works with microphone permission.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* PLAY */}
      <section id="play" className="pt-0 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Jump In</h2>
          <p className="text-slate-400 mt-2">
            Embed your Pixel Streaming player below by replacing the iframe src
            with your signalling server URL.
          </p>
          <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 bg-black">
            <iframe
              title="Socio Stream"
              src="https://your-signalling-server.example.com/"
              allow="autoplay; microphone; clipboard-read; clipboard-write"
              className="w-full h-[65vh] border-0"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/30 bg-zinc-900 backdrop-blur-md py-10 text-slate-400">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          {/* Left - Branding */}
          <div>
            <div className="flex w- 60 ">
              <span className="h-10 w-7 ">
              <img src={logo} alt="Logo" className="w-10 h-auto" />
            </span>
            <h3 className="text-2xl  font-bold text-white tracking-wide">
              Socio
              {/* <span className="bg-linear-to-r from-yellow-400 font-bold via-red-500 to-purple-500 bg-clip-text text-transparent">
                VR
              </span> */}
            </h3>
            </div>
            <p className="text-sm text-slate-400">
              Next Dimension of Social Connection
            </p>
            <p className="text-xs mt-2 text-slate-400">
              © {new Date().getFullYear()} Socio. All rights reserved.
            </p>
          </div>

          {/* Right - Interactive items */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-6 text-sm">
            <button className="transition hover:text-white hover:underline focus:outline-none cursor-pointer">
              Terms
            </button>
            <button
              onClick={() => navigate("/privacypolicy")}
              className="transition hover:text-white hover:underline focus:outline-none cursor-pointer"
            >
              Privacy
            </button>
            <button
              onClick={() => navigate("/contactus")}
              className="transition hover:text-white hover:underline focus:outline-none cursor-pointer"
            >
              Contact
            </button>
            <button className="transition hover:text-white hover:underline focus:outline-none cursor-pointer">
              Support
            </button>
          </div>
        </div>

        {/* Bottom subtle gradient divider */}
        <div className="mt-8 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </footer>
    </div>
  );
}
