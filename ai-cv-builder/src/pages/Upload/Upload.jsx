import { useNavigate } from "react-router-dom";

export default function Upload() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Upload your CV</h2>
        <p>Upload an existing CV and let the AI auto-fill your profile.</p>

        <div style={{ margin: "1.5rem 0", textAlign: "center" }}>
          <input type="file" accept=".pdf,.doc,.docx" />
        </div>

        <button className="btn btn-primary" type="button">
          Upload and Continue
        </button>

        <div className="auth-footer">
          Prefer to start from scratch?{' '}
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/')}>Go back</button>
        </div>
      </div>
    </div>
  );
}
