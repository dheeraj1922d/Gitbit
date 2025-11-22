# Contributing to GitBit

Thank you for considering contributing to GitBit! We welcome contributions from everyone.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Gitbit.git
   cd Gitbit
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. **Make your changes** in the new branch
2. **Test your changes**:
   ```bash
   npm run dev    # Start development server
   npm run build  # Test production build
   ```
3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: description of your changes"
   ```
4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Create a Pull Request** on GitHub

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```
feat: add PDF export functionality
fix: resolve markdown image rendering issue
docs: update README with new features
```

## Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable and function names

## Project Structure

```
src/
├── components/        # React components (UI elements)
├── contexts/         # React contexts (state management)
├── services/         # API services (GitHub, lectures)
├── utils/            # Utility functions
├── hooks/            # Custom React hooks
├── styles/           # Global styles
├── App.jsx           # Main application component
└── main.jsx          # Application entry point
```

## Adding New Features

When adding a new feature:

1. **Create component files** in `src/components/` with corresponding CSS
2. **Update services** if you need to interact with GitHub API
3. **Add to AppContext** if you need global state
4. **Update README.md** with feature documentation
5. **Add examples** of how to use the feature

## Testing

Before submitting a PR:

1. Test in development mode: `npm run dev`
2. Test production build: `npm run build && npm run preview`
3. Test responsive design (mobile, tablet, desktop)
4. Test dark/light theme switching
5. Test with different GitHub repositories

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update documentation for any new features
3. Ensure all tests pass and build succeeds
4. The PR will be reviewed by maintainers
5. Address any review comments
6. Once approved, your PR will be merged

## Reporting Bugs

When reporting bugs, please include:

- **Description**: Clear description of the bug
- **Steps to reproduce**: How to trigger the bug
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: Browser, OS, etc.

## Suggesting Features

We welcome feature suggestions! Please:

1. Check if the feature already exists or is planned
2. Open an issue with the "enhancement" label
3. Clearly describe the feature and its benefits
4. Provide examples or mockups if possible

## Code Review Process

All submissions require review. We use GitHub pull requests for this purpose. Reviewers will:

- Check code quality and style
- Verify functionality
- Test for bugs
- Ensure documentation is updated
- Check for breaking changes

## Community

- Be respectful and constructive
- Help others learn and grow
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)

## Questions?

If you have questions:

1. Check the README.md
2. Search existing issues
3. Open a new issue with the "question" label
4. Join our community discussions

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

Thank you for contributing to GitBit! 🎉
