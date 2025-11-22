import React, { createContext, useContext, useState, useEffect } from 'react';
import localforage from 'localforage';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [repoConfig, setRepoConfig] = useState({
    owner: '',
    repo: '',
    branch: 'main',
  });
  const [viewedLectures, setViewedLectures] = useState(new Set());
  const [bookmarks, setBookmarks] = useState(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load settings from localStorage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTheme = await localforage.getItem('theme');
        const savedFontSize = await localforage.getItem('fontSize');
        const savedRepoConfig = await localforage.getItem('repoConfig');
        const savedViewedLectures = await localforage.getItem('viewedLectures');
        const savedBookmarks = await localforage.getItem('bookmarks');

        if (savedTheme) setTheme(savedTheme);
        if (savedFontSize) setFontSize(savedFontSize);
        if (savedRepoConfig) setRepoConfig(savedRepoConfig);
        if (savedViewedLectures) setViewedLectures(new Set(savedViewedLectures));
        if (savedBookmarks) setBookmarks(new Set(savedBookmarks));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  // Save theme
  useEffect(() => {
    localforage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Save fontSize
  useEffect(() => {
    localforage.setItem('fontSize', fontSize);
    document.documentElement.setAttribute('data-fontsize', fontSize);
  }, [fontSize]);

  // Save repoConfig
  useEffect(() => {
    if (repoConfig.owner && repoConfig.repo) {
      localforage.setItem('repoConfig', repoConfig);
    }
  }, [repoConfig]);

  // Save viewedLectures
  useEffect(() => {
    localforage.setItem('viewedLectures', Array.from(viewedLectures));
  }, [viewedLectures]);

  // Save bookmarks
  useEffect(() => {
    localforage.setItem('bookmarks', Array.from(bookmarks));
  }, [bookmarks]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeFontSize = (size) => {
    setFontSize(size);
  };

  const updateRepoConfig = (config) => {
    setRepoConfig(config);
  };

  const markLectureAsViewed = (lectureNumber) => {
    setViewedLectures(prev => new Set([...prev, lectureNumber]));
  };

  const toggleBookmark = (lectureNumber) => {
    setBookmarks(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(lectureNumber)) {
        newBookmarks.delete(lectureNumber);
      } else {
        newBookmarks.add(lectureNumber);
      }
      return newBookmarks;
    });
  };

  const isBookmarked = (lectureNumber) => {
    return bookmarks.has(lectureNumber);
  };

  const isViewed = (lectureNumber) => {
    return viewedLectures.has(lectureNumber);
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const value = {
    theme,
    toggleTheme,
    fontSize,
    changeFontSize,
    repoConfig,
    updateRepoConfig,
    viewedLectures,
    markLectureAsViewed,
    bookmarks,
    toggleBookmark,
    isBookmarked,
    isViewed,
    sidebarOpen,
    toggleSidebar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
