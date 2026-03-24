import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create your account</h2>
        <p>Start building your professional CV today — free forever</p>

        <button
          className="oauth-btn"
          type="button"
        >
          Sign up with Google
        </button>

        <div className="form-divider">
          <span>or create with email</span>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="register-first">
            First Name
          </label>
          <input id="register-first" className="form-input" placeholder="Alex" />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="register-last">
            Last Name
          </label>
          <input id="register-last" className="form-input" placeholder="Morgan" />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="register-email">
            Email address
          </label>
          <input
            id="register-email"
            className="form-input"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="register-password">
            Password
          </label>
          <input
            id="register-password"
            className="form-input"
            type="password"
            placeholder="Min 8 characters"
          />
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer" }}>
            <input type="checkbox" style={{ marginTop: "2px" }} />
            <span style={{ fontSize: "0.8rem", color: "var(--text2)" }}>
              I agree to the <span style={{ color: "var(--accent)" }}>Terms of Service</span> and <span style={{ color: "var(--accent)" }}>Privacy Policy</span>
            </span>
          </label>
        </div>

        <button className="btn btn-primary" style={{ width: "100%" }} type="button">
          Create Free Account
        </button>

        <div className="auth-footer">
          Already have an account?{' '}
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/login')}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
