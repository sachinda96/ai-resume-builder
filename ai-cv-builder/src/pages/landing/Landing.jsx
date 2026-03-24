import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

  <div className="hero">
    <div className="hero-badge">✦ AI-Powered Resume Builder</div>

    <h1>
      Build a CV that <span>lands interviews</span>
    </h1>

    <p>
      Create professional, ATS-optimized resumes in minutes using AI.
      Upload your existing CV or start from scratch.
    </p>

    <div className="hero-actions">
      <button
        className="btn btn-primary btn-lg"
        onClick={() => navigate("/login")}
      >
        ⚡ Start Building Free
      </button>

      <button
        className="btn btn-lg"
        style={{
          background: "transparent",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.3)"
        }}
        onClick={() => navigate("/upload")}
      >
        📄 Upload Existing CV
      </button>
    </div>

    <div className="hero-stats">
      <div className="hero-stat">
        <div className="hero-stat-num">50K+</div>
        <div className="hero-stat-lbl">CVs Created</div>
      </div>

      <div className="hero-stat">
        <div className="hero-stat-num">94%</div>
        <div className="hero-stat-lbl">Interview Rate</div>
      </div>

      <div className="hero-stat">
        <div className="hero-stat-num">12+</div>
        <div className="hero-stat-lbl">Templates</div>
      </div>

      <div className="hero-stat">
        <div className="hero-stat-num">$3</div>
        <div className="hero-stat-lbl">Per Download</div>
      </div>
    </div>
  </div>

  <div id="features">
    <div className="section">
      <div className="tag">Features</div>

      <div className="section-title">
        Everything you need to get hired
      </div>

      <div className="section-sub">
        Powerful AI tools that transform your career story
      </div>

      <div className="features-grid">

        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>AI Enhancement</h3>
          <p>
            Let AI improve your bullet points and summaries to be ATS-friendly.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📤</div>
          <h3>Smart Upload</h3>
          <p>
            Upload your existing CV and our AI auto-fills your information.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>Pro Templates</h3>
          <p>
            Choose from professionally designed templates.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💾</div>
          <h3>Auto-Save</h3>
          <p>
            Never lose your work. Everything is saved automatically.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>ATS Scoring</h3>
          <p>
            Real-time ATS compatibility score for your resume.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Instant PDF</h3>
          <p>
            Download your polished resume instantly.
          </p>
        </div>

      </div>
    </div>
  </div>

  <div style={{ background: "var(--brand)" }}>
    <div className="section" style={{ padding: "4rem 2rem" }}>

      <div
        className="tag"
        style={{
          background: "rgba(233,69,96,0.2)",
          color: "#f08090"
        }}
      >
        How it Works
      </div>

      <div
        className="section-title"
        style={{ color: "#fff" }}
      >
        Three steps to your dream job
      </div>

      <div
        className="section-sub"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Get started in minutes
      </div>

      <div className="steps">

        <div className="step">
          <div className="step-num">1</div>
          <h3 style={{ color: "#fff" }}>Input Your Info</h3>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>
            Fill your details or upload a CV.
          </p>
        </div>

        <div className="step">
          <div
            className="step-num"
            style={{ background: "var(--accent)" }}
          >
            2
          </div>
          <h3 style={{ color: "#fff" }}>Enhance with AI</h3>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>
            AI improves your resume automatically.
          </p>
        </div>

        <div className="step">
          <div className="step-num">3</div>
          <h3 style={{ color: "#fff" }}>Download</h3>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>
            Download and apply confidently.
          </p>
        </div>

      </div>
    </div>
  </div>

  <div className="cta-section">

    <h2>Ready to land your dream job?</h2>

    <p>
      Join 50,000+ professionals who've built winning resumes.
    </p>

    <button
      className="btn btn-primary btn-lg"
      onClick={() => navigate("/register")}
    >
      ⚡ Start Building Free — No Credit Card
    </button>

  </div>

</div>
  )
}