import React from 'react';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import './Breadcrumb.css';

const Breadcrumb = ({ repoConfig, currentLecture }) => {
  return (
    <nav className="breadcrumb">
      <div className="breadcrumb-item">
        <FiHome className="breadcrumb-icon" />
        <span>{repoConfig.owner}/{repoConfig.repo}</span>
      </div>
      
      {currentLecture && (
        <>
          <FiChevronRight className="breadcrumb-separator" />
          <div className="breadcrumb-item active">
            <span>Lecture {currentLecture.number}</span>
          </div>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;
