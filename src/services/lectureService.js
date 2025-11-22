import githubService from './githubService';

class LectureService {
  constructor() {
    this.lectures = [];
    this.codeFiles = [];
    this.assets = [];
  }

  parseLectureNumber(filename) {
    // Try various patterns: lecture-01, lecture_01, 01-lecture, etc.
    const patterns = [
      /lecture[-_](\d+)/i,
      /(\d+)[-_]lecture/i,
      /^(\d+)/,
      /lecture[-_]?(\d+)/i,
    ];

    for (const pattern of patterns) {
      const match = filename.match(pattern);
      if (match) {
        return parseInt(match[1], 10);
      }
    }

    return null;
  }

  async fetchRepoStructure(owner, repo, branch = 'main') {
    try {
      const tree = await githubService.getRepoTree(owner, repo, branch);
      
      const lectures = [];
      const codeFiles = [];
      const assets = [];

      tree.tree.forEach(item => {
        const path = item.path.toLowerCase();
        
        // Identify markdown lecture files
        if (item.type === 'blob' && path.endsWith('.md')) {
          const lectureNum = this.parseLectureNumber(item.path);
          if (lectureNum !== null) {
            lectures.push({
              number: lectureNum,
              path: item.path,
              name: item.path.split('/').pop(),
              sha: item.sha,
              type: 'lecture',
            });
          }
        }
        
        // Identify C++ code files
        if (item.type === 'blob' && (path.endsWith('.cpp') || path.endsWith('.h') || path.endsWith('.hpp'))) {
          codeFiles.push({
            path: item.path,
            name: item.path.split('/').pop(),
            sha: item.sha,
            type: path.endsWith('.cpp') ? 'cpp' : 'header',
          });
        }
        
        // Identify assets (images, diagrams)
        if (item.type === 'blob' && (path.endsWith('.png') || path.endsWith('.jpg') || 
            path.endsWith('.jpeg') || path.endsWith('.gif') || path.endsWith('.svg'))) {
          assets.push({
            path: item.path,
            name: item.path.split('/').pop(),
            sha: item.sha,
          });
        }
      });

      // Sort lectures by number
      lectures.sort((a, b) => a.number - b.number);

      this.lectures = lectures;
      this.codeFiles = codeFiles;
      this.assets = assets;

      return { lectures, codeFiles, assets };
    } catch (error) {
      console.error('Error fetching repository structure:', error);
      throw error;
    }
  }

  async getLectureContent(owner, repo, lecturePath) {
    try {
      const content = await githubService.getFileContent(owner, repo, lecturePath);
      return content;
    } catch (error) {
      console.error('Error fetching lecture content:', error);
      throw error;
    }
  }

  async getCodeFileContent(owner, repo, codePath) {
    try {
      const content = await githubService.getFileContent(owner, repo, codePath);
      return content;
    } catch (error) {
      console.error('Error fetching code file content:', error);
      throw error;
    }
  }

  getLectures() {
    return this.lectures;
  }

  getCodeFiles() {
    return this.codeFiles;
  }

  getAssets() {
    return this.assets;
  }

  findLectureByNumber(number) {
    return this.lectures.find(lecture => lecture.number === number);
  }

  getNextLecture(currentNumber) {
    const currentIndex = this.lectures.findIndex(l => l.number === currentNumber);
    if (currentIndex >= 0 && currentIndex < this.lectures.length - 1) {
      return this.lectures[currentIndex + 1];
    }
    return null;
  }

  getPreviousLecture(currentNumber) {
    const currentIndex = this.lectures.findIndex(l => l.number === currentNumber);
    if (currentIndex > 0) {
      return this.lectures[currentIndex - 1];
    }
    return null;
  }

  searchLectures(query) {
    if (!query) return this.lectures;
    
    const lowerQuery = query.toLowerCase();
    return this.lectures.filter(lecture => 
      lecture.name.toLowerCase().includes(lowerQuery) ||
      lecture.path.toLowerCase().includes(lowerQuery)
    );
  }
}

export default new LectureService();
