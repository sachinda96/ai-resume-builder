import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-brand">
        <span className="sidebar-brand-dot"></span>
        CVAI
      </div>

      <div className="sidebar-section">Main</div>

      <Link className="sidebar-item" to="/dashboard">
        <span className="sidebar-item-icon">⊞</span>
        Dashboard
      </Link>

      <Link className="sidebar-item" to="/dashboard/mycvs">
        <span className="sidebar-item-icon">📋</span>
        My CVs
      </Link>

      <Link className="sidebar-item" to="/dashboard/builder">
        <span className="sidebar-item-icon">✏️</span>
        Create New CV
      </Link>

      <Link className="sidebar-item" to="/dashboard/upload">
        <span className="sidebar-item-icon">📤</span>
        Upload CV
      </Link>

      <div className="sidebar-section">Tools</div>

      <Link className="sidebar-item" to="/dashboard/templates">
        <span className="sidebar-item-icon">🎨</span>
        Templates
      </Link>

      <div className="sidebar-section">Account</div>

      <Link className="sidebar-item" to="/dashboard/profile">
        <span className="sidebar-item-icon">👤</span>
        Profile
      </Link>

      <Link className="sidebar-item" to="/dashboard/settings">
        <span className="sidebar-item-icon">⚙️</span>
        Settings
      </Link>

      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="user-chip-avatar">AM</div>
          <div>
            <div className="user-chip-name">Alex Morgan</div>
            <div className="user-chip-email">alex@example.com</div>
          </div>
        </div>
      </div>

    </div>
  );
}