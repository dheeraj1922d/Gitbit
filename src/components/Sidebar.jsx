import React, { useState } from 'react';
import { FiSearch, FiBookmark, FiCheckCircle, FiCircle, FiX } from 'react-icons/fi';
import { useApp } from '../contexts/AppContext';
import './Sidebar.css';

const Sidebar = ({ lectures, currentLecture, onSelectLecture }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { sidebarOpen, toggleSidebar, isBookmarked, isViewed } = useApp();

  const filteredLectures = lectures.filter(lecture =>
    lecture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lecture.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLecture = (lecture) => {
    onSelectLecture(lecture);
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };

  if (!sidebarOpen) return null;

  return (
    <>
      <div className="sidebar-overlay" onClick={toggleSidebar} />
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Lectures</h2>
          <button className="close-btn" onClick={toggleSidebar} aria-label="Close sidebar">
            <FiX />
          </button>
        </div>

        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search lectures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="lecture-list">
          {filteredLectures.length === 0 ? (
            <div className="no-results">
              <p>No lectures found</p>
            </div>
          ) : (
            filteredLectures.map((lecture) => (
              <div
                key={lecture.number}
                className={`lecture-item ${currentLecture?.number === lecture.number ? 'active' : ''}`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <div className="lecture-item-left">
                  <span className="lecture-number">{lecture.number}</span>
                  <div className="lecture-info">
                    <span className="lecture-name">{lecture.name}</span>
                    <span className="lecture-path">{lecture.path}</span>
                  </div>
                </div>
                <div className="lecture-item-right">
                  {isViewed(lecture.number) && (
                    <FiCheckCircle className="viewed-icon" title="Viewed" />
                  )}
                  {isBookmarked(lecture.number) && (
                    <FiBookmark className="bookmark-icon" title="Bookmarked" />
                  )}
                  {!isViewed(lecture.number) && !isBookmarked(lecture.number) && (
                    <FiCircle className="unviewed-icon" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="sidebar-footer">
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Total:</span>
              <span className="stat-value">{lectures.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Viewed:</span>
              <span className="stat-value">
                {lectures.filter(l => isViewed(l.number)).length}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Bookmarked:</span>
              <span className="stat-value">
                {lectures.filter(l => isBookmarked(l.number)).length}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
