import React, { Fragment, useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const defaultProfile = {
  fullName: 'Alex Morgan',
  role: 'Senior Frontend Engineer',
  email: 'alex@example.com',
  phone: '+1 (555) 000-0000',
  linkedin: 'linkedin.com/in/alexmorgan',
  location: 'San Francisco, CA',
  summary:
    'Experienced Frontend Engineer with 6+ years building scalable web applications. Proven track record of delivering high-performance React applications and leading cross-functional teams.',
};

const defaultExperience = [
  {
    id: 'exp-1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp Inc.',
    start: 'Jan 2021',
    end: 'Present',
    description:
      'Led development of a React-based design system used across 5 products.\nReduced page load time by 40% through code splitting and lazy loading.\nMentored 3 junior engineers and conducted weekly code reviews.',
  },
  {
    id: 'exp-2',
    title: 'Frontend Developer',
    company: 'StartupXYZ',
    start: 'Jun 2018',
    end: 'Dec 2020',
    description: 'Built and maintained Vue.js SPA with 50K monthly users. Integrated REST APIs.',
  },
];

const defaultEducation = [
  {
    id: 'edu-1',
    degree: 'B.Sc. Computer Science',
    school: 'State University',
    years: '2014 - 2018',
  },
];

const defaultSkills = ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Node.js', 'GraphQL'];

const templates = [
  { id: 'template-1', name: 'Executive Dark', description: 'Dark header + accent highlights' },
  { id: 'template-2', name: 'Modern Light', description: 'Clean light layout with blue accents' },
  { id: 'template-3', name: 'Bold Accent', description: 'Strong accent color and large typography' },
  { id: 'template-4', name: 'Minimal', description: 'Minimal spacing and soft gray tones' },
  { id: 'template-5', name: 'Classic', description: 'Traditional layout with subtle borders' },
];

const stepConfig = [
  { id: 1, label: 'Info' },
  { id: 2, label: 'Summary' },
  { id: 3, label: 'Experience' },
  { id: 4, label: 'Education' },
  { id: 5, label: 'Skills' },
  { id: 6, label: 'More' },
];

export default function CvBuilder() {
  const [activeStep, setActiveStep] = useState(3);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [profile, setProfile] = useState(defaultProfile);
  const [experience, setExperience] = useState(defaultExperience);
  const [education, setEducation] = useState(defaultEducation);
  const [skills, setSkills] = useState(defaultSkills);
  const [newSkill, setNewSkill] = useState('');
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const templateParam = searchParams.get('template');
    if (templateParam && templates.find(t => t.id === templateParam)) {
      setSelectedTemplate(templateParam);
    }
  }, [searchParams]);

  const updateProfile = (key) => (event) => {
    setProfile((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const updateExperience = (id, key) => (event) => {
    setExperience((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: event.target.value } : item)),
    );
  };

  const addExperience = () => {
    setExperience((prev) => [
      ...prev,
      {
        id: `exp-${Date.now()}`,
        title: '',
        company: '',
        start: '',
        end: '',
        description: '',
      },
    ]);
    showToast('New experience entry added', 'success');
  };

  const removeExperience = (id) => {
    setExperience((prev) => prev.filter((item) => item.id !== id));
    showToast('Experience entry removed', 'success');
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    if (skills.includes(trimmed)) {
      showToast('Skill already added', 'error');
      return;
    }
    setSkills((prev) => [...prev, trimmed]);
    setNewSkill('');
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 2500);
  };

  const downloadCv = () => {
    const previewEl = document.getElementById('cv-preview');
    if (!previewEl) return;

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

    const tmpl = templateStyles[selectedTemplate] || templateStyles['template-1'];

    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${profile.fullName} - CV</title>
          <style>
            body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Segoe UI Emoji', 'Segoe UI Symbol', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; background: #f3f3f3; }
            .cv-preview-paper { background: #fff; width: 100%; max-width: 800px; margin: 2rem auto; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); overflow: hidden; }
            .cv-preview-header { background: ${tmpl.headerBg}; padding: 2rem 2rem 1.5rem; }
            .cv-name { font-family: 'Syne', sans-serif; font-size: 1.6rem; font-weight: 800; color: ${tmpl.headerText}; margin: 0; }
            .cv-role { font-size: 0.9rem; color: rgba(255,255,255,0.7); margin-top: 3px; }
            .cv-contact { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 1rem; }
            .cv-contact-item { font-size: 0.75rem; color: ${tmpl.contactColor}; display: flex; align-items: center; gap: 6px; }
            .cv-preview-body { padding: 1.5rem; }
            .cv-section { margin-bottom: 1.5rem; }
            .cv-section-title { font-family: 'Syne', sans-serif; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: ${tmpl.sectionTitle}; border-bottom: 1px solid rgba(26,26,46,0.1); padding-bottom: 4px; margin-bottom: 0.75rem; }
            .cv-section-body { font-size: 0.8rem; color: rgba(26,26,46,0.7); line-height: 1.6; }
            .cv-exp { margin-bottom: 0.875rem; }
            .cv-exp-title { font-weight: 600; font-size: 0.85rem; color: rgba(26,26,46,0.9); }
            .cv-exp-co { font-size: 0.78rem; color: rgba(90,90,114,0.9); }
            .cv-exp-date { font-size: 0.72rem; color: rgba(153,153,176,0.8); margin-bottom: 4px; }
            .cv-bullet { display: flex; gap: 6px; font-size: 0.78rem; color: rgba(90,90,114,0.9); margin-bottom: 3px; }
            .cv-bullet::before { content: '${tmpl.bullet}'; color: ${tmpl.bulletColor}; flex-shrink: 0; }
            .cv-skill-tags { display: flex; flex-wrap: wrap; gap: 5px; }
            .cv-skill-tag { background: rgba(26,26,46,0.08); border-radius: 100px; padding: 3px 10px; font-size: 0.72rem; color: rgba(26,26,46,0.8); }
          </style>
        </head>
        <body>${previewEl.innerHTML}</body>
      </html>
    `;

    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <>
            <div className="form-section-title">👤 Basic Info</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" value={profile.fullName} onChange={updateProfile('fullName')} />
              </div>
              <div className="form-group">
                <label className="form-label">Role / Title</label>
                <input className="form-input" value={profile.role} onChange={updateProfile('role')} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" value={profile.email} onChange={updateProfile('email')} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" value={profile.phone} onChange={updateProfile('phone')} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">LinkedIn</label>
                <input className="form-input" value={profile.linkedin} onChange={updateProfile('linkedin')} />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input className="form-input" value={profile.location} onChange={updateProfile('location')} />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="form-section-title">📝 Professional Summary</div>
            <div className="form-group form-row full">
              <label className="form-label">Summary</label>
              <textarea
                className="form-input"
                rows={5}
                value={profile.summary}
                onChange={updateProfile('summary')}
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="form-section-title">💼 Work Experience</div>
            {experience.map((item) => (
              <div key={item.id} className="section-entry" id={item.id}>
                <button className="entry-remove" onClick={() => removeExperience(item.id)}>
                  ✕
                </button>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Job Title</label>
                    <input className="form-input" value={item.title} onChange={updateExperience(item.id, 'title')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input className="form-input" value={item.company} onChange={updateExperience(item.id, 'company')} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input className="form-input" value={item.start} onChange={updateExperience(item.id, 'start')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input className="form-input" value={item.end} onChange={updateExperience(item.id, 'end')} />
                  </div>
                </div>
                <div className="form-group form-row full">
                  <label className="form-label">Description / Achievements</label>
                  <textarea
                    className="form-input"
                    rows={4}
                    value={item.description}
                    onChange={updateExperience(item.id, 'description')}
                  />
                </div>
              </div>
            ))}
            <button className="add-entry-btn" onClick={addExperience} type="button">
              + Add Experience
            </button>
          </>
        );
      case 4:
        return (
          <>
            <div className="form-section-title">🎓 Education</div>
            {education.map((item) => (
              <div key={item.id} className="section-entry" id={item.id}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Degree</label>
                    <input
                      className="form-input"
                      value={item.degree}
                      onChange={(e) =>
                        setEducation((prev) =>
                          prev.map((edu) => (edu.id === item.id ? { ...edu, degree: e.target.value } : edu)),
                        )
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">School</label>
                    <input
                      className="form-input"
                      value={item.school}
                      onChange={(e) =>
                        setEducation((prev) =>
                          prev.map((edu) => (edu.id === item.id ? { ...edu, school: e.target.value } : edu)),
                        )
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Years</label>
                    <input
                      className="form-input"
                      value={item.years}
                      onChange={(e) =>
                        setEducation((prev) =>
                          prev.map((edu) => (edu.id === item.id ? { ...edu, years: e.target.value } : edu)),
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        );
      case 5:
        return (
          <>
            <div className="form-section-title">🧠 Skills</div>
            <div className="form-row">
              <div className="form-group" style={{ flex: 1, minWidth: 0 }}>
                <label className="form-label">Add Skill</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    className="form-input"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g. React"
                  />
                  <button className="btn btn-primary" onClick={addSkill} type="button">
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="form-row" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map((skill) => (
                <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="cv-skill-tag" style={{ cursor: 'default' }}>
                    {skill}
                  </span>
                  <button
                    className="btn btn-sm btn-ghost"
                    style={{ padding: '4px 8px' }}
                    onClick={() => removeSkill(skill)}
                    type="button"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </>
        );
      case 6:
        return (
          <>
            <div className="form-section-title">⚙️ More</div>
            <p style={{ color: 'var(--text2)', fontSize: '0.85rem' }}>
              This section is a placeholder for additional settings like template selection, privacy, export options, and more.
            </p>
            <button className="btn btn-ghost" onClick={() => showToast('More section is not implemented yet', 'error')}>
              Explore more options
            </button>
          </>
        );
      default:
        return null;
    }
  };

  const stepButton = (step) => {
    const isActive = step === activeStep;

    return (
      <div
        className="step-btn"
        onClick={() => setActiveStep(step.id)}
        style={{ cursor: 'pointer' }}
      >
        <div className={`step-circle ${isActive ? 'active' : ''}`}>{step.id}</div>
        <div className={`step-lbl ${isActive ? 'active' : ''}`}>{step.label}</div>
      </div>
    );
  };

  const previewExperiences = useMemo(() => {
    return experience.filter((exp) => exp.title || exp.company || exp.description);
  }, [experience]);

  return (
    <div className="builder-layout" style={{ marginLeft: 0 }}>
      <div className="builder-form">
        <div className="builder-header">
          <div>
            <h2>Software Engineer CV</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>Template:</span>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--text)',
                  fontSize: '0.75rem',
                }}
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => navigate('/dashboard/templates')}
                type="button"
              >
                Browse Templates
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="save-status">
              <div className="save-dot" /> Saved
            </div>
            <button className="btn btn-sm btn-primary" onClick={downloadCv} type="button">
              ↓ Download
            </button>
          </div>
        </div>

        <div className="stepper">
          {stepConfig.map((step, index) => (
            <Fragment key={step.id}>
              {stepButton(step)}
              {index < stepConfig.length - 1 && (
                <div className={`step-connector ${step.id < activeStep ? 'done' : ''}`} />
              )}
            </Fragment>
          ))}
        </div>

        <div className="form-section">{renderStepContent()}</div>

        <div className="form-actions">
          <button
            className="btn btn-ghost"
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            type="button"
          >
            ← Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setActiveStep((prev) => Math.min(6, prev + 1))}
            type="button"
          >
            Next: {stepConfig[Math.min(activeStep, 5)].label} →
          </button>
        </div>
      </div>

      <div className="builder-preview">
        <div style={{ width: '100%', maxWidth: '540px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>Live Preview</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-sm btn-secondary" onClick={() => showToast('Preview copied', 'success')} type="button">
                Copy
              </button>
              <button className="btn btn-sm btn-primary" onClick={downloadCv} type="button">
                ↓ Download
              </button>
            </div>
          </div>
          <div className={`cv-preview-paper ${selectedTemplate}`} id="cv-preview">
            <div className="cv-preview-header">
              <div className="cv-name">{profile.fullName}</div>
              <div className="cv-role">{profile.role}</div>
              <div className="cv-contact">
                <div className="cv-contact-item">✉️ {profile.email}</div>
                <div className="cv-contact-item">📱 {profile.phone}</div>
                <div className="cv-contact-item">🔗 {profile.linkedin}</div>
                <div className="cv-contact-item">📍 {profile.location}</div>
              </div>
            </div>
            <div className="cv-preview-body">
              <div className="cv-section">
                <div className="cv-section-title">Professional Summary</div>
                <div className="cv-section-body">{profile.summary}</div>
              </div>

              <div className="cv-section">
                <div className="cv-section-title">Work Experience</div>
                <div className="cv-section-body">
                  {previewExperiences.map((exp) => (
                    <div key={exp.id} className="cv-exp">
                      <div className="cv-exp-title">{exp.title}</div>
                      <div className="cv-exp-co">
                        {exp.company} � <span className="cv-exp-date">{exp.start} � {exp.end}</span>
                      </div>
                      {exp.description.split('\n').map((line, idx) => (
                        <div key={idx} className="cv-bullet">
                          {line}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="cv-section">
                <div className="cv-section-title">Education</div>
                <div className="cv-section-body">
                  {education.map((edu) => (
                    <div key={edu.id} className="cv-exp">
                      <div className="cv-exp-title">{edu.degree}</div>
                      <div className="cv-exp-co">
                        {edu.school} � <span className="cv-exp-date">{edu.years}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cv-section">
                <div className="cv-section-title">Skills</div>
                <div className="cv-section-body">
                  <div className="cv-skill-tags">
                    {skills.map((skill) => (
                      <div key={skill} className="cv-skill-tag">
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

      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>{toast.message}</div>
        </div>
      )}
    </div>
  );
}

