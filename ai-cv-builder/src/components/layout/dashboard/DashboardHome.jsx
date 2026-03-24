import { useNavigate } from "react-router-dom";

export default function DashboardHome() {
  const navigate = useNavigate();

  const goTo = (path) => () => navigate(path);

  const handleDownload = () => {
    // TODO: Show a payment/download modal
    alert("Download is not implemented yet.");
  };

  const handleAIEnhance = () => {
    // TODO: Show an AI enhancement modal
    alert("AI Enhance is not implemented yet.");
  };

  return (
    <>
     
      <div className="page-header">
        <h1>Good morning, Alex 👋</h1>
        <p>Here's an overview of your CV activity</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-label">Total CVs</div><div className="stat-value">3</div><div className="stat-sub">2 active, 1 draft</div></div>
        <div className="stat-card"><div className="stat-label">Downloads</div><div className="stat-value">7</div><div className="stat-badge up">+2 this month</div></div>
        <div className="stat-card"><div className="stat-label">AI Enhancements</div><div className="stat-value">24</div><div className="stat-badge up">+8 this week</div></div>
        <div className="stat-card"><div className="stat-label">ATS Score</div><div className="stat-value">87%</div><div className="stat-badge up">Good</div></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <div className="section-card">
          <div className="section-card-header">
            <span className="section-card-title">Recent CVs</span>
            <button className="btn btn-sm btn-ghost" onClick={goTo("/dashboard/mycvs")}>View All</button>
          </div>
          <div className="cv-grid" style={{ padding: "1.25rem" }}>
            <div className="cv-card" onClick={goTo("/dashboard/builder")}>
              <div className="cv-card-preview"><div className="cv-card-mini"><div className="cv-card-mini-header"><div className="cv-mini-avatar"></div><div className="cv-mini-lines"><div className="cv-mini-line w70"></div><div className="cv-mini-line w50"></div></div></div><div className="cv-mini-line"></div><div className="cv-mini-line w70"></div></div></div>
              <div className="cv-card-body">
                <div className="cv-card-name">Software Engineer CV</div>
                <div className="cv-card-date">Edited 2 hours ago</div>
              </div>
              <div className="cv-card-actions">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate("/dashboard/builder");
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDownload();
                  }}
                >
                  Download
                </button>
              </div>
            </div>
            <div className="cv-card" onClick={goTo("/dashboard/builder")}>
            <div className="cv-card-preview" style={{ background: "linear-gradient(135deg,#e8f4f8,#d1ecf7)" }}>
              <div className="cv-card-mini">
                <div className="cv-card-mini-header">
                  <div className="cv-mini-avatar" style={{ background: "#0f3460" }}></div>
                  <div className="cv-mini-lines">
                    <div className="cv-mini-line w70"></div>
                    <div className="cv-mini-line w50"></div>
                  </div>
                </div>
                <div className="cv-mini-line"></div>
                <div className="cv-mini-line w70"></div>
              </div>
            </div>
              <div className="cv-card-body">
                <div className="cv-card-name">Product Manager CV</div>
                <div className="cv-card-date">Edited yesterday</div>
              </div>
              <div className="cv-card-actions">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate("/dashboard/builder");
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDownload();
                  }}
                >
                  Download
                </button>
              </div>
            </div>
            <div className="cv-add-card" onClick={goTo("/dashboard/builder")}><div className="cv-add-icon">+</div><div className="cv-add-label">Create New CV</div></div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="section-card">
            <div className="section-card-header"><span className="section-card-title">Quick Actions</span></div>
            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={goTo("/dashboard/builder")}>✏️ Create New CV</button>
              <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }} onClick={goTo("/dashboard/upload")}>📤 Upload CV</button>
              <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={goTo("/dashboard/templates")}>🎨 Browse Templates</button>
              <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={handleAIEnhance}>🤖 AI Enhance</button>
            </div>
          </div>
          <div className="section-card">
            <div className="section-card-header"><span className="section-card-title">Download History</span></div>
            <div style={{ padding: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
                  <span>SE CV v3.pdf</span>
                  <span style={{ color: "var(--text3)" }}>Jan 14</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
                  <span>PM CV v1.pdf</span>
                  <span style={{ color: "var(--text3)" }}>Jan 10</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
                  <span>SE CV v2.pdf</span>
                  <span style={{ color: "var(--text3)" }}>Jan 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </>
  );
}