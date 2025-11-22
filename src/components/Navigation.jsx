import React from 'react';
import { FiChevronLeft, FiChevronRight, FiBookmark } from 'react-icons/fi';
import { useApp } from '../contexts/AppContext';
import './Navigation.css';

const Navigation = ({ currentLecture, onPrevious, onNext, hasNext, hasPrevious }) => {
  const { toggleBookmark, isBookmarked } = useApp();

  if (!currentLecture) return null;

  const handleBookmark = () => {
    toggleBookmark(currentLecture.number);
  };

  return (
    <div className="navigation">
      <button
        className="nav-btn prev-btn"
        onClick={onPrevious}
        disabled={!hasPrevious}
        aria-label="Previous lecture"
      >
        <FiChevronLeft />
        <span>Previous</span>
      </button>

      <button
        className={`bookmark-btn ${isBookmarked(currentLecture.number) ? 'bookmarked' : ''}`}
        onClick={handleBookmark}
        aria-label="Toggle bookmark"
      >
        <FiBookmark />
        <span>{isBookmarked(currentLecture.number) ? 'Bookmarked' : 'Bookmark'}</span>
      </button>

      <button
        className="nav-btn next-btn"
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Next lecture"
      >
        <span>Next</span>
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Navigation;
