'use client';

import { useState, useEffect, useCallback } from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import { Article } from '../../types';
import styles from './HeroBanner.module.css';

interface HeroBannerProps {
  articles: Article[];
  autoPlayInterval?: number;
}

const HeroBanner = ({ articles, autoPlayInterval = 4000 }: HeroBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 显示的文章数量（取前4个）
  const displayArticles = articles.slice(0, 4);

  // 下一张
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % displayArticles.length);
  }, [displayArticles.length]);

  // 上一张
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + displayArticles.length) % displayArticles.length);
  }, [displayArticles.length]);

  // 跳转到指定索引
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // 键盘导航支持
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      nextSlide();
    } else if (event.key === 'ArrowLeft') {
      prevSlide();
    } else if (event.key >= '1' && event.key <= '4') {
      const index = parseInt(event.key) - 1;
      if (index < displayArticles.length) {
        goToSlide(index);
      }
    }
  }, [nextSlide, prevSlide, goToSlide, displayArticles.length]);

  // 自动播放
  useEffect(() => {
    if (!isAutoPlaying || displayArticles.length <= 1) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval, isAutoPlaying, displayArticles.length]);

  // 键盘事件监听
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // 鼠标悬停时暂停自动播放
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // 错误处理：如果没有文章，显示占位符
  if (!displayArticles || displayArticles.length === 0) {
    return (
      <section className={styles.heroBanner}>
        <div className={styles.bannerContainer}>
          <div className={styles.emptyState}>
            <h2>No Articles Available</h2>
            <p>Content is being prepared, please check back later</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className={styles.heroBanner}
      role="banner"
      aria-label="Article carousel banner"
    >
      <div className={styles.bannerContainer}>
        {/* 轮播内容 */}
        <div 
          className={styles.sliderWrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="region"
          aria-label="Article carousel"
          aria-live="polite"
        >
          <div 
            className={styles.slider}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            role="tabpanel"
            aria-describedby="carousel-instructions"
          >
            {displayArticles.map((article, index) => (
              <div 
                key={article.id} 
                className={styles.slide}
                aria-hidden={index !== currentIndex}
              >
                <div className={styles.slideContent}>
                  <div className={styles.slideText}>
                    <h2 className={styles.slideTitle}>{article.title}</h2>
                    <p className={styles.slideDescription}>{article.description}</p>
                    <div className={styles.slideMeta}>
                      <span className={styles.slideDuration}>{article.duration}</span>
                      <time 
                        className={styles.slideDate}
                        dateTime={article.createTime}
                      >
                        {new Date(article.createTime).toLocaleDateString('en-US')}
                      </time>
                    </div>
                  </div>
                  <div className={styles.slideImage}>
                    <ArticleCard 
                      article={article} 
                      variant="featured"
                      showCategory={false}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 导航按钮 */}
          {displayArticles.length > 1 && (
            <>
              <button 
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={prevSlide}
                aria-label="View previous article"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={nextSlide}
                aria-label="View next article"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}
        </div>

        {/* 指示器 */}
        {displayArticles.length > 1 && (
          <div 
            className={styles.indicators}
            role="tablist"
            aria-label="Carousel indicators"
          >
            {displayArticles.map((article, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to article ${index + 1}: ${article.title}`}
                type="button"
              />
            ))}
          </div>
        )}

        {/* 屏幕阅读器说明 */}
        <div id="carousel-instructions" className="sr-only" style={{display: 'none'}}>
          Use left and right arrow keys to navigate, or press number keys 1-4 to jump directly to the corresponding article
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;