from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'

# ============================================================
# YOUR REAL PORTFOLIO DATA
# ============================================================
PORTFOLIO = {
    "personal": {
        "name": "Taniadeep Kaur",
        "title": "Python Developer | BCA Student",
        "bio": "I'm a passionate Python developer with a BCA degree from Mata Gujri College. I love building web applications, exploring AI, and creating solutions that make a difference. Currently focused on becoming a full-stack developer and AI engineer.",
        "email": "taniamehra2006@gmail.com",
        "github": "https://github.com/taniamehra006",
        "linkedin": "https://www.linkedin.com/in/tania-mehra-aab72641a/",
        "location": "Punjab, India",
        "avatar": "👩‍💻"
    },
    "skills": [
        {"name": "Python", "level": 85, "icon": "🐍", "description": "Strong foundation in Python programming, OOP, and problem-solving"},
        {"name": "Flask", "level": 70, "icon": "🌐", "description": "Building web applications with Flask framework"},
        {"name": "HTML & CSS", "level": 80, "icon": "🎨", "description": "Responsive and modern web design"},
        {"name": "JavaScript", "level": 65, "icon": "⚡", "description": "Interactive frontend development"},
        {"name": "SQL", "level": 60, "icon": "🗄️", "description": "Database management with SQLite and MySQL"},
        {"name": "Git & GitHub", "level": 75, "icon": "🔧", "description": "Version control and collaboration"},
        {"name": "Data Science", "level": 55, "icon": "📊", "description": "Pandas, NumPy, data visualization"},
        {"name": "Problem Solving", "level": 70, "icon": "🧩", "description": "Analytical thinking and algorithm design"}
    ],
    "projects": [
        {
            "id": 1,
            "title": "Smart Student Planner",
            "description": "AI-powered study management system with task tracking, calendar, notes, and analytics. Built with Flask and SQLite.",
            "technologies": ["Python", "Flask", "SQLite", "JavaScript", "CSS"],
            "github": "https://github.com/taniamehra006/smart-student-planner",
            "live": "#",
            "image": "📚",
            "category": "Web Development"
        },
        {
            "id": 2,
            "title": "Personal Portfolio Website",
            "description": "Modern, responsive portfolio website showcasing my skills, projects, and achievements. Built with Flask.",
            "technologies": ["Python", "Flask", "HTML", "CSS", "JavaScript"],
            "github": "https://github.com/taniamehra006/portfolio",
            "live": "#",
            "image": "💼",
            "category": "Web Development"
        },
        {
            "id": 3,
            "title": "Data Analysis Dashboard",
            "description": "Interactive dashboard for data visualization and analysis using Pandas and Matplotlib.",
            "technologies": ["Python", "Pandas", "Matplotlib", "Seaborn"],
            "github": "https://github.com/taniamehra006/data-dashboard",
            "live": "#",
            "image": "📊",
            "category": "Data Science"
        },
        {
            "id": 4,
            "title": "AI Chatbot Project",
            "description": "Simple AI chatbot built with Python and natural language processing (NLP) libraries.",
            "technologies": ["Python", "NLTK", "Flask", "JavaScript"],
            "github": "https://github.com/taniamehra006/ai-chatbot",
            "live": "#",
            "image": "🤖",
            "category": "Machine Learning"
        }
    ],
    "experience": [
        {
            "company": "Fresher / Student",
            "role": "BCA Student & Python Developer",
            "period": "2023 - 2026",
            "description": "Currently pursuing BCA from Mata Gujri College. Passionate about Python development, building web applications, and exploring AI technologies.",
            "technologies": ["Python", "Flask", "HTML", "CSS", "JavaScript", "SQL"]
        }
    ],
    "education": [
        {
            "degree": "BCA (Bachelor of Computer Applications)",
            "school": "Mata Gujri College",
            "year": "2023 - 2026",
            "description": "Currently studying Computer Applications with focus on programming, web development, and AI."
        }
    ],
    "achievements": [
        "🚀 Built 4+ Python projects including Smart Student Planner",
        "📜 Completed Python programming certification",
        "⭐ Active GitHub contributor",
        "🎯 Member of college coding club",
        "📚 Learning AI and Machine Learning"
    ],
    "certifications": [
        "Python Programming - (In Progress)",
        "Web Development with Flask - (In Progress)",
        "Git & GitHub Fundamentals"
    ]
}

# ============================================================
# ROUTES
# ============================================================

@app.route('/')
def home():
    return render_template('index.html', portfolio=PORTFOLIO)

@app.route('/projects')
def projects():
    return render_template('projects.html', portfolio=PORTFOLIO)

@app.route('/skills')
def skills():
    return render_template('skills.html', portfolio=PORTFOLIO)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        print(f"📩 New message from {name} ({email}): {message}")
        return jsonify({"success": True, "message": "Thank you for your message! I'll get back to you soon."})
    return render_template('contact.html', portfolio=PORTFOLIO)

@app.route('/project/<int:project_id>')
def project_detail(project_id):
    project = None
    for p in PORTFOLIO['projects']:
        if p['id'] == project_id:
            project = p
            break
    if not project:
        return "Project not found", 404
    return render_template('project_detail.html', project=project, portfolio=PORTFOLIO)

if __name__ == '__main__':
    print("🚀 Portfolio Website Starting...")
    print(f"👩‍💻 Welcome, {PORTFOLIO['personal']['name']}!")
    print(f"📊 Total Projects: {len(PORTFOLIO['projects'])}")
    print(f"💡 Skills: {len(PORTFOLIO['skills'])}")
    print(f"🌐 Server running at: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)