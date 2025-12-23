'use client';

import LazyImage from '../LazyImage';
import { Article } from '../../index';
import { generateArticleSlug } from '@/utils';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
  showCategory?: boolean;
  categoryName?: string;
  isFirstCard?: boolean;
  highlightedTitle?: React.ReactNode; // 可选的高亮标题
  highlightedDescription?: React.ReactNode; // 可选的高亮描述
}

const ArticleCard = ({ 
  article, 
  variant = 'default', 
  showCategory = false, 
  categoryName,
  isFirstCard = false,
  highlightedTitle,
  highlightedDescription
}: ArticleCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 确保title是字符串（用于alt属性等）
  const getTitleString = (): string => {
    if (typeof article.title === 'string') {
      return article.title;
    }
    // 如果是React元素，提取文本内容
    if (highlightedTitle && typeof highlightedTitle === 'object') {
      const extractText = (node: any): string => {
        if (typeof node === 'string') return node;
        if (typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(extractText).join('');
        if (node && typeof node === 'object' && node.props?.children) {
          return extractText(node.props.children);
        }
        return '';
      };
      return extractText(highlightedTitle) || String(article.title);
    }
    return String(article.title || '');
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/article/${generateArticleSlug(article.id, article.title)}`;
  };

  const cardClassName = `${styles.card} ${styles[variant]} ${isFirstCard ? styles.firstCard : ''}`;

  return (
    <article className={cardClassName}>
      <a href={`/article/${generateArticleSlug(article.id, article.title)}`} className={styles.cardLink} onClick={handleCardClick}>
        {/* Image */}
        <div className={styles.imageContainer}>
          <LazyImage
            src={article.imageUrl}
            alt={getTitleString()}
            fill
            className={styles.image}
            priority={variant === 'featured' || isFirstCard}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="none"
            rootMargin="100px"
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
              {highlightedTitle || article.title}
            </h3>
          )}
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* 非featured变体的标题 */}
          {variant !== 'featured' && (
            <h3 className={styles.title}>
              {highlightedTitle || article.title}
            </h3>
          )}
          
          <p className={styles.description}>
            {highlightedDescription || article.description}
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