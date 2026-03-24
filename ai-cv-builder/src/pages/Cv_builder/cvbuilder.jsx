import React, { Fragment, useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const defaultProfile = {
  fullName: '',
  role: '',
  email: '',
  phone: '',
  linkedin: '',
  location: '',
  summary: '',
};

const defaultExperience = [
  {
    id: 'exp-1',
    title: '',
    company: '',
    start: '',
    end: '',
    description: '',
  },
];

const defaultEducation = [
  {
    id: 'edu-1',
    degree: '',
    school: '',
    years: '',
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
  const [activeStep, setActiveStep] = useState(1);
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

  const enhanceWithAI = (section, id) => {
    showToast(`Enhance with AI triggered for ${section}${id ? ` (id: ${id})` : ''}`, 'success');
    // TODO: integrate with AI summary/experience API for text rewrite suggestions.
  };

  const downloadCv = async () => {
    const previewEl = document.getElementById('cv-preview');
    if (!previewEl) {
      showToast('CV preview not available for download', 'error');
      return;
    }

    try {
      showToast('Preparing download...', 'success');
      const canvas = await html2canvas(previewEl, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'mm', 'a4');

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 0;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 2 * margin;

      while (heightLeft > 0) {
        position = -(imgHeight - (pageHeight - 2 * margin));
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 2 * margin;
      }

      pdf.save(`${profile.fullName.replace(/\s+/g, '_')}_CV.pdf`);
      showToast('Download started', 'success');
    } catch (error) {
      console.error('Download CV failed', error);
      showToast('Download failed, please try again', 'error');
    }
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
                <input
                  className="form-input"
                  value={profile.fullName}
                  onChange={updateProfile('fullName')}
                  placeholder="e.g. Alex Morgan"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Role / Title</label>
                <input
                  className="form-input"
                  value={profile.role}
                  onChange={updateProfile('role')}
                  placeholder="e.g. Senior Frontend Engineer"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  value={profile.email}
                  onChange={updateProfile('email')}
                  placeholder="e.g. alex@example.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  className="form-input"
                  value={profile.phone}
                  onChange={updateProfile('phone')}
                  placeholder="e.g. +1 (555) 000-0000"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">LinkedIn</label>
                <input
                  className="form-input"
                  value={profile.linkedin}
                  onChange={updateProfile('linkedin')}
                  placeholder="e.g. linkedin.com/in/alexmorgan"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  className="form-input"
                  value={profile.location}
                  onChange={updateProfile('location')}
                  placeholder="e.g. San Francisco, CA"
                />
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
                  placeholder="Write a short professional summary, e.g. 6+ years building reactive front-end apps..."
                />
              </div>
              <button className="btn btn-sm btn-secondary" onClick={() => enhanceWithAI('summary')} type="button">
                Enhance with AI
              </button>
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
                    placeholder="Describe your achievement and responsibilities. Use bullet-style sentences for readability."
                  />
                </div>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => enhanceWithAI('experience', item.id)}
                  type="button"
                >
                  Enhance with AI
                </button>
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
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="save-status">
              <div className="save-dot" /> Saved
            </div>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => {
                const currentIndex = templates.findIndex((t) => t.id === selectedTemplate);
                const nextTemplate = templates[(currentIndex + 1) % templates.length];
                setSelectedTemplate(nextTemplate.id);
                showToast(`Template changed to ${nextTemplate.name}`, 'success');
              }}
              type="button"
            >
              Change Template
            </button>
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
              <button className="btn btn-sm btn-ghost" onClick={() => navigate('/dashboard/templates')} type="button">
                Browse Templates
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

