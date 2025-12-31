from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

# 1. Initialize the application
app = FastAPI(title="TalentFlow Professional API", version="1.0.0")

# 2. Setup CORS (This allows your React Frontend to talk to this Backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Your Professional Data Object
# We frame your internship and "New Tech" skills here
my_profile = {
    "personal_info": {
        "full_name": "Sheetal",
        "title": "Full Stack Developer & AI Integrator",
        "location": "India",
        "graduated": "June 2025"
    },
    "professional_experience": [
        {
            "company": "Pentagon Space",
            "role": "Full Stack Developer Intern",
            "duration": "June 2025 - Oct 2025",
            "stack": ["Python", "Django", "PostgreSQL"],
            "achievements": [
                "Developed scalable API endpoints for internal training modules.",
                "Optimized database queries reducing load time by 20%."
            ]
        }
    ],
    "current_stack_2025": {
        "backend": ["FastAPI", "Python 3.12", "RESTful APIs"],
        "frontend": ["React.js", "Tailwind CSS", "Vite"],
        "devops": ["Docker", "Git", "GitHub Actions"]
    },
    "system_status": "Active and searching for new opportunities"
}

# 4. Create the API Routes (Endpoints)
@app.get("/")
def home():
    """Welcome route to check if server is alive"""
    return {
        "status": "Online",
        "server_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "message": "Welcome to TalentFlow API"
    }

@app.get("/api/profile")
def get_profile():
    """Returns your professional profile data"""
    return my_profile

@app.get("/api/skills")
def get_skills():
    """Returns the list of current technologies you are working on"""
    return my_profile["current_stack_2025"]