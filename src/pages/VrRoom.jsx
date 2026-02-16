// import { useAuth } from "../auth/AuthContext";
// import { useEffect, useRef, useState } from "react";

// export default function VRRoom() {
//   const { user, loading } = useAuth();
//   const iframeRef = useRef(null);
//   const [streamUrl, setStreamUrl] = useState(null);

//   const username = user?.email || "UnknownUser";

//   // 🚀 Start Unreal session
//   useEffect(() => {
//     if (loading || !user) return;

//     async function startSession() {
//       const res = await fetch("http://localhost:4000/api/session/start", {
//         method: "POST",
//         credentials: "include", // ✅ send auth cookie
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await res.json();
//       setStreamUrl(data.streamUrl);
//     }

//     startSession();

//     return () => {
//       fetch("http://localhost:4000/api/session/stop", {
//         method: "POST",
//         credentials: "include",
//       });
//     };
//   }, [loading, user]);

//   // Send username to Unreal (optional)
//   useEffect(() => {
//     if (!streamUrl) return;

//     const iframe = iframeRef.current;
//     if (!iframe) return;

//     const handleLoad = () => {
//       setTimeout(() => {
//         iframe.contentWindow?.postMessage(
//           { type: "SetUserEmail", email: username },
//           "*"
//         );
//       }, 2000);
//     };

//     iframe.addEventListener("load", handleLoad);
//     return () => iframe.removeEventListener("load", handleLoad);
//   }, [streamUrl, username]);

//   if (loading || !streamUrl) {
//     return (
//       <div className="min-h-screen grid place-items-center text-slate-500">
//         Launching VR session…
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center">
//       <iframe
//         ref={iframeRef}
//         src={streamUrl}
//         title="Social1 VR Room"
//         className="w-[90vw] h-[85vh] rounded-xl border border-white/10"
//         allow="camera; microphone; fullscreen; autoplay"
//       />
//     </div>
//   );
// }


// import { useAuth } from "../auth/AuthContext";
// import { useEffect, useRef, useState } from "react";

// export default function VRRoom() {
//   const { user, loading } = useAuth();
//   const iframeRef = useRef(null);
//   const [streamUrl, setStreamUrl] = useState(null);
//   const [error, setError] = useState(null);

//   // 🚀 Start Unreal session
//   useEffect(() => {
//     if (loading || !user) return;

//     let isMounted = true;

//     async function startSession() {
//       try {
//         const res = await fetch("http://localhost:4000/api/session/start", {
//           method: "POST",
//           credentials: "include", // ✅ send auth cookie
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!res.ok) {
//           throw new Error(`Failed to start session: ${res.statusText}`);
//         }

//         const data = await res.json();
        
//         if (isMounted) {
//           // The streamUrl already includes userEmail as a query parameter
//           // The player.html will automatically read it and send to Unreal Engine
//           setStreamUrl(data.streamUrl);
//           console.log("[VRRoom] Session started:", data);
//         }
//       } catch (err) {
//         console.error("[VRRoom] Error starting session:", err);
//         if (isMounted) {
//           setError(err.message || "Failed to start session");
//         }
//       }
//     }

//     startSession();

//     return () => {
//       isMounted = false;
//       // Cleanup: stop session when component unmounts
//       fetch("http://localhost:4000/api/session/stop", {
//         method: "POST",
//         credentials: "include",
//       }).catch((err) => {
//         console.error("[VRRoom] Error stopping session:", err);
//       });
//     };
//   }, [loading, user]);

//   // Show loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen grid place-items-center text-slate-500">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
//           <p>Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // Show error state
//   if (error) {
//     return (
//       <div className="min-h-screen grid place-items-center text-red-500">
//         <div className="text-center">
//           <p className="text-xl mb-4">Error: {error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Show loading while waiting for stream URL
//   if (!streamUrl) {
//     return (
//       <div className="min-h-screen grid place-items-center text-slate-500">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
//           <p>Launching VR session…</p>
//           <p className="text-sm mt-2 text-slate-400">
//             Connecting to dedicated server...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center">
//       <iframe
//         ref={iframeRef}
//         src={streamUrl}
//         title="Social1 VR Room"
//         className="w-[90vw] h-[85vh] rounded-xl border border-white/10"
//         allow="camera; microphone; fullscreen; autoplay"
//         allowFullScreen
//       />
//     </div>
//   );
// }


import { useAuth } from "../auth/AuthContext";
import { useEffect, useRef, useState } from "react";

export default function VRRoom() {
  const { user, loading } = useAuth();
  const iframeRef = useRef(null);
  const [streamUrl, setStreamUrl] = useState(null);
  const [error, setError] = useState(null);
  const sessionStartedRef = useRef(false);

  // 🚀 Start Unreal session
  useEffect(() => {
    if (loading || !user) return;

    let isMounted = true;

    async function startSession() {
      // Prevent multiple session starts
      if (sessionStartedRef.current) {
        console.log("[VRRoom] Session already started, skipping...");
        return;
      }

      try {
        const res = await fetch("http://localhost:4000/api/session/start", {
          method: "POST",
          credentials: "include", // ✅ send auth cookie
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`Failed to start session: ${res.statusText}`);
        }

        const data = await res.json();
        
        if (isMounted) {
          sessionStartedRef.current = true;
          // The streamUrl already includes userEmail as a query parameter
          // The player.html will automatically read it and send to Unreal Engine
          setStreamUrl(data.streamUrl);
          console.log("[VRRoom] Session started:", data);
        }
      } catch (err) {
        console.error("[VRRoom] Error starting session:", err);
        if (isMounted) {
          setError(err.message || "Failed to start session");
        }
      }
    }

    startSession();

    // Only cleanup on actual page unload, not on component unmount
    // This prevents stopping the session when React re-renders
    const handleBeforeUnload = () => {
      if (sessionStartedRef.current) {
        // Use sendBeacon for reliable cleanup on page unload
        navigator.sendBeacon(
          "http://localhost:4000/api/session/stop",
          JSON.stringify({})
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      isMounted = false;
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Don't stop session on component unmount - let it persist
      // Session will be cleaned up on page unload or after inactivity
    };
  }, [loading, user]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-slate-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen grid place-items-center text-red-500">
        <div className="text-center">
          <p className="text-xl mb-4">Error: {error}</p>
          <button
            onClick={() => {
              sessionStartedRef.current = false;
              setError(null);
              setStreamUrl(null);
              window.location.reload();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show loading while waiting for stream URL
  if (!streamUrl) {
    return (
      <div className="min-h-screen grid place-items-center text-slate-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Launching VR session…</p>
          <p className="text-sm mt-2 text-slate-400">
            Connecting to dedicated server...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <iframe
        ref={iframeRef}
        src={streamUrl}
        title="Social1 VR Room"
        className="w-[90vw] h-[85vh] rounded-xl border border-white/10"
        allow="camera; microphone; fullscreen; autoplay"
        allowFullScreen
      />
    </div>
  );
}
