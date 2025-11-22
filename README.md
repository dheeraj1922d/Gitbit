# GitBit - C++ Lecture Notes Viewer

A beautiful, modern web application for viewing C++ lecture notes and code files directly from GitHub repositories. Built with React, featuring markdown rendering, syntax highlighting, and advanced navigation features.

## ✨ Features

### Core Functionality
- 🔗 **GitHub Integration**: Fetch content directly from any public GitHub repository
- 📝 **Markdown Rendering**: Beautiful rendering of lecture notes with full markdown support
- 💻 **Syntax Highlighting**: Highlighted C++ code with copy and download functionality
- 📁 **Smart File Detection**: Automatically identifies lecture files, code files, and assets
- 🔄 **Caching System**: Intelligent caching to reduce API calls and improve performance

### Navigation
- ⏮️ **Sequential Navigation**: Easy previous/next lecture navigation
- 📑 **Sidebar Menu**: Quick access to all lectures with search functionality
- 🍞 **Breadcrumbs**: Always know your current position
- 🔍 **Search**: Find lectures quickly by name or path
- 📊 **Progress Tracking**: Track which lectures you've viewed

### User Experience
- 🌓 **Dark/Light Theme**: Toggle between themes for comfortable reading
- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- 🔖 **Bookmarks**: Mark your favorite lectures for quick access
- 📏 **Adjustable Font Size**: Three font sizes for optimal readability
- ✨ **Print-Friendly**: Optimized styling for printing

### Code Features
- 📋 **Copy Code**: One-click copy for all code blocks
- 💾 **Download Files**: Download individual code files
- 🖥️ **Fullscreen Mode**: Expand code viewer to fullscreen
- 🎨 **Beautiful Highlighting**: GitHub Dark theme for code blocks

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- A GitHub repository with C++ lecture notes

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dheeraj1922d/Gitbit.git
   cd Gitbit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📖 Usage

### Configuring Your Repository

1. When you first open GitBit, you'll see a configuration modal
2. Enter your GitHub repository details:
   - **Repository Owner**: Your GitHub username or organization
   - **Repository Name**: The name of your repository
   - **Branch**: The branch to fetch from (default: main)
3. Click "Load Repository"

### Repository Structure

For best results, organize your repository like this:

```
your-repo/
├── lecture-01.md          # Lecture files (markdown)
├── lecture-02.md
├── lecture-03.md
├── code/
│   ├── example1.cpp      # C++ source files
│   ├── example2.cpp
│   └── utils.h           # Header files
└── assets/
    ├── diagram1.png      # Images and diagrams
    └── diagram2.jpg
```

### Lecture File Naming

GitBit automatically detects lecture files using these patterns:
- `lecture-01.md`, `lecture-02.md`, etc.
- `lecture_01.md`, `lecture_02.md`, etc.
- `01-lecture.md`, `02-lecture.md`, etc.
- `01.md`, `02.md`, etc.

### Markdown Features

Your lecture markdown files support:
- **Headers** (H1-H6)
- **Lists** (ordered and unordered)
- **Code blocks** with syntax highlighting
- **Images** (automatically linked from GitHub)
- **Links** and **blockquotes**
- **Tables** and **horizontal rules**
- **Inline code** formatting

Example:
````markdown
# Lecture 1: Introduction to C++

## What is C++?

C++ is a powerful programming language...

### First Program

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

![Diagram](./assets/diagram.png)
````

## 🛠️ Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Markdown Parser**: marked
- **Syntax Highlighting**: highlight.js
- **Icons**: react-icons
- **Storage**: localforage (IndexedDB)
- **Styling**: Custom CSS with CSS Variables

## 📦 Project Structure

```
webapp/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── MarkdownViewer.jsx
│   │   ├── CodeViewer.jsx
│   │   ├── Navigation.jsx
│   │   ├── Breadcrumb.jsx
│   │   └── RepoConfig.jsx
│   ├── contexts/          # React contexts
│   │   └── AppContext.jsx
│   ├── services/          # API services
│   │   ├── githubService.js
│   │   └── lectureService.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── package.json
└── README.md
```

## 🎨 Customization

### Themes

GitBit supports light and dark themes. Theme colors are defined using CSS variables in `src/App.css`:

```css
:root {
  --primary-color: #2563eb;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  /* ... more variables */
}

[data-theme='dark'] {
  --text-primary: #f9fafb;
  --bg-primary: #111827;
  /* ... dark theme overrides */
}
```

### Font Sizes

Three font sizes are available: small, medium (default), and large. Adjust in the header toolbar.

## 🔧 Configuration

### GitHub API Rate Limits

GitBit uses the GitHub API without authentication, which has a rate limit of 60 requests per hour per IP address. To avoid hitting this limit:

1. **Caching**: GitBit automatically caches responses for 1 hour
2. **Refresh Wisely**: Only refresh when necessary
3. **Authentication** (optional): Add a GitHub token in `src/services/githubService.js` for 5000 requests/hour

To add authentication:
```javascript
headers: {
  'Accept': 'application/vnd.github.v3+json',
  'Authorization': 'token YOUR_GITHUB_TOKEN',
  ...options.headers,
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🐛 Known Issues

- GitHub API rate limiting without authentication token
- Some complex markdown features may not render perfectly
- Large repositories may take longer to load initially

## 🚀 Future Enhancements

- [ ] Quiz/practice problems integration
- [ ] PDF export functionality
- [ ] Offline mode with service workers
- [ ] Code playground for running C++ snippets
- [ ] Comments/discussion section per lecture
- [ ] Video embedding support
- [ ] Full-text search across all lectures
- [ ] GitHub authentication for higher rate limits

## 📧 Contact

For questions or support, please open an issue on GitHub.

## 🙏 Acknowledgments

- React team for the amazing framework
- GitHub for their public API
- highlight.js for syntax highlighting
- marked for markdown parsing
- All open-source contributors

---

Made with ❤️ by the GitBit Team
