import React from "react";
import HomeNavbar from "../components/HomeNavbar";
export default function About () {
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

      <div className="max-w-5xl mx-auto">

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          About Us
        </h1>

        <p className="text-lg text-gray-400 mb-12">
          Redefining human connection in the virtual era.
        </p>

        {/* Vision Section */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Our Vision
          </h2>
          <p className="leading-relaxed mb-4">
            Konnex is building the next generation of social interaction —
            where digital presence feels real. We believe the future of
            communication goes beyond text, images, and video. It is immersive,
            spatial, and human.
          </p>
          <p className="leading-relaxed">
            Our mission is to enable people to connect, communicate, and
            collaborate in virtual environments that feel natural, expressive,
            and interactive.
          </p>
        </section>

        {/* What We Do */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-white mb-4">
            What We Do
          </h2>

          <p className="leading-relaxed mb-4">
            Konnex is a virtual reality social platform that allows users to:
          </p>

          <ul className="list-disc list-inside space-y-3">
            <li>Create personalized 3D avatars using a selfie.</li>
            <li>Join immersive virtual rooms.</li>
            <li>Interact with other users in real time.</li>
            <li>Engage in spatial voice communication.</li>
            <li>Experience presence beyond traditional social media.</li>
          </ul>
        </section>

        {/* Technology */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Our Technology
          </h2>

          <p className="leading-relaxed mb-4">
            Konnex leverages advanced 3D rendering, real-time networking, and
            secure authentication systems to deliver immersive digital
            experiences.
          </p>

          <p className="leading-relaxed">
            We integrate industry-standard online services to ensure secure
            authentication, reliable connectivity, and scalable virtual room
            infrastructure.
          </p>
        </section>

       

        {/* Commitment */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Our Commitment
          </h2>

          <p className="leading-relaxed mb-4">
            We are committed to building a safe, secure, and privacy-conscious
            platform. User trust is foundational to immersive technology.
          </p>

          <p className="leading-relaxed">
            As we expand, we aim to create a global virtual ecosystem where
            meaningful digital interactions become as natural as real-world
            presence.
          </p>
        </section>

        {/* Contact CTA */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Get in Touch
          </h2>

          <p>
            For partnerships, business inquiries, or media requests, contact:
          </p>

          <p className="mt-3 text-white font-medium">
            contact.konnexteam@gmail.com
          </p>
        </section>

      </div>
    </div>
  );
};
