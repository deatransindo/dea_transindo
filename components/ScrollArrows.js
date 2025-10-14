// components/ScrollArrows.js
'use client';
import { useState, useEffect } from 'react';
import styles from './ScrollArrows.module.css';

export default function ScrollArrows() {
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowArrows(true);
      } else {
        setShowArrows(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
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

  if (!showArrows) return null;

  return (
    <div className={styles.scrollArrows}>
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
    </div>
  );
}
