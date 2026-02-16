import { useEffect, useState } from "react";
import Preferences from "../components/Preference";
import { useAuth } from "../auth/AuthContext";

export default function Questions() {
  const { user, loading } = useAuth(); // make sure AuthContext exposes `loading`

  // Avoid logging when undefined
  // console.log(user?.id || user?._id);

  const userId = user?.id || user?._id;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="p-6">
        <h1 className="text-2xl font-semibold">SociaVR</h1>
      </header>

      {/* Show nothing (or a spinner) until auth is resolved */}
      {loading ? (
        <main className="p-6">Loading…</main>
      ) : (
        <>
          {userId && (
            <div>
              <Preferences
                userId={userId}
                forceOpen={true} // optional while testing
                onComplete={(payload) => {
                  console.log("Onboarding saved:", payload);
                }}
              />
            </div>
          )}

          <main className="p-6">Welcome, {user ? user.name : "Guest"}!</main>
        </>
      )}
    </div>
  );
}
