'use client';

import { useState, useEffect } from 'react';
import { Article } from '../../index';
import ArticleCard from '../ArticleCard/ArticleCard';

interface ArticlesGridProps {
  articles: Article[];
  showCategory?: boolean;
  gridClassName?: string;
}

const ArticlesGrid = ({ articles, showCategory = false, gridClassName }: ArticlesGridProps) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // 检测是否为移动端
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <div className={gridClassName}>
      {articles.map((article, index) => (
        <ArticleCard 
          key={article.id} 
          article={article}
          variant={index === 0 && !isMobile ? "featured" : "default"}
          showCategory={showCategory}
          isFirstCard={index === 0}
        />
      ))}
    </div>
  );
};

export default ArticlesGrid; 