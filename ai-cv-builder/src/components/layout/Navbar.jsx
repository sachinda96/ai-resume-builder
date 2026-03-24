import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-brand">
        <Link to="/" className="nav-brand">
          <img
            src={logo}
            alt="CVAI Logo"
            style={{ height: "61px", width: "130px", marginRight: "8px" }}
          />
        </Link>
      </div>

      <div className="nav-actions">
        <Link to="/login">
          <button className="btn btn-ghost">Sign In</button>
        </Link>

        <Link to="/register">
          <button className="btn btn-primary">Get Started</button>
        </Link>
      </div>
    </nav>
  );
}
