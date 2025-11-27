# Career Guidance API (.NET 8)

Backend API for the Career Guidance Platform built with ASP.NET Core Web API.

## 🚀 Quick Start

### Prerequisites
- .NET 8 SDK
- SQL Server 2019+ (or SQL Server Express)
- Visual Studio 2022 or VS Code
- SQL Server Management Studio (SSMS) - Optional

### Setup

1. **Restore packages**
```bash
dotnet restore
```

2. **Update database connection string**
Edit `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CareerGuidance;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

3. **Run migrations**
```bash
dotnet ef database update
```

4. **Run the API**
```bash
dotnet run
```

API will be available at: `https://localhost:5001` (or `http://localhost:5000`)

## 📁 Project Structure

```
CareerGuidance.API/
├── Controllers/          # API endpoints
│   ├── AuthController.cs
│   ├── UsersController.cs
│   ├── JobsController.cs
│   └── CompaniesController.cs
├── Services/             # Business logic
│   ├── IUserService.cs
│   ├── UserService.cs
│   ├── IJobService.cs
│   └── JobService.cs
├── Models/              # Data models
│   ├── Entities/
│   │   ├── User.cs
│   │   ├── Job.cs
│   │   └── Company.cs
│   └── DTOs/
│       ├── LoginDto.cs
│       └── UserDto.cs
├── Data/               # Database context
│   └── ApplicationDbContext.cs
├── Helpers/            # Utilities
│   └── JwtHelper.cs
└── Program.cs          # Entry point
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Get Token
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2024-01-01T12:00:00Z"
}
```

### Use Token
```http
GET /api/users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/cv` - Upload CV
- `GET /api/users/{id}/skills` - Get user skills

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/{id}` - Get job by ID
- `GET /api/jobs/search?keyword=...` - Search jobs
- `POST /api/jobs/{id}/match` - Get match score for job

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/{id}` - Get company by ID
- `GET /api/companies/{id}/jobs` - Get company jobs

### Matches
- `GET /api/matches` - Get user's job matches
- `POST /api/matches/generate` - Generate matches

### Roadmaps
- `GET /api/roadmaps` - Get user roadmaps
- `GET /api/roadmaps/{id}` - Get specific roadmap
- `POST /api/roadmaps/generate` - Generate new roadmap
- `PUT /api/roadmaps/{id}/progress` - Update progress

## 🛠️ Development

### Add New Migration
```bash
dotnet ef migrations add MigrationName
dotnet ef database update
```

### Run Tests
```bash
dotnet test
```

### Generate API Documentation
Swagger is automatically available at:
- `https://localhost:5001/swagger`

## 🔧 Configuration

### appsettings.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CareerGuidance;Trusted_Connection=True;TrustServerCertificate=True;"
    // Or with SQL Auth:
    // "DefaultConnection": "Server=localhost;Database=CareerGuidance;User Id=sa;Password=YourPassword;TrustServerCertificate=True;"
  },
  "JwtSettings": {
    "SecretKey": "your-secret-key-min-32-characters-long",
    "Issuer": "CareerGuidanceAPI",
    "Audience": "CareerGuidanceClient",
    "ExpiryMinutes": 1440
  },
  "PythonServiceUrl": "http://localhost:8000",
  "GitHub": {
    "ClientId": "your-github-client-id",
    "ClientSecret": "your-github-client-secret"
  }
}
```

## 📦 Dependencies

```xml
<PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.0" />
<PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.0" />
<PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="7.0.0" />
<PackageReference Include="BCrypt.Net-Next" Version="4.0.3" />
<PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
```

## 🚨 Common Issues

### Database Connection Error
- Ensure SQL Server is running (check Services)
- Check connection string in appsettings.json
- Verify TCP/IP is enabled in SQL Server Configuration Manager
- Test connection in SSMS first

### JWT Token Invalid
- Check secret key length (min 32 chars)
- Verify token hasn't expired
- Ensure correct Authorization header format

## 📞 Support

For issues or questions, contact the backend team lead.