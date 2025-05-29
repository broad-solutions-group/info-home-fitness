'use client';

import { useState, useEffect } from 'react';
import styles from './ArticleInteractions.module.css';

interface ArticleInteractionsProps {
  articleTitle?: string;
  articleUrl?: string;
  showShare?: boolean;
  showBackToTop?: boolean;
}

const ArticleInteractions = ({ 
  articleTitle, 
  articleUrl, 
  showShare = true,
  showBackToTop = true
}: ArticleInteractionsProps) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 当用户向下滚动超过300px时显示按钮
      setShowButton(window.scrollY > 300);
    };

    if (showBackToTop) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showBackToTop]);

  const handleShare = (platform: string) => {
    if (!articleTitle || !articleUrl) return;
    
    const encodedTitle = encodeURIComponent(articleTitle);
    const encodedUrl = encodeURIComponent(articleUrl);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`;
        break;
      default:
        return;
    }
    
    if (platform === 'email') {
      window.location.href = shareUrl;
    } else {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Share Section */}
      {showShare && articleTitle && articleUrl && (
        <div className={styles.shareSection}>
          <h3 className={styles.shareTitle}>Share this article</h3>
          <div className={styles.shareButtons}>
            <button 
              className={styles.shareButton}
              onClick={() => handleShare('email')}
            >
              📧 Email
            </button>
            <button 
              className={styles.shareButton}
              onClick={() => handleShare('twitter')}
            >
              🐦 Twitter
            </button>
            <button 
              className={styles.shareButton}
              onClick={() => handleShare('facebook')}
            >
              📘 Facebook
            </button>
            <button 
              className={styles.shareButton}
              onClick={() => handleShare('linkedin')}
            >
              💼 LinkedIn
            </button>
          </div>
        </div>
      )}
      
      {/* Back to Top */}
      {showBackToTop && showButton && (
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

export default ArticleInteractions;