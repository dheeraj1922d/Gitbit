import React, { useState } from 'react';
import { FiGithub, FiCheckCircle } from 'react-icons/fi';
import { useApp } from '../contexts/AppContext';
import './RepoConfig.css';

const RepoConfig = ({ onSubmit }) => {
  const { repoConfig, updateRepoConfig } = useApp();
  const [owner, setOwner] = useState(repoConfig.owner || '');
  const [repo, setRepo] = useState(repoConfig.repo || '');
  const [branch, setBranch] = useState(repoConfig.branch || 'main');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (owner && repo) {
      const config = { owner, repo, branch };
      updateRepoConfig(config);
      onSubmit(config);
    }
  };

  return (
    <div className="repo-config-overlay">
      <div className="repo-config-modal">
        <div className="repo-config-header">
          <FiGithub className="repo-icon" />
          <h2>Configure GitHub Repository</h2>
          <p>Enter the GitHub repository details to fetch lecture notes</p>
        </div>

        <form onSubmit={handleSubmit} className="repo-config-form">
          <div className="form-group">
            <label htmlFor="owner">Repository Owner</label>
            <input
              id="owner"
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="e.g., torvalds"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="repo">Repository Name</label>
            <input
              id="repo"
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder="e.g., linux"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="branch">Branch</label>
            <input
              id="branch"
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="main"
            />
          </div>

          <div className="repo-url-preview">
            <strong>Repository:</strong>{' '}
            {owner && repo ? (
              <a
                href={`https://github.com/${owner}/${repo}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/{owner}/{repo}
              </a>
            ) : (
              <span className="placeholder">github.com/owner/repo</span>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={!owner || !repo}>
            <FiCheckCircle />
            <span>Load Repository</span>
          </button>
        </form>

        <div className="repo-config-footer">
          <p className="info-text">
            <strong>Note:</strong> Make sure the repository contains markdown files (.md) for
            lecture notes and C++ files (.cpp, .h) for code examples.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RepoConfig;
