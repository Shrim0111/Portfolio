from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# ── Portfolio Data ──────────────────────────────────────────────
portfolio_data = {
    "name": "Shrim Sethi",
    "title": "AI & Data Science Enthusiast",
    "tagline": "Turning data into actionable insights and building intelligent systems for real-world impact.",
    
    "email": "shrimsethi16@gmail.com",
    "linkedin": "https://www.linkedin.com/in/shrimsethi",
    "github": "https://github.com/Shrim0111",
    
    "available": True,

    "about": {
        "bio": "Artificial Intelligence focused Computer Science undergraduate with strong academic performance (CGPA 8.87/10) and practical experience in Machine Learning, Data Science, Python Development, and Web Technologies. Skilled in developing ML-driven systems, automation tools, and scalable web applications using Python, Flask, TensorFlow, and SQL. Passionate about solving real-world problems through data-driven and intelligent solutions.",
        
        "stats": [
            {"num": "8.87", "label": "CGPA"},
            {"num": "4+", "label": "Projects"},
            {"num": "5+", "label": "Certifications"},
            {"num": "12+", "label": "Automation Scripts"},
        ]
    },

    "skills": [

        {
            "title": "Programming Languages",
            "skills": [
                {"icon": "🐍", "name": "Python", "level": 90},
                {"icon": "💻", "name": "C / C++", "level": 80},
                {"icon": "☕", "name": "Java", "level": 75},
                {"icon": "🌐", "name": "JavaScript (Basic)", "level": 65},
                {"icon": "🗄️", "name": "SQL", "level": 80},
                {"icon": "📐", "name": "MATLAB", "level": 70}
            ]
        },

        {
            "title": "AI / Machine Learning",
            "skills": [
                {"icon": "🤖", "name": "Machine Learning", "level": 80},
                {"icon": "🔥", "name": "TensorFlow", "level": 75},
                {"icon": "🧠", "name": "Scikit-Learn", "level": 78},
                {"icon": "📊", "name": "Predictive Modeling", "level": 75},
                {"icon": "🧹", "name": "Data Preprocessing", "level": 85}
            ]
        },

        {
            "title": "Data Science & Analytics",
            "skills": [
                {"icon": "📊", "name": "Pandas / NumPy", "level": 85},
                {"icon": "📈", "name": "Exploratory Data Analysis", "level": 80},
                {"icon": "📉", "name": "Matplotlib", "level": 78},
                {"icon": "📊", "name": "Statistical Analysis", "level": 75},
                {"icon": "🧾", "name": "Data Visualization", "level": 78}
            ]
        },

        {
            "title": "Web Development & Databases",
            "skills": [
                {"icon": "🌍", "name": "Flask", "level": 82},
                {"icon": "🗃️", "name": "MySQL / SQLite", "level": 82},
                {"icon": "🎨", "name": "HTML / CSS / Bootstrap", "level": 85},
                {"icon": "🧩", "name": "PHP", "level": 70},
                {"icon": "🎨", "name": "Figma", "level": 80}
            ]
        },

        {
            "title": "Tools & Platforms",
            "skills": [
                {"icon": "🛠️", "name": "Git / GitHub", "level": 82},
                {"icon": "📓", "name": "Jupyter Notebook", "level": 85},
                {"icon": "☁️", "name": "Google Colab", "level": 85},
                {"icon": "⚙️", "name": "VS Code", "level": 85},
                {"icon": "🐍", "name": "Anaconda", "level": 75},
                {"icon": "💡", "name": "IntelliJ IDEA", "level": 72},
                {"icon": "📱", "name": "Android Studio", "level": 70}
            ]
        },

        {
            "title": "Soft Skills",
            "skills": [
                {"icon": "🧠", "name": "Analytical Thinking", "level": 92},
                {"icon": "🧩", "name": "Problem Solving", "level": 90},
                {"icon": "🤝", "name": "Communication", "level": 85},
                {"icon": "🚀", "name": "Leadership", "level": 85},
                {"icon": "👥", "name": "Teamwork", "level": 88},
                {"icon": "🔄", "name": "Adaptability", "level": 86}
            ]
        }
    ],

    "projects": [

        {
            "num": "001 (Ongoing)",
            "name": "Smart Crop Advisory System",
            "desc": "Machine Learning based agricultural advisory platform designed to assist farmers in crop selection, irrigation planning, and pest management using soil and weather data. Implemented feature engineering, ETL preprocessing pipeline, and predictive modeling to improve crop yield prediction accuracy and reduce model latency.",
            
            "tags": [
                "Python",
                "TensorFlow",
                "Machine Learning",
                "Data Preprocessing",
                "Flask",
                "HTML",
                "CSS",
                "JavaScript"
            ],

            "link": "#"
        },

        {
            "num": "002",
            "name": "Resume Builder & ATS Checker",
            "desc": "Developed a Flask-based resume building platform integrated with ATS keyword analysis to improve recruiter compatibility. Designed optimized MySQL database schema for efficient resume storage and retrieval, reducing query response time across large datasets.",
            
            "tags": [
                "Flask",
                "MySQL",
                "HTML",
                "CSS",
                "JavaScript",
                "Bootstrap",
                "SQLite"
            ],

            "link": "https://resumebuilder-hwar.onrender.com/"
        },

        {
            "num": "003",
            "name": "TripTrail – Tours & Travel Website",
            "desc": "Developed a dynamic tours and travel booking platform with package listings, booking forms, image galleries, and customer reviews. Implemented responsive frontend design and backend integration using PHP and MySQL for real-time booking management.",
            
            "tags": [
                "HTML",
                "CSS",
                "Bootstrap",
                "JavaScript",
                "PHP",
                "MySQL"
            ],

            "link": "#"
        },

        {
            "num": "004",
            "name": "Student Portfolio Website",
            "desc": "Created a personal portfolio platform showcasing projects, technical skills, achievements, and certifications. Designed with scalable architecture and structured data handling for easy customization and maintenance.",
            
            "tags": [
                "Flask",
                "Python",
                "HTML",
                "CSS",
                "JavaScript"
            ],

            "link": "#"
        }
    ],

    "education": [

        {
            "degree": "B.Tech — Computer Science (Artificial Intelligence)",
            "school": "Swami Keshvanand Institute of Technology (SKIT), Jaipur",
            "grade": "CGPA: 8.87/10",
            "year": "2023 — 2027",
            "marksheet": "marksheets/btech.pdf"
        },

        {
            "degree": "High School (PCM)",
            "school": "Green View Public School, New Delhi",
            "grade": "Completed",
            "year": "2023",
            "marksheet": "marksheets/12.pdf"
        }
    ],

    "experience": [

        {
            "role": "Python Development Intern",
            "company": "NCodes Lab",
            "duration": "June 2025 — July 2025",
            "location": "Kishangarh, Rajasthan",
            "details": "Developed 12+ Python automation scripts to streamline data processing workflows and improve operational efficiency. Built reusable Python modules for automation tasks, reducing manual effort across multiple projects."
        },

        {
            "role": "Web Development Intern",
            "company": "Kistechnosoftware Private Limited",
            "duration": "June 2024 — July 2024",
            "location": "Jaipur, Rajasthan",
            "details": "Built responsive web applications using HTML, CSS, JavaScript, and MySQL. Resolved 40+ application bugs through testing and debugging, significantly improving scalability and performance."
        }
    ],

    "certifications": [

        "Career Essentials in Generative AI — Microsoft & LinkedIn (2024)",
        "Geo-data Sharing & Cyber Security — IIRS ISRO (2025)",
        "Geo-data Processing using Python and Machine Learning — IIRS ISRO (2025)",
        "Python Automation & Development Training",
        "Web Development Internship Certification"
    ],

    "achievements": [

        "Selected for Cohort 6 — Infosys Pragati (2025)",
        "Selected as SheFi Scholar (2025)",
        "Advanced to Round 2 — MUJ HackX 2.0 Hackathon (2025)",
        "Maintained CGPA of 8.87/10 in B.Tech AI Program",
        "Built multiple AI and web-based real-world projects"
    ]
}
# ── Routes ──────────────────────────────────────────────────────
@app.route("/")
def index():
    return render_template("index.html", data=portfolio_data)

@app.route("/api/contact", methods=["POST"])
def contact():
    """Simple contact endpoint — extend with email/SMTP as needed."""
    body = request.get_json()
    name    = body.get("name", "").strip()
    email   = body.get("email", "").strip()
    message = body.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({"success": False, "error": "All fields are required."}), 400

    print(f"[Contact] From: {name} <{email}>\nMessage: {message}")

    return jsonify({"success": True, "message": "Thanks! I'll get back to you soon."})

# ── Run ─────────────────────────────────────────────────────────
if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)