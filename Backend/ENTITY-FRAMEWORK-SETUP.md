# Entity Framework Core Setup Guide (SQL Server)

Complete guide for setting up Entity Framework Core with SQL Server in the Career Guidance Platform.

## 📦 Required NuGet Packages

```bash
# Core EF packages
dotnet add package Microsoft.EntityFrameworkCore --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 8.0.0

# For design-time support
dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.0
```

## 🗄️ Database Context Setup

### 1. Create ApplicationDbContext.cs

```csharp
using Microsoft.EntityFrameworkCore;
using CareerGuidance.API.Models;

namespace CareerGuidance.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSets
        public DbSet<User> Users { get; set; }
        public DbSet<UserSkill> UserSkills { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobSkill> JobSkills { get; set; }
        public DbSet<JobMatch> JobMatches { get; set; }
        public DbSet<Roadmap> Roadmaps { get; set; }
        public DbSet<RoadmapPhase> RoadmapPhases { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("GETDATE()");
            });

            // Configure UserSkill
            modelBuilder.Entity<UserSkill>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.User)
                    .WithMany(u => u.UserSkills)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasIndex(e => new { e.UserId, e.SkillName }).IsUnique();
            });

            // Configure Company
            modelBuilder.Entity<Company>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            });

            // Configure Job
            modelBuilder.Entity<Job>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Company)
                    .WithMany(c => c.Jobs)
                    .HasForeignKey(e => e.CompanyId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
            });

            // Configure JobSkill
            modelBuilder.Entity<JobSkill>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Job)
                    .WithMany(j => j.RequiredSkills)
                    .HasForeignKey(e => e.JobId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasIndex(e => new { e.JobId, e.SkillName }).IsUnique();
            });

            // Configure JobMatch
            modelBuilder.Entity<JobMatch>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.Job)
                    .WithMany()
                    .HasForeignKey(e => e.JobId)
                    .OnDelete(DeleteBehavior.NoAction);
                entity.HasIndex(e => new { e.UserId, e.JobId }).IsUnique();
            });

            // Configure Roadmap
            modelBuilder.Entity<Roadmap>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.Job)
                    .WithMany()
                    .HasForeignKey(e => e.JobId)
                    .OnDelete(DeleteBehavior.NoAction);
            });

            // Configure RoadmapPhase
            modelBuilder.Entity<RoadmapPhase>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Roadmap)
                    .WithMany(r => r.Phases)
                    .HasForeignKey(e => e.RoadmapId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
```

### 2. Configure in Program.cs

```csharp
using Microsoft.EntityFrameworkCore;
using CareerGuidance.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null
        )
    )
);

// Rest of configuration...
var app = builder.Build();

// Auto-migrate database on startup (Development only)
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

app.Run();
```

### 3. Update appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CareerGuidance;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=True"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.EntityFrameworkCore": "Warning"
    }
  }
}
```

## 🔧 Entity Framework Commands

### Initial Migration

```bash
# Add initial migration
dotnet ef migrations add InitialCreate

# Update database
dotnet ef database update

# View SQL that will be executed (without applying)
dotnet ef migrations script
```

### Common Commands

```bash
# Add new migration
dotnet ef migrations add MigrationName

# Update database to latest migration
dotnet ef database update

# Rollback to specific migration
dotnet ef database update PreviousMigrationName

# Remove last migration (if not applied)
dotnet ef migrations remove

# List all migrations
dotnet ef migrations list

# Generate SQL script for specific migration range
dotnet ef migrations script FromMigration ToMigration

# Drop database (careful!)
dotnet ef database drop
```

### Troubleshooting

```bash
# If commands don't work, ensure tools are installed
dotnet tool install --global dotnet-ef

# Update tools
dotnet tool update --global dotnet-ef

# Check EF version
dotnet ef --version
```

## 📝 Sample Entity Classes

### User.cs

```csharp
namespace CareerGuidance.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string? Major { get; set; }
        public int? YearOfStudy { get; set; }
        public string? GithubUrl { get; set; }
        public string? CvPath { get; set; }
        public string? ProfileSummary { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation properties
        public ICollection<UserSkill> UserSkills { get; set; } = new List<UserSkill>();
    }
}
```

### Job.cs

```csharp
namespace CareerGuidance.API.Models
{
    public class Job
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? Level { get; set; }
        public string? Location { get; set; }
        public string? JobType { get; set; }
        public string? SalaryRange { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation properties
        public Company Company { get; set; } = null!;
        public ICollection<JobSkill> RequiredSkills { get; set; } = new List<JobSkill>();
    }
}
```

## 🔍 Querying Data

### Basic Queries

```csharp
// Get all users
var users = await _context.Users.ToListAsync();

// Get user with skills
var user = await _context.Users
    .Include(u => u.UserSkills)
    .FirstOrDefaultAsync(u => u.Id == userId);

// Get jobs with company info
var jobs = await _context.Jobs
    .Include(j => j.Company)
    .Include(j => j.RequiredSkills)
    .Where(j => j.Level == "Junior")
    .ToListAsync();

// Complex query with filtering
var matches = await _context.JobMatches
    .Include(m => m.Job)
        .ThenInclude(j => j.Company)
    .Where(m => m.UserId == userId && m.MatchScore >= 70)
    .OrderByDescending(m => m.MatchScore)
    .ToListAsync();
```

## ⚠️ Common Issues & Solutions

### Issue: "Login failed for user"
**Solution:** Check SQL Server is running and credentials are correct
```bash
# Test connection in SSMS first
Server: localhost
Authentication: Windows Authentication (or SQL Server Authentication)
```

### Issue: "A network-related error occurred"
**Solution:** Enable TCP/IP in SQL Server Configuration Manager
1. Open SQL Server Configuration Manager
2. SQL Server Network Configuration → Protocols
3. Enable TCP/IP
4. Restart SQL Server service

### Issue: Migrations not working
**Solution:** Ensure EF tools are installed globally
```bash
dotnet tool install --global dotnet-ef
```

### Issue: "Cannot drop database while in use"
**Solution:** Close all connections
```bash
# Run in SQL Server
USE master;
GO
ALTER DATABASE CareerGuidance SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
DROP DATABASE CareerGuidance;
```

## 📚 Additional Resources

- [EF Core Documentation](https://learn.microsoft.com/en-us/ef/core/)
- [SQL Server with EF Core](https://learn.microsoft.com/en-us/ef/core/providers/sql-server/)
- [Migrations Overview](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/)

---

**Need help?** Contact the backend team lead!