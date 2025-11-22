import React from 'react';
import { FiMenu, FiMoon, FiSun, FiGithub, FiRefreshCw } from 'react-icons/fi';
import { useApp } from '../contexts/AppContext';
import './Header.css';

const Header = ({ onRefresh, isLoading }) => {
  const { theme, toggleTheme, toggleSidebar, fontSize, changeFontSize } = useApp();

  return (
    <header className="header">
      <div className="header-left">
        <button className="icon-btn menu-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <FiMenu />
        </button>
        <div className="logo">
          <FiGithub className="logo-icon" />
          <h1>GitBit</h1>
        </div>
      </div>

      <div className="header-center">
        <span className="subtitle">C++ Lecture Notes Viewer</span>
      </div>

      <div className="header-right">
        <div className="font-size-controls">
          <button 
            className={`font-btn ${fontSize === 'small' ? 'active' : ''}`}
            onClick={() => changeFontSize('small')}
            aria-label="Small font"
          >
            A
          </button>
          <button 
            className={`font-btn ${fontSize === 'medium' ? 'active' : ''}`}
            onClick={() => changeFontSize('medium')}
            aria-label="Medium font"
          >
            A
          </button>
          <button 
            className={`font-btn ${fontSize === 'large' ? 'active' : ''}`}
            onClick={() => changeFontSize('large')}
            aria-label="Large font"
          >
            A
          </button>
        </div>

        <button 
          className="icon-btn refresh-btn" 
          onClick={onRefresh}
          disabled={isLoading}
          aria-label="Refresh content"
        >
          <FiRefreshCw className={isLoading ? 'spinning' : ''} />
        </button>

        <button className="icon-btn theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </button>
      </div>
    </header>
  );
};

export default Header;
