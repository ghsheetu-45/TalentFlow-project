import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [profile, setProfile] = useState(null);

  // Your actual data to show if the backend is offline
  const fallbackData = {
    personal_info: { full_name: "Dudes Co", title: "Full Stack Developer & AI Integrator" },
    current_stack_2025: { 
      tech: ["FastAPI", "Python 3.12", "RESTful APIs", "React.js", "Tailwind CSS", "Vite"] 
    },
    professional_experience: [{
      company: "Pentagon Spears",
      role: "Full Stack Developer Intern",
      achievements: [
        "Developed scalable API endpoints for internal training modules.",
        "Optimized database queries reducing load time by 20%."
      ]
    }]
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/profile')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(() => setProfile(fallbackData)); // Loads fallback if backend is off
  }, []);

  if (!profile) return <div className="loading">Loading Portfolio...</div>;

  return (
    <div className="portfolio">
      <h1>{profile.personal_info.full_name}</h1>
      <p className="subtitle">{profile.personal_info.title}</p>
      
      <div className="tech-stack">
        <h3>New Technologies (2025)</h3>
        <div className="tags">
          {profile.current_stack_2025.tech.map(t => <span key={t}>{t}</span>)}
        </div>
      </div>

      <div className="experience">
        <h3>Experience</h3>
        {profile.professional_experience.map(exp => (
          <div key={exp.company} className="card">
            <h4>{exp.company}</h4>
            <p>{exp.role}</p>
            <ul>
              {exp.achievements.map(a => <li key={a}>{a}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;