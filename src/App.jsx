import { Outlet, Link } from "react-router-dom";

export default function App() {
  // optional layout shell (header/nav/footer). Keep it simple for now.
  return (
    <div>
      {/* Example: remove if not needed */}
      {/* <nav style={{ padding: "1rem", background: "#111" }}>
        <Link to="/" style={{ color: "white", marginRight: 10 }}>Home</Link>
        <Link to="/about" style={{ color: "white", marginRight: 10 }}>About</Link>
        <Link to="/contact" style={{ color: "white" }}>Contact</Link>
      </nav> */}

      <Outlet />
    </div>
  );
}
