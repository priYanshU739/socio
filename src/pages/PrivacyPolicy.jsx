import { useMemo, useState } from "react";
import DashNavbar from "../components/DashNavbar.jsx";
import { useAuth } from "../auth/AuthContext";

//   <DashNavbar
//     shadow={true}
//     links={[
//       { to: "/friendlist", label: "Friends" },
//       { to: "/profile", label: "Profile" },
//       { to: "/setting", label: "Settings" },
//       { label: "Log Out", onClick: logout },
//     ]}
//   />

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>

        <p className="text-sm text-gray-400 mb-8">
          Effective Date: February 2026 <br />
          Platform: Konnex <br />
          Website: https://konnex.in
        </p>

        {/* Data Controller Info */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Data Controller Information
          </h2>
          <p>
            Konnex is a preincubated startup at{" "}
            <span className="text-white font-medium">Nirmaan IIT Madras</span>.
          </p>
          <p className="mt-2">
            Sudha Shankar Innovation Hub, IIT Madras <br />
            Chennai, Tamil Nadu – 600036 <br />
            India
          </p>
          
          <p className="mt-4">
            For privacy or data protection inquiries, contact: 
          </p> 
          <p className="mt-2 text-white font-medium">contact.konnexteam@gmail.com</p>
          <p className="mt-2 text-white font-medium">9263704199, 8955091204</p>
        </section>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            1. Introduction
          </h2>
          <p>
            Konnex is a virtual reality social media platform that allows users
            to create 3D avatars, join virtual rooms, and interact with other
            users in real time. This Privacy Policy explains how we collect,
            use, store, protect, and retain your personal information.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            2. Information We Collect
          </h2>

          <h3 className="text-lg font-medium text-white mt-4 mb-2">
            A. Information You Provide
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Email address for account registration and communication.</li>
            <li>Username displayed publicly within virtual rooms.</li>
            <li>Selfie image uploaded to generate your 3D avatar.</li>
          </ul>

          <h3 className="text-lg font-medium text-white mt-6 mb-2">
            B. Automatically Collected Information
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>IP address</li>
            <li>Device information</li>
            <li>Log data</li>
            <li>Usage data such as session activity and room participation</li>
          </ul>
        </section>

        {/* How We Collect Data */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            3. How We Collect Data
          </h2>
          <p>
            We collect data through account registration forms, user uploads,
            authentication processes, and automated system logs generated during
            platform usage.
          </p>
        </section>

        {/* How We Use Data */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            4. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Create and manage user accounts.</li>
            <li>Generate and display 3D avatars.</li>
            <li>Enable real-time virtual room interactions.</li>
            <li>Provide voice communication features.</li>
            <li>Maintain platform security and prevent fraud.</li>
            <li>Improve platform functionality and performance.</li>
            <li>Respond to user inquiries and support requests.</li>
          </ul>
          <p className="mt-4">
            We do not sell personal data and do not use it for advertising.
          </p>
        </section>

        {/* Data Sharing */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            5. How We Share Your Information
          </h2>
          <p>We do not sell, rent, or trade personal information.</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              Shared with Epic Online Services (EOS) for authentication and
              online functionality.
            </li>
            <li>If required by law or legal process.</li>
            <li>
              To protect the rights, safety, or security of the platform and
              users.
            </li>
          </ul>
          <p className="mt-4">
            Usernames and 3D avatars are visible to other users within virtual
            rooms as part of core platform functionality.
          </p>
        </section>

        {/* Data Retention */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            6. Data Retention
          </h2>
          <p>
            We retain personal information for as long as your account remains
            active or as necessary to provide services. If you request account
            deletion, your data will be removed from active systems within a
            reasonable timeframe unless retention is required by law.
          </p>
        </section>

        {/* Data Security */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            7. Data Security
          </h2>
          <p>
            We implement reasonable administrative, technical, and
            organizational safeguards to protect personal data from unauthorized
            access, alteration, disclosure, or destruction.
          </p>
        </section>

        {/* Privacy Rights */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            8. Your Privacy Rights
          </h2>
          <p>
            You may request access, correction, or deletion of your personal
            data. To submit a privacy or data protection request, contact:
          </p>
          <p className="mt-3 text-white font-medium">privacy@konnex.in</p>
          <p className="mt-2">
            We respond to verified requests within approximately 2 - 3 days.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            9. Children's Privacy
          </h2>
          <p>
            Konnex is not intended for children under 13 years of age. We do not
            knowingly collect personal information from children under 13.
          </p>
        </section>

        {/* Policy Updates */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            10. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Updates will be
            posted on this page with a revised effective date.
          </p>
        </section>
      </div>
    </div>
  );
}
