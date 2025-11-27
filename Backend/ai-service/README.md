# Career Guidance AI Service

Python FastAPI microservice for AI-powered features using Ollama.

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Ollama installed ([Download](https://ollama.com/download))
- Ollama models pulled

### Installation

1. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Pull Ollama models**
```bash
ollama pull llama3.2
ollama pull mistral
ollama pull nomic-embed-text
```

4. **Run the service**
```bash
uvicorn main:app --reload --port 8000
```

API will be available at: `http://localhost:8000`
Docs: `http://localhost:8000/docs`

## 📁 Project Structure

```
ai-service/
├── main.py                 # FastAPI app entry point
├── cv_parser.py           # CV parsing logic
├── job_matcher.py         # Job matching engine
├── roadmap_generator.py   # Roadmap generation
├── utils.py               # Helper functions
├── models.py              # Pydantic models
├── requirements.txt       # Python dependencies
└── README.md
```

## 🔌 API Endpoints

### 1. CV Parsing

**Parse CV and extract structured data**

```http
POST /parse-cv
Content-Type: multipart/form-data

file: <cv-file.pdf>
```

Response:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "skills": ["Python", "React", "SQL"],
  "experience": [
    {
      "title": "Software Engineer",
      "company": "Tech Corp",
      "duration": "2 years"
    }
  ],
  "education": [
    {
      "degree": "B.Sc Computer Science",
      "university": "Cairo University",
      "year": 2022
    }
  ]
}
```

### 2. Job Matching

**Match user skills with jobs**

```http
POST /match-jobs
Content-Type: application/json

{
  "user_skills": ["Python", "Django", "PostgreSQL"],
  "jobs": [
    {
      "id": 1,
      "title": "Backend Developer",
      "required_skills": ["Python", "Django", "SQL"]
    }
  ]
}
```

Response:
```json
{
  "matches": [
    {
      "job_id": 1,
      "score": 85.5,
      "matching_skills": ["Python", "Django"],
      "missing_skills": ["SQL"]
    }
  ]
}
```

### 3. Gap Analysis

**Identify skill gaps for a specific job**

```http
POST /analyze-gap
Content-Type: application/json

{
  "user_skills": ["Python", "Flask"],
  "job_requirements": ["Python", "Django", "Docker", "AWS"]
}
```

Response:
```json
{
  "matching_skills": ["Python"],
  "missing_skills": [
    {
      "skill": "Django",
      "importance": "Required",
      "category": "Backend Framework"
    },
    {
      "skill": "Docker",
      "importance": "Required",
      "category": "DevOps"
    }
  ],
  "match_percentage": 25.0
}
```

### 4. Roadmap Generation

**Generate personalized learning roadmap**

```http
POST /generate-roadmap
Content-Type: application/json

{
  "user_profile": {
    "name": "John Doe",
    "current_skills": ["Python", "Flask"],
    "level": "Junior"
  },
  "target_job": {
    "title": "Senior Backend Developer",
    "required_skills": ["Python", "Django", "Docker", "AWS", "Kubernetes"]
  },
  "duration_months": 6
}
```

Response:
```json
{
  "title": "Backend Developer Roadmap",
  "duration_months": 6,
  "phases": [
    {
      "name": "Phase 1: Django Fundamentals",
      "duration_weeks": 8,
      "skills": ["Django", "REST APIs"],
      "resources": [
        {
          "title": "Django for Beginners",
          "type": "Course",
          "url": "https://example.com/django-course"
        }
      ]
    }
  ]
}
```

## 🧠 AI Models Used

### llama3.2 (3B)
- **Use**: CV parsing, skill extraction, text analysis
- **Speed**: ~2-5 seconds per request
- **Model**: `ollama pull llama3.2`

### mistral (7B)
- **Use**: Roadmap generation, detailed analysis
- **Speed**: ~5-10 seconds per request
- **Model**: `ollama pull mistral`

### nomic-embed-text
- **Use**: Creating embeddings for similarity search
- **Speed**: Fast (~1 second for batch)
- **Model**: `ollama pull nomic-embed-text`

## 🛠️ Development

### Core Modules

#### cv_parser.py
```python
from pdfplumber import PDF
import ollama

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from PDF"""
    with PDF.open(pdf_path) as pdf:
        return "\n".join(page.extract_text() for page in pdf.pages)

def parse_cv_with_llm(cv_text: str) -> dict:
    """Parse CV using Ollama LLM"""
    prompt = f"""Extract this information from the CV in JSON format:
    - name, email, phone
    - skills (list)
    - experience (list with title, company, duration)
    - education (list with degree, university, year)
    
    CV: {cv_text}
    """
    response = ollama.generate(model='llama3.2', prompt=prompt)
    return json.loads(response['response'])
```

#### job_matcher.py
```python
import ollama
import numpy as np

def get_skill_embedding(skill: str) -> np.ndarray:
    """Get embedding vector for a skill"""
    response = ollama.embeddings(
        model='nomic-embed-text',
        prompt=skill
    )
    return np.array(response['embedding'])

def calculate_similarity(skills1: list, skills2: list) -> float:
    """Calculate cosine similarity between skill sets"""
    emb1 = [get_skill_embedding(s) for s in skills1]
    emb2 = [get_skill_embedding(s) for s in skills2]
    
    # Calculate average embeddings
    avg_emb1 = np.mean(emb1, axis=0)
    avg_emb2 = np.mean(emb2, axis=0)
    
    # Cosine similarity
    similarity = np.dot(avg_emb1, avg_emb2) / (
        np.linalg.norm(avg_emb1) * np.linalg.norm(avg_emb2)
    )
    return float(similarity) * 100
```

### Testing

```bash
# Run tests
pytest tests/

# Test specific module
pytest tests/test_cv_parser.py

# With coverage
pytest --cov=. tests/
```

## 📦 requirements.txt

```txt
fastapi==0.104.0
uvicorn[standard]==0.24.0
python-multipart==0.0.6
pdfplumber==0.10.3
python-docx==1.1.0
Pillow==10.1.0
pytesseract==0.3.10
ollama==0.1.6
numpy==1.26.0
scikit-learn==1.3.2
pydantic==2.5.0
```

## 🔧 Configuration

Create `.env` file:

```env
OLLAMA_HOST=http://localhost:11434
MODEL_PARSER=llama3.2
MODEL_ROADMAP=mistral
MODEL_EMBEDDINGS=nomic-embed-text
LOG_LEVEL=INFO
```

## ⚡ Performance Tips

### 1. Batch Processing
Process multiple CVs/jobs at once:
```python
async def process_batch(files: list):
    tasks = [parse_cv_async(f) for f in files]
    return await asyncio.gather(*tasks)
```

### 2. Caching
Cache embeddings to avoid recalculation:
```python
from functools import lru_cache

@lru_cache(maxsize=1000)
def get_cached_embedding(skill: str):
    return get_skill_embedding(skill)
```

### 3. Model Selection
- Use llama3.2 (3B) for faster responses
- Use mistral (7B) when quality > speed

## 🚨 Common Issues

### Ollama Not Running
```bash
# Check if Ollama is running
ollama list

# Start Ollama service
ollama serve
```

### Model Not Found
```bash
# Pull missing model
ollama pull llama3.2
```

### Out of Memory
- Reduce batch size
- Use smaller model (llama3.2 instead of mistral)
- Close other applications

### Slow Response Times
- Check RAM usage (min 8GB for llama3.2)
- Use GPU if available
- Consider caching frequently used data

## 📊 Monitoring

### Check Service Health
```http
GET /health

Response: {"status": "healthy", "ollama": "connected"}
```

### Metrics
View metrics at `/metrics` endpoint (if enabled)

## 📞 Support

For issues or questions, contact the AI team lead.