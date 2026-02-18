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


export default function PrivacyPolicy () {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300 px-6 py-16">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-white mb-6">
          Privacy Policy
        </h1>

        <p className="text-sm text-gray-400 mb-10">
          Effective Date: February 2026 <br />
          Platform: Konnex <br />
          Website: https://konnex.in <br />
          {/* Contact: support@konnex.in */}
        </p>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            1. Introduction
          </h2>
          <p>
            Konnex is a virtual reality social media platform that allows users
            to create 3D avatars, join virtual rooms, and interact with other
            users in real time. This Privacy Policy explains how we collect,
            use, store, and protect your information when you use our platform.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            2. Information We Collect
          </h2>

          <h3 className="text-lg font-medium text-white mt-4 mb-2">
            A. Information You Provide
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Email address for registration and communication.</li>
            <li>Username displayed publicly within virtual rooms.</li>
            <li>
              User image (selfie) uploaded to generate your 3D avatar.
            </li>
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

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            3. How We Collect Data
          </h2>
          <p>
            We collect information through account registration forms, user
            uploads (such as selfie images), authentication processes, and
            automated system logs generated during platform usage.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            4. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Create and manage your user account.</li>
            <li>Generate and display your 3D avatar.</li>
            <li>Enable real-time virtual room interactions.</li>
            <li>Provide voice communication features.</li>
            <li>Maintain security and prevent fraud.</li>
            <li>Improve platform functionality and performance.</li>
            <li>Respond to support inquiries.</li>
          </ul>
          <p className="mt-4">
            We do not sell your personal data or use it for advertising
            purposes.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            5. How We Share Your Information
          </h2>
          <p>
            We do not sell, rent, or trade your personal information to third
            parties.
          </p>
          <p className="mt-4">
            Your data may only be shared:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>
              With Epic Online Services (EOS) for authentication and online
              functionality.
            </li>
            <li>If required by law or legal process.</li>
            <li>
              To protect the safety, rights, or security of the platform or its
              users.
            </li>
          </ul>
          <p className="mt-4">
            Usernames and 3D avatars are visible to other users inside virtual
            rooms as part of core platform functionality.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            6. Data Retention
          </h2>
          <p>
            We retain personal information for as long as your account remains
            active or as necessary to provide services. If you request account
            deletion, your personal data will be permanently removed from our
            active systems within a reasonable timeframe unless required by
            law to retain it.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            7. Data Security
          </h2>
          <p>
            We implement reasonable administrative and technical safeguards to
            protect user data from unauthorized access, alteration, disclosure,
            or destruction. However, no internet-based system can be guaranteed
            to be completely secure.
          </p>
        </section>

        {/* Section 8 */}
        {/* <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            8. User Rights
          </h2>
          <p>
            You may request access, correction, or deletion of your personal
            data by contacting us at:
          </p>
          <p className="mt-2 text-white">support@konnex.in</p>
        </section> */}

        {/* Section 9 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            8. Children's Privacy
          </h2>
          <p>
            Konnex is not intended for children under 13 years of age. We do
            not knowingly collect personal information from children under 13.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            9 . Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated effective date.
          </p>
        </section>

      </div>
    </div>
  );
};
