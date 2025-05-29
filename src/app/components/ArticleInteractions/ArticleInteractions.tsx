'use client';

import { useState } from 'react';
import styles from './ArticleInteractions.module.css';

interface ArticleInteractionsProps {
  articleTitle?: string;
  articleUrl?: string;
  showShare?: boolean;
  showBackToTop?: boolean;
  showNewsletter?: boolean;
}

const ArticleInteractions = ({ 
  articleTitle = '', 
  articleUrl = '',
  showShare = true,
  showBackToTop = true,
  showNewsletter = true
}: ArticleInteractionsProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleShare = (platform: string) => {
    if (!articleTitle || !articleUrl) return;
    
    const encodedTitle = encodeURIComponent(articleTitle);
    const encodedUrl = encodeURIComponent(articleUrl);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'email':
        shareUrl = `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('请输入邮箱地址');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // 这里可以添加实际的订阅逻辑
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('订阅成功！感谢您的关注。');
      setEmail('');
    } catch (error) {
      setMessage('订阅失败，请稍后重试。');
    } finally {
      setIsSubmitting(false);
    }
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
      {showBackToTop && (
        <div className={styles.backToTop}>
          <button 
            className={styles.backButton}
            onClick={handleBackToTop}
          >
            ↑ Back to Top
          </button>
        </div>
      )}

      {/* Newsletter Form */}
      {showNewsletter && (
        <div className={styles.newsletterSection}>
          <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.newsletterInput}
              disabled={isSubmitting}
            />
            <button 
              type="submit" 
              className={styles.newsletterButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {message && (
            <p className={`${styles.message} ${message.includes('成功') ? styles.success : styles.error}`}>
              {message}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ArticleInteractions; 