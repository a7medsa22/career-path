# 🎓 Career Guidance Platform

An AI-powered platform that helps university students and fresh graduates find their career path through intelligent CV analysis, job matching, and personalized learning roadmaps.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Team & Responsibilities](#team--responsibilities)
- [Contributing](#contributing)
- [Documentation](#documentation)

---

## 🎯 Overview

**Career Guidance Platform** addresses the gap between academic education and job market requirements by:

- ✅ Analyzing student CVs and GitHub profiles using AI
- ✅ Matching students with suitable job opportunities
- ✅ Identifying skill gaps for desired positions
- ✅ Generating personalized learning roadmaps

**Target Audience:**
- University students (especially near graduation)
- Fresh graduates seeking career direction
- Educational institutions supporting students

---

## ✨ Features

### 1. Smart Profile Creation
- Upload CV (PDF/Word/Image) with AI parsing
- Connect GitHub account for automatic skill extraction
- Manual skill addition and profile customization

### 2. Intelligent Job Matching
- 20+ fake companies with 60-100 diverse job positions
- AI-powered matching algorithm
- Match score calculation and ranking

### 3. Gap Analysis
- Compare student skills vs job requirements
- Prioritize missing skills by importance
- Visual skill comparison charts

### 4. Personalized Roadmap
- AI-generated learning plans (3-6 months)
- Course recommendations with resources
- Progress tracking system

---

## 🛠️ Tech Stack

### Backend
- **.NET 8 Web API** - Main application server
- **Entity Framework Core** - ORM for SQL Server
- **JWT** - Authentication
- **Hangfire** - Background jobs (optional)

### Frontend
- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Recharts** - Data visualization

### AI/ML
- **Python FastAPI** - AI microservice
- **Ollama** - Local LLM inference
  - `llama3.2` - CV parsing & text analysis
  - `mistral` - Roadmap generation
  - `nomic-embed-text` - Embeddings for matching
- **pdfplumber** - PDF text extraction
- **python-docx** - Word document processing

### Database
- **PostgreSQL 15+** - Primary database
- **pgvector** - Vector similarity search

---

## 📁 Project Structure

```
CareerGuidancePlatform/
├── backend/
│   ├── CareerGuidance.API/          # .NET Web API
│   │   ├── Controllers/
│   │   ├── Services/
│   │   ├── Models/
│   │   ├── Data/
│   │   ├── Program.cs
│   │   └── appsettings.json
│   │
│   └── ai-service/                  # Python FastAPI
│       ├── main.py
│       ├── cv_parser.py
│       ├── job_matcher.py
│       ├── roadmap_generator.py
│       ├── requirements.txt
│       └── README.md
│
├── frontend/                        # Next.js
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── database/
│   ├── init.sql
│   ├── seed-data.sql
│   └── migrations/
│
├── docs/
│   ├── API.md
│   ├── DATABASE.md
│   ├── DEPLOYMENT.md
│   └── ARCHITECTURE.md
│
├── .gitignore
├── README.md
└── docker-compose.yml
```

---

## 🚀 Getting Started

### Prerequisites

- **.NET 8 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Python 3.10+** - [Download](https://www.python.org/downloads/)
- **Ollama** - [Install Guide](https://ollama.com/download)
- **Git** - [Download](https://git-scm.com/)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/your-org/career-guidance-platform.git
cd career-guidance-platform
```

#### 2. Setup Database
```bash
# Create database
createdb career_guidance

# Run migrations
cd backend/CareerGuidance.API
dotnet ef database update

# Seed data (optional)
psql -d career_guidance -f ../../database/seed-data.sql
```

#### 3. Setup Backend (.NET API)
```bash
cd backend/CareerGuidance.API
dotnet restore
dotnet build

# Update connection string in appsettings.json
# Run the API
dotnet run
# API will run on http://localhost:5000
```

#### 4. Setup AI Service (Python)
```bash
cd backend/ai-service

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Pull Ollama models
ollama pull llama3.2
ollama pull mistral
ollama pull nomic-embed-text

# Run the service
uvicorn main:app --reload --port 8000
# Service will run on http://localhost:8000
```

#### 5. Setup Frontend (Next.js)
```bash
cd frontend
npm install

# Create .env.local file
cp .env.example .env.local
# Update API URLs in .env.local

# Run development server
npm run dev
# Frontend will run on http://localhost:3000
```

---

## 👥 Team & Responsibilities

### Backend Team (3 members)
- **Person 1**: API Core, Authentication, User Management
- **Person 2**: Jobs & Companies Module, Database Design
- **Person 3**: AI Integration, GitHub API, Background Jobs

### Frontend Team (3 members)
- **Person 1**: Authentication & Profile Pages
- **Person 2**: Jobs Listing & Company Pages
- **Person 3**: Dashboard, Roadmap, Visualizations

### AI Team (3 members)
- **Person 1**: CV Parser & Text Extraction
- **Person 2**: Job Matching Engine & Embeddings
- **Person 3**: Roadmap Generator & Gap Analysis

---

## 🤝 Contributing

### Git Workflow

1. **Create a feature branch**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

2. **Make changes and commit**
```bash
git add .
git commit -m "feat: add user authentication"
```

3. **Push and create PR**
```bash
git push origin feature/your-feature-name
```

4. **Create Pull Request** on GitHub targeting `develop` branch

### Commit Message Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## 📚 Documentation

- [API Documentation](./docs/API.md) - REST API endpoints
- [Database Schema](./docs/DATABASE.md) - Database design
- [Architecture](./docs/ARCHITECTURE.md) - System architecture
- [Deployment Guide](./docs/DEPLOYMENT.md) - Production deployment

---

## 🔐 Environment Variables

### Backend (.NET)
```env
ConnectionStrings__DefaultConnection=Host=localhost;Database=career_guidance;Username=postgres;Password=your_password
JwtSettings__SecretKey=your-secret-key-min-32-chars
JwtSettings__Issuer=CareerGuidanceAPI
JwtSettings__Audience=CareerGuidanceClient
PythonServiceUrl=http://localhost:8000
```

### Frontend (Next.js)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000
```

### AI Service (Python)
```env
OLLAMA_HOST=http://localhost:11434
MODEL_PARSER=llama3.2
MODEL_ROADMAP=mistral
MODEL_EMBEDDINGS=nomic-embed-text
```

---

## 📊 Project Timeline

- **Month 1**: Foundation & Core Features
- **Month 2**: AI Integration & Job Matching
- **Month 3**: Advanced Features (Gap Analysis, Roadmaps)
- **Month 4**: Testing, Polish & Documentation

---

## 📞 Support & Contact

- **Project Lead**: [Your Name]
- **Email**: [your-email@example.com]
- **Discord**: [Server Invite]
- **Issues**: [GitHub Issues](https://github.com/your-org/career-guidance-platform/issues)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Ollama team for local LLM inference
- shadcn for amazing UI components
- All contributors and team members

---

**Made with ❤️ by the Career Guidance Team**
