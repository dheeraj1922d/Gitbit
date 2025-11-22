import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { FiDownload, FiCopy, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import './CodeViewer.css';

const CodeViewer = ({ code, filename, language = 'cpp' }) => {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (codeRef.current && code) {
      const highlighted = hljs.highlight(code, { language }).value;
      codeRef.current.innerHTML = highlighted;
    }
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'code.cpp';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  if (!code) {
    return (
      <div className="code-viewer empty">
        <p>No code available</p>
      </div>
    );
  }

  return (
    <div className={`code-viewer ${fullscreen ? 'fullscreen' : ''}`}>
      <div className="code-header">
        <span className="code-filename">{filename || 'code.cpp'}</span>
        <div className="code-actions">
          <button className="action-btn" onClick={handleCopy} title="Copy code">
            <FiCopy />
            {copied && <span className="action-label">Copied!</span>}
          </button>
          <button className="action-btn" onClick={handleDownload} title="Download file">
            <FiDownload />
          </button>
          <button className="action-btn" onClick={toggleFullscreen} title="Toggle fullscreen">
            {fullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
          </button>
        </div>
      </div>
      <div className="code-content">
        <pre>
          <code ref={codeRef} className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeViewer;
