import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.jsx"; // should render an <Outlet />
import Home from "./pages/Home.jsx";
import SignIn from "./pages/Signin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import Profile from "./pages/Profile.jsx";
import Questions from "./pages/Questions.jsx";
import VRRoom from "./pages/VrRoom.jsx";
import PrivacyPolicy  from "./pages/PrivacyPolicy.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<App />}>
              {/* "/" renders Home */}
              <Route index element={<Home />} />
              {/* dedicated sign-in page */}
              <Route path="signin" element={<SignIn />} />
              {/* protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />

                <Route path="profile" element={<Profile />} />
                <Route path="preference" element={<Questions />} />
              </Route>
              {/* optional: also support /home -> Home */}
              <Route path="home" element={<Home />} />
              <Route path="vrroom" element={<VRRoom />} />
              <Route path="about" element={<About />} />
              <Route path="contactus" element={<Contact />} />
              <Route path="privacypolicy" element={<PrivacyPolicy/>} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter> 
    </GoogleOAuthProvider>
  </React.StrictMode>
);
