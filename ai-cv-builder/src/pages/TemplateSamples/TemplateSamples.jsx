import React from 'react';
import { useNavigate } from 'react-router-dom';

const templates = [
  { id: 'template-1', name: 'Executive Dark', description: 'Dark header + accent highlights' },
  { id: 'template-2', name: 'Modern Light', description: 'Clean light layout with blue accents' },
  { id: 'template-3', name: 'Bold Accent', description: 'Strong accent color and large typography' },
  { id: 'template-4', name: 'Minimal', description: 'Minimal spacing and soft gray tones' },
  { id: 'template-5', name: 'Classic', description: 'Traditional layout with subtle borders' },
];

const sampleProfile = {
  fullName: 'Alex Morgan',
  role: 'Senior Frontend Engineer',
  email: 'alex@example.com',
  phone: '+1 (555) 000-0000',
  linkedin: 'linkedin.com/in/alexmorgan',
  location: 'San Francisco, CA',
  summary: 'Experienced Frontend Engineer with 6+ years building scalable web applications.',
};

const sampleExperience = [
  {
    id: 'exp-1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp Inc.',
    start: 'Jan 2021',
    end: 'Present',
    description: 'Led development of a React-based design system.\nReduced page load time by 40%.',
  },
];

const sampleEducation = [
  {
    id: 'edu-1',
    degree: 'B.Sc. Computer Science',
    school: 'State University',
    years: '2014 - 2018',
  },
];

const sampleSkills = ['React', 'TypeScript', 'JavaScript'];

const templateStyles = {
  'template-1': {
    headerBg: '#1a1a2e',
    headerText: '#fff',
    sectionTitle: '#e94560',
    bullet: '▸',
    bulletColor: '#e94560',
    contactColor: 'rgba(255,255,255,0.6)',
  },
  'template-2': {
    headerBg: '#f4f6fb',
    headerText: '#1a1a2e',
    sectionTitle: '#0f3460',
    bullet: '▹',
    bulletColor: '#0f3460',
    contactColor: 'rgba(26,26,46,0.75)',
  },
  'template-3': {
    headerBg: 'linear-gradient(135deg, #1e3a8a, #9333ea)',
    headerText: '#fff',
    sectionTitle: '#ffb703',
    bullet: '•',
    bulletColor: '#ffb703',
    contactColor: 'rgba(255,255,255,0.7)',
  },
  'template-4': {
    headerBg: '#ffffff',
    headerText: '#1a1a2e',
    sectionTitle: '#5a5a72',
    bullet: '▹',
    bulletColor: '#5a5a72',
    contactColor: 'rgba(26,26,46,0.75)',
  },
  'template-5': {
    headerBg: '#0f3460',
    headerText: '#fff',
    sectionTitle: '#f5a623',
    bullet: '▸',
    bulletColor: '#f5a623',
    contactColor: 'rgba(255,255,255,0.7)',
  },
};

export default function TemplateSamples() {
  const navigate = useNavigate();

  const selectTemplate = (templateId) => {
    navigate(`/dashboard/builder?template=${templateId}`);
  };

  const renderTemplatePreview = (template) => {
    const tmpl = templateStyles[template.id] || templateStyles['template-1'];

    return (
      <div key={template.id} className="template-sample">
        <div className="template-info">
          <h3>{template.name}</h3>
          <p>{template.description}</p>
          <button
            className="btn btn-primary"
            onClick={() => selectTemplate(template.id)}
          >
            Select Template
          </button>
        </div>
        <div className="template-preview">
          <div
            className="cv-preview-paper"
            style={{
              background: '#fff',
              width: '100%',
              maxWidth: '400px',
              margin: '0 auto',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              fontSize: '0.7rem',
            }}
          >
            <div
              className="cv-preview-header"
              style={{
                background: tmpl.headerBg,
                padding: '1rem',
                color: tmpl.headerText,
              }}
            >
              <div className="cv-name" style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>
                {sampleProfile.fullName}
              </div>
              <div className="cv-role" style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '2px' }}>
                {sampleProfile.role}
              </div>
              <div className="cv-contact" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '0.5rem' }}>
                <div className="cv-contact-item" style={{ fontSize: '0.6rem', color: tmpl.contactColor }}>
                  ✉️ {sampleProfile.email}
                </div>
                <div className="cv-contact-item" style={{ fontSize: '0.6rem', color: tmpl.contactColor }}>
                  📱 {sampleProfile.phone}
                </div>
              </div>
            </div>
            <div className="cv-preview-body" style={{ padding: '1rem' }}>
              <div className="cv-section" style={{ marginBottom: '1rem' }}>
                <div
                  className="cv-section-title"
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: tmpl.sectionTitle,
                    borderBottom: '1px solid rgba(26,26,46,0.1)',
                    paddingBottom: '2px',
                    marginBottom: '0.5rem',
                  }}
                >
                  Professional Summary
                </div>
                <div className="cv-section-body" style={{ fontSize: '0.65rem', color: 'rgba(26,26,46,0.7)', lineHeight: 1.4 }}>
                  {sampleProfile.summary}
                </div>
              </div>

              <div className="cv-section" style={{ marginBottom: '1rem' }}>
                <div
                  className="cv-section-title"
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: tmpl.sectionTitle,
                    borderBottom: '1px solid rgba(26,26,46,0.1)',
                    paddingBottom: '2px',
                    marginBottom: '0.5rem',
                  }}
                >
                  Work Experience
                </div>
                <div className="cv-section-body">
                  {sampleExperience.map((exp) => (
                    <div key={exp.id} className="cv-exp" style={{ marginBottom: '0.5rem' }}>
                      <div className="cv-exp-title" style={{ fontWeight: 'bold', fontSize: '0.7rem', color: 'rgba(26,26,46,0.9)' }}>
                        {exp.title}
                      </div>
                      <div className="cv-exp-co" style={{ fontSize: '0.65rem', color: 'rgba(90,90,114,0.9)' }}>
                        {exp.company} • <span className="cv-exp-date" style={{ fontSize: '0.6rem', color: 'rgba(153,153,176,0.8)' }}>
                          {exp.start} • {exp.end}
                        </span>
                      </div>
                      {exp.description.split('\n').map((line, idx) => (
                        <div key={idx} className="cv-bullet" style={{ display: 'flex', gap: '4px', fontSize: '0.65rem', color: 'rgba(90,90,114,0.9)', marginBottom: '2px' }}>
                          <span style={{ color: tmpl.bulletColor }}>{tmpl.bullet}</span> {line}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="cv-section">
                <div
                  className="cv-section-title"
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: tmpl.sectionTitle,
                    borderBottom: '1px solid rgba(26,26,46,0.1)',
                    paddingBottom: '2px',
                    marginBottom: '0.5rem',
                  }}
                >
                  Skills
                </div>
                <div className="cv-section-body">
                  <div className="cv-skill-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {sampleSkills.map((skill) => (
                      <div
                        key={skill}
                        className="cv-skill-tag"
                        style={{
                          background: 'rgba(26,26,46,0.08)',
                          borderRadius: '50px',
                          padding: '2px 8px',
                          fontSize: '0.6rem',
                          color: 'rgba(26,26,46,0.8)',
                        }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Choose a Template</h1>
        <p>Select a template that best represents your professional style</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
        {templates.map(renderTemplatePreview)}
      </div>
    </div>
  );
}