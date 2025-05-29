'use client';

import { useState, useEffect } from 'react';
import styles from './BackToTop.module.css';

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 当用户向下滚动超过300px时显示按钮
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {showButton && (
        <div className={styles.backToTop}>
          <button 
            className={styles.backButton}
            onClick={handleBackToTop}
            title="Back to Top"
          >
            ↑
          </button>
        </div>
      )}
    </>
  );
};

export default BackToTop; 