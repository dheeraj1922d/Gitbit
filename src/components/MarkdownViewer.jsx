import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import './MarkdownViewer.css';

const MarkdownViewer = ({ content, repoConfig }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!content) return;

    // Configure marked
    marked.setOptions({
      highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(code, { language: lang }).value;
          } catch (err) {
            console.error('Highlight error:', err);
          }
        }
        return hljs.highlightAuto(code).value;
      },
      breaks: true,
      gfm: true,
    });

    // Process content to fix image URLs
    let processedContent = content;
    
    // Replace relative image URLs with absolute GitHub URLs
    if (repoConfig.owner && repoConfig.repo) {
      const baseUrl = `https://raw.githubusercontent.com/${repoConfig.owner}/${repoConfig.repo}/${repoConfig.branch}`;
      
      // Match markdown images: ![alt](path)
      processedContent = processedContent.replace(
        /!\[([^\]]*)\]\((?!http)([^)]+)\)/g,
        (match, alt, path) => {
          const cleanPath = path.startsWith('/') ? path : `/${path}`;
          return `![${alt}](${baseUrl}${cleanPath})`;
        }
      );

      // Match HTML images: <img src="path">
      processedContent = processedContent.replace(
        /<img([^>]*?)src="(?!http)([^"]+)"([^>]*?)>/g,
        (match, before, src, after) => {
          const cleanPath = src.startsWith('/') ? src : `/${src}`;
          return `<img${before}src="${baseUrl}${cleanPath}"${after}>`;
        }
      );
    }

    // Render markdown
    const html = marked.parse(processedContent);
    if (contentRef.current) {
      contentRef.current.innerHTML = html;

      // Add copy buttons to code blocks
      addCopyButtons();
    }
  }, [content, repoConfig]);

  const addCopyButtons = () => {
    if (!contentRef.current) return;

    const codeBlocks = contentRef.current.querySelectorAll('pre code');
    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      
      // Skip if button already exists
      if (pre.querySelector('.copy-btn')) return;

      const button = document.createElement('button');
      button.className = 'copy-btn';
      button.innerHTML = '📋 Copy';
      button.addEventListener('click', () => {
        const code = codeBlock.textContent;
        navigator.clipboard.writeText(code).then(() => {
          button.innerHTML = '✅ Copied!';
          setTimeout(() => {
            button.innerHTML = '📋 Copy';
          }, 2000);
        });
      });

      pre.style.position = 'relative';
      pre.appendChild(button);
    });
  };

  if (!content) {
    return (
      <div className="markdown-viewer empty">
        <p>No content available</p>
      </div>
    );
  }

  return (
    <div className="markdown-viewer">
      <div ref={contentRef} className="markdown-content" />
    </div>
  );
};

export default MarkdownViewer;
