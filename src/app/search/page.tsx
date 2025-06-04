'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { dataService } from '../services/dataService';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import SearchSuggestions from '../components/SearchSuggestions/SearchSuggestions';
import AdPlaceholder from '../components/AdPlaceholder/AdPlaceholder';
import { SearchResult, Category } from '../index';
import styles from './page.module.css';
import adsPlaceholderImg from '../ads_300_250.png';
import ClientEffects from '../components/ClientEffects/ClientEffects';

// 由于这是客户端组件，metadata需要在layout中处理
// 或者创建一个单独的metadata文件

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResult, setSearchResult] = useState<SearchResult>({
    articles: [],
    total: 0,
    query: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const result = dataService.searchArticles(query);
    setSearchResult(result);
    setIsLoading(false);
  }, [query]);

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className={styles.highlight}>{part}</mark>
      ) : part
    );
  };

  return (
    <div className={styles.searchPage}>
      {/* 客户端副作用组件 */}
      <ClientEffects />
      {/* Search Header */}
      <section className={styles.searchHeader}>
        <div className="container">
          <div className={styles.searchInfo}>
            <h1 className={styles.searchTitle}>
              {query ? (
                <>
                  Search Results for &quot;{highlightText(query, query)}&quot;
                </>
              ) : (
                'Search Articles'
              )}
            </h1>
            
            {query && (
              <p className={styles.searchMeta}>
                {isLoading ? (
                  'Searching...'
                ) : (
                  <>
                    Found {searchResult.total} {searchResult.total === 1 ? 'article' : 'articles'}
                    {searchResult.total > 0 && ' matching your search'}
                  </>
                )}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 广告位 - 使用组件化设计 */}
      <AdPlaceholder 
        id="seattle-ad-10001"
        imageSrc={adsPlaceholderImg}
        alt="Advertisement"
        width={300}
        height={250}
        backgroundColor="f5f5f5"
      />

      {/* Search Results */}
      <section className={styles.resultsSection}>
        <div className="container">
          {isLoading ? (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner}></div>
              <p>Searching articles...</p>
            </div>
          ) : query && searchResult.total > 0 ? (
            <div className={styles.resultsGrid}>
              {searchResult.articles.map((article, index) => (
                <ArticleCard 
                  key={article.id} 
                  article={{
                    ...article,
                    title: highlightText(article.title, query) as any,
                    description: highlightText(article.description, query) as any
                  }}
                  variant={index === 0 ? "featured" : "default"}
                  showCategory={true}
                  categoryName="Search Result"
                  isFirstCard={index === 0}
                />
              ))}
            </div>
          ) : query && searchResult.total === 0 ? (
            <div className={styles.noResults}>
              <span className={styles.noResultsIcon}>🔍</span>
              <h2 className={styles.noResultsTitle}>No articles found</h2>
              <p className={styles.noResultsDescription}>
                We couldn&apos;t find any articles matching &quot;{query}&quot;. 
                Try different keywords or browse our categories below.
              </p>
              <div className={styles.suggestions}>
                <h3 className={styles.suggestionsTitle}>Try searching for:</h3>
                <SearchSuggestions 
                  suggestions={['home gym', 'budget workout', 'family fitness', 'bodyweight', 'motivation']}
                />
              </div>
            </div>
          ) : (
            <div className={styles.emptySearch}>
              <span className={styles.emptyIcon}>💡</span>
              <h2 className={styles.emptyTitle}>Start Your Search</h2>
              <p className={styles.emptyDescription}>
                Enter keywords in the search box above to find articles about home fitness, 
                workout equipment, family exercises, and more.
              </p>
              <div className={styles.popularSearches}>
                <h3 className={styles.popularTitle}>Popular Searches:</h3>
                <div className={styles.popularTags}>
                  <span className={styles.popularTag}>Home Gym Setup</span>
                  <span className={styles.popularTag}>Budget Equipment</span>
                  <span className={styles.popularTag}>Kids Workouts</span>
                  <span className={styles.popularTag}>No Equipment</span>
                  <span className={styles.popularTag}>Motivation Tips</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Browse Categories */}
      {(!query || searchResult.total === 0) && (
        <section className={styles.categoriesSection}>
          <div className="container">
            <h2 className={styles.categoriesTitle}>Browse by Category</h2>
            <div className={styles.categoriesGrid}>
              {dataService.getAllData().categories.map((category: Category) => (
                <a 
                  key={category.id}
                  href={`/category/${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                  className={styles.categoryCard}
                >
                  <span className={styles.categoryIcon}>
                    {category.name === 'Affordable Home Gym Setups' ? '💰' :
                     category.name === 'Family & Kids Friendly Workouts' ? '👨‍👩‍👧‍👦' :
                     category.name === 'Strength Training Without Equipment' ? '💪' :
                     category.name === 'Motivation & Habit Building Tips' ? '🧠' : '🏠'}
                  </span>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                  <p className={styles.categoryCount}>
                    {category.articles.length} articles
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
} 