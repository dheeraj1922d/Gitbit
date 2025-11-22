import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Breadcrumb from './components/Breadcrumb';
import MarkdownViewer from './components/MarkdownViewer';
import CodeViewer from './components/CodeViewer';
import Navigation from './components/Navigation';
import RepoConfig from './components/RepoConfig';
import { useApp } from './contexts/AppContext';
import lectureService from './services/lectureService';
import './App.css';

function App() {
  const { repoConfig, markLectureAsViewed } = useApp();
  const [showConfig, setShowConfig] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [lectureContent, setLectureContent] = useState('');
  const [codeFiles, setCodeFiles] = useState([]);
  const [selectedCodeFile, setSelectedCodeFile] = useState(null);
  const [codeContent, setCodeContent] = useState('');

  useEffect(() => {
    if (!repoConfig.owner || !repoConfig.repo) {
      setShowConfig(true);
    } else {
      loadRepository(repoConfig);
    }
  }, []);

  const loadRepository = async (config) => {
    setLoading(true);
    setError(null);
    try {
      const { lectures: repoLectures, codeFiles: repoCodeFiles } = 
        await lectureService.fetchRepoStructure(config.owner, config.repo, config.branch);
      
      setLectures(repoLectures);
      setCodeFiles(repoCodeFiles);
      
      if (repoLectures.length > 0) {
        loadLecture(config, repoLectures[0]);
      }
      
      setShowConfig(false);
    } catch (err) {
      setError(err.message || 'Failed to load repository');
      console.error('Repository load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadLecture = async (config, lecture) => {
    setLoading(true);
    setError(null);
    try {
      const content = await lectureService.getLectureContent(
        config.owner,
        config.repo,
        lecture.path
      );
      
      setCurrentLecture(lecture);
      setLectureContent(content);
      setSelectedCodeFile(null);
      setCodeContent('');
      
      markLectureAsViewed(lecture.number);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Failed to load lecture');
      console.error('Lecture load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadCodeFile = async (codeFile) => {
    setLoading(true);
    try {
      const content = await lectureService.getCodeFileContent(
        repoConfig.owner,
        repoConfig.repo,
        codeFile.path
      );
      
      setSelectedCodeFile(codeFile);
      setCodeContent(content);
    } catch (err) {
      setError(err.message || 'Failed to load code file');
      console.error('Code file load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (repoConfig.owner && repoConfig.repo) {
      loadRepository(repoConfig);
    }
  };

  const handleSelectLecture = (lecture) => {
    loadLecture(repoConfig, lecture);
  };

  const handleNextLecture = () => {
    if (currentLecture) {
      const next = lectureService.getNextLecture(currentLecture.number);
      if (next) {
        loadLecture(repoConfig, next);
      }
    }
  };

  const handlePreviousLecture = () => {
    if (currentLecture) {
      const prev = lectureService.getPreviousLecture(currentLecture.number);
      if (prev) {
        loadLecture(repoConfig, prev);
      }
    }
  };

  const hasNextLecture = currentLecture && 
    lectureService.getNextLecture(currentLecture.number) !== null;
  
  const hasPreviousLecture = currentLecture && 
    lectureService.getPreviousLecture(currentLecture.number) !== null;

  if (showConfig) {
    return (
      <div className="app">
        <RepoConfig onSubmit={loadRepository} />
      </div>
    );
  }

  return (
    <div className="app">
      <Header onRefresh={handleRefresh} isLoading={loading} />
      
      <div className="app-layout">
        <Sidebar
          lectures={lectures}
          currentLecture={currentLecture}
          onSelectLecture={handleSelectLecture}
        />
        
        <main className="main-content">
          {loading && !lectureContent && (
            <div className="loading-screen">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <h3>Error</h3>
              <p>{error}</p>
              <button onClick={handleRefresh} className="retry-btn">
                Retry
              </button>
            </div>
          )}

          {!loading && !error && currentLecture && (
            <>
              <Breadcrumb repoConfig={repoConfig} currentLecture={currentLecture} />
              
              <div className="content-area">
                <MarkdownViewer content={lectureContent} repoConfig={repoConfig} />
                
                {codeFiles.length > 0 && (
                  <div className="code-files-section">
                    <h2>Related Code Files</h2>
                    <div className="code-files-list">
                      {codeFiles.map((file) => (
                        <button
                          key={file.path}
                          className={`code-file-btn ${
                            selectedCodeFile?.path === file.path ? 'active' : ''
                          }`}
                          onClick={() => loadCodeFile(file)}
                        >
                          {file.name}
                        </button>
                      ))}
                    </div>
                    
                    {selectedCodeFile && codeContent && (
                      <CodeViewer
                        code={codeContent}
                        filename={selectedCodeFile.name}
                        language={selectedCodeFile.type === 'cpp' ? 'cpp' : 'cpp'}
                      />
                    )}
                  </div>
                )}
              </div>

              <Navigation
                currentLecture={currentLecture}
                onNext={handleNextLecture}
                onPrevious={handlePreviousLecture}
                hasNext={hasNextLecture}
                hasPrevious={hasPreviousLecture}
              />
            </>
          )}

          {!loading && !error && !currentLecture && lectures.length === 0 && (
            <div className="empty-state">
              <h2>No Lectures Found</h2>
              <p>The repository doesn't contain any markdown lecture files.</p>
              <button onClick={() => setShowConfig(true)} className="config-btn">
                Configure Repository
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
