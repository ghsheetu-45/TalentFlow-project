import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  // This function "fetches" the data from your Python Backend
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/profile')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(err => console.log("Backend not connected:", err))
  }, [])

  if (!data) return <div className="loading">Loading Professional Data...</div>

  return (
    <div className="portfolio">
      <header>
        <h1>{data.personal_info.full_name}</h1>
        <p className="subtitle">{data.personal_info.title}</p>
      </header>

      <section className="tech-stack">
        <h3>New Technologies (2025)</h3>
        <div className="tags">
          {data.current_stack_2025.backend.map(tech => <span key={tech}>{tech}</span>)}
          {data.current_stack_2025.frontend.map(tech => <span key={tech}>{tech}</span>)}
        </div>
      </section>

      <section className="experience">
        <h3>Experience</h3>
        <div className="card">
          <h4>{data.professional_experience[0].company}</h4>
          <p>{data.professional_experience[0].role}</p>
          <ul>
            {data.professional_experience[0].achievements.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default App