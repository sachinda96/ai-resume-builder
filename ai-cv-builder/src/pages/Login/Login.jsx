import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ modal = false }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // 🔥 later replace this with API call
      console.log("Logging in with:", email, password);

      // fake success (for now)
      const isAuthenticated = true;

      if (isAuthenticated) {
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const content = (
    
    <div className="auth-card">

        
      <h2>Welcome back</h2>
      <p>Sign in to continue building your career</p>

      <button className="oauth-btn" type="button">
        Continue with Google
      </button>

      <div className="form-divider">
        <span>or sign in with email</span>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="login-email">
          Email address
        </label>
        <input
          className="form-input"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="login-password">
          Password
        </label>
        <input
          className="form-input"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.25rem" }}>
        <button type="button" className="btn btn-ghost" style={{ fontSize: "0.8rem" }}>
          Forgot password?
        </button>
      </div>

      <button className="btn btn-primary" style={{ width: "100%",textAlignLast: "left" }} type="button" onClick={handleLogin}>
        Sign In
      </button>

      <div className="auth-footer">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => navigate('/register')}
        >
          Sign up free
        </button>
      </div>
    </div>
  );

  if (modal) return content;

  return <div className="auth-page">{content}</div>;
}
