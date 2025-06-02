'use client';

import OptimizedImage from '../OptimizedImage';
import { Article } from '../../types';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
  showCategory?: boolean;
  categoryName?: string;
  isFirstCard?: boolean;
}

const ArticleCard = ({ 
  article, 
  variant = 'default', 
  showCategory = false, 
  categoryName,
  isFirstCard = false
}: ArticleCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/article/${article.id}`;
  };

  const cardClassName = `${styles.card} ${styles[variant]} ${isFirstCard ? styles.firstCard : ''}`;

  return (
    <article className={cardClassName}>
      <a href={`/article/${article.id}`} className={styles.cardLink} onClick={handleCardClick}>
        {/* Image */}
        <div className={styles.imageContainer}>
          <OptimizedImage
            src={article.imageUrl}
            alt={article.title}
            fill
            className={styles.image}
            priority={variant === 'featured'}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Category标签移到图片左上角 */}
          {showCategory && categoryName && (
            <span className={styles.categoryOverlay}>{categoryName}</span>
          )}
          
          <div className={styles.imageOverlay}>
            <span className={styles.duration}>{article.duration}</span>
          </div>
          
          {/* Featured变体的标题覆盖层 */}
          {variant === 'featured' && (
            <h3 className={styles.overlayTitle}>
              {article.title}
            </h3>
          )}
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* 非featured变体的标题 */}
          {variant !== 'featured' && (
            <h3 className={styles.title}>
              {article.title}
            </h3>
          )}
          
          <p className={styles.description}>
            {article.description}
          </p>
          
          {/* Meta区域：日期和Read More并排两端对齐 */}
          <div className={styles.meta}>
            <time className={styles.date}>
              {formatDate(article.createTime)}
            </time>
            <span className={styles.readMore}>Read More →</span>
          </div>
        </div>
      </a>
    </article>
  );
};

export default ArticleCard; 