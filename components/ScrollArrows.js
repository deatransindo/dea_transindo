'use client';
import { useState, useEffect } from 'react';
import styles from './ScrollArrows.module.css';

export default function ScrollArrows() {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show scroll-down arrow when near the top (within 300px)
      setShowScrollDown(scrollY < 300);
      // Show scroll-up arrow when near the bottom (within 100px of the bottom)
      setShowScrollUp(scrollY + windowHeight > documentHeight - 1000);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  // Only render the container if at least one button is visible
  if (!showScrollUp && !showScrollDown) return null;

  return (
    <div className={styles.scrollArrows}>
      {showScrollUp && (
        <button
          onClick={scrollToTop}
          className={styles.arrowButton}
          aria-label="Scroll to top"
          title="Ke Atas"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 19V5M12 5L5 12M12 5L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {showScrollDown && (
        <button
          onClick={scrollToBottom}
          className={styles.arrowButton}
          aria-label="Scroll to bottom"
          title="Ke Bawah"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5V19M12 19L19 12M12 19L5 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
