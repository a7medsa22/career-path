# Contributing to Career Guidance Platform

Thank you for contributing! This document provides guidelines for contributing to the project.

## 🌳 Git Workflow

### Branch Naming Convention

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/what-changed` - Documentation updates
- `refactor/what-refactored` - Code refactoring
- `test/what-tested` - Adding tests

**Examples:**
- `feature/cv-upload`
- `fix/login-redirect-error`
- `docs/update-readme`

### Workflow Steps

1. **Update your local develop branch**
```bash
git checkout develop
git pull origin develop
```

2. **Create feature branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Make changes and commit**
```bash
git add .
git commit -m "feat: add CV upload functionality"
```

4. **Push to remote**
```bash
git push origin feature/your-feature-name
```

5. **Create Pull Request**
- Go to GitHub/GitLab
- Create PR from your branch to `develop`
- Add description and screenshots if applicable
- Request review from team members

6. **Address review comments**
```bash
# Make requested changes
git add .
git commit -m "fix: address review comments"
git push origin feature/your-feature-name
```

7. **Merge after approval**
- Squash commits if needed
- Delete branch after merge

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```bash
# Feature
git commit -m "feat(auth): add JWT authentication"

# Bug fix
git commit -m "fix(jobs): correct match score calculation"

# Documentation
git commit -m "docs(readme): update installation steps"

# Breaking change
git commit -m "feat(api): change response format

BREAKING CHANGE: API now returns data in different structure"
```

## 🔍 Code Review Process

### Before Requesting Review
- [ ] Code compiles/runs without errors
- [ ] All tests pass
- [ ] Code follows project style guidelines
- [ ] Added comments for complex logic
- [ ] Updated documentation if needed
- [ ] Removed console.logs / debug code

### For Reviewers
- Review within 24 hours
- Be constructive and respectful
- Ask questions if unclear
- Approve when satisfied

### Review Checklist
- [ ] Code is readable and maintainable
- [ ] No security vulnerabilities
- [ ] Follows SOLID principles
- [ ] Has appropriate error handling
- [ ] Performance considerations addressed

## 🎨 Code Style Guidelines

### Backend (.NET)
```csharp
// Use PascalCase for classes, methods
public class UserService
{
    public async Task<User> GetUserByIdAsync(int id)
    {
        // Use camelCase for variables
        var user = await _context.Users.FindAsync(id);
        return user;
    }
}

// Use meaningful names
// ✅ Good
var matchedJobs = await GetMatchedJobsForUser(userId);

// ❌ Bad
var j = await GetJobs(id);
```

### Frontend (TypeScript/React)
```typescript
// Use PascalCase for components
export default function JobCard({ job }: { job: Job }) {
  // Use camelCase for variables/functions
  const handleApplyClick = () => {
    // ...
  };

  return (
    <Card className="p-4">
      <h3>{job.title}</h3>
      <Button onClick={handleApplyClick}>Apply</Button>
    </Card>
  );
}

// Use descriptive names
// ✅ Good
const isUserAuthenticated = checkAuthentication();

// ❌ Bad
const auth = check();
```

### Python (AI Service)
```python
# Follow PEP 8
# Use snake_case for functions/variables
def parse_cv_from_pdf(pdf_path: str) -> dict:
    """Parse CV and extract information.
    
    Args:
        pdf_path: Path to the PDF file
        
    Returns:
        Dict containing parsed CV data
    """
    cv_text = extract_text(pdf_path)
    return analyze_with_llm(cv_text)

# Use type hints
def calculate_match_score(
    user_skills: list[str],
    job_requirements: list[str]
) -> float:
    # ...
    return score
```

## 🧪 Testing Guidelines

### Backend Tests
```csharp
[Fact]
public async Task GetUserById_ExistingUser_ReturnsUser()
{
    // Arrange
    var userId = 1;
    
    // Act
    var result = await _userService.GetUserByIdAsync(userId);
    
    // Assert
    Assert.NotNull(result);
    Assert.Equal(userId, result.Id);
}
```

### Frontend Tests
```typescript
import { render, screen } from '@testing-library/react';
import JobCard from './JobCard';

test('renders job title', () => {
  const job = { id: 1, title: 'Software Engineer' };
  render(<JobCard job={job} />);
  
  expect(screen.getByText('Software Engineer')).toBeInTheDocument();
});
```

## 📚 Documentation

### Code Comments
```typescript
// ✅ Good: Explains WHY
// Using exponential backoff to handle rate limits
await retryWithBackoff(apiCall);

// ❌ Bad: Explains WHAT (obvious from code)
// Set user to null
user = null;
```

### API Documentation
Update `docs/API.md` when adding/changing endpoints:

```markdown
### Create Job Match

**POST** `/api/matches`

Generate job matches for current user.

**Request:**
```json
{
  "regenerate": false
}
```

**Response:**
```json
{
  "matches": [...],
  "total": 15
}
```
```

## 🚫 What NOT to Commit

- **Sensitive data**: API keys, passwords, tokens
- **Environment files**: `.env`, `.env.local`
- **Build artifacts**: `bin/`, `obj/`, `node_modules/`, `.next/`
- **IDE files**: `.vscode/`, `.idea/` (add to `.gitignore`)
- **Large files**: Videos, large datasets (use Git LFS if needed)
- **Personal configs**: Personal VS Code settings

## 🐛 Bug Reports

### Creating Good Bug Reports

Include:
1. **Description**: What's the bug?
2. **Steps to reproduce**: How to trigger it?
3. **Expected behavior**: What should happen?
4. **Actual behavior**: What actually happens?
5. **Environment**: OS, browser, versions
6. **Screenshots**: If applicable

**Template:**
```markdown
**Description**
Login button doesn't work on mobile

**Steps to Reproduce**
1. Open app on mobile browser
2. Navigate to /login
3. Click "Login" button
4. Nothing happens

**Expected**
Should redirect to dashboard

**Actual**
Button click has no effect

**Environment**
- Device: iPhone 12
- OS: iOS 16
- Browser: Safari

**Screenshots**
[Attach screenshot]
```

## ✨ Feature Requests

### Creating Good Feature Requests

Include:
1. **Problem**: What problem does this solve?
2. **Solution**: Proposed solution
3. **Alternatives**: Other solutions considered
4. **Additional context**: Mockups, examples

## 🎯 Pull Request Guidelines

### PR Title
Use same format as commits:
```
feat(auth): implement Google OAuth login
```

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue
Closes #123

## Changes Made
- Added Google OAuth integration
- Updated login page UI
- Added tests for OAuth flow

## Testing
- [ ] Tested locally
- [ ] All tests pass
- [ ] Tested on multiple browsers (if frontend)

## Screenshots
[Add screenshots if UI changes]

## Checklist
- [ ] Code follows style guidelines
- [ ] Added/updated tests
- [ ] Updated documentation
- [ ] No breaking changes (or documented)
```

## 📞 Getting Help

- **Questions**: Ask in team Discord/Slack
- **Technical issues**: Create GitHub issue
- **Urgent bugs**: Contact team lead directly

## 🙏 Thank You!

Your contributions make this project better. Thank you for following these guidelines!