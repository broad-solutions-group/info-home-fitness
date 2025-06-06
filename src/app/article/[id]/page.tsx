import { notFound } from 'next/navigation';
import { dataService } from '../../services/dataService';
import LazyImage from '../../components/LazyImage/LazyImage';
import AdPlaceholder from '../../components/AdPlaceholder/AdPlaceholder';
import RefreshLink from '../../components/RefreshLink/RefreshLink';
import { DynamicArticleInteractions } from '../../components/DynamicComponents/DynamicComponents';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import styles from './page.module.css';
import adsPlaceholderImg from '../../ads_300_250.png';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import ClientEffects from '@/app/components/ClientEffects/ClientEffects';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const articleId = parseInt(params.id);
  const article = dataService.getArticleById(articleId);

  if (!article) {
    notFound();
  }

  const relatedArticles = dataService.getRelatedArticles(articleId, 6);
  const recommendedArticles = dataService.getRecommendedArticles(articleId, 6);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.articlePage}>
      {/* 客户端副作用组件 */}
      <ClientEffects />
      <div className="container">
        <div className={styles.articleLayout}>
          {/* Main Content */}
          <article className={styles.articleMain}>
            {/* Article Header */}
            <header className={styles.articleHeader}>
              <div className={styles.articleMeta}>
                <time className={styles.articleDate}>
                  {formatDate(article.createTime)}
                </time>
                <span className={styles.articleDuration}>
                  {article.duration} read
                </span>
              </div>
              
              <h1 className={styles.articleTitle}>{article.title}</h1>
            </header>

            {/* 广告位 - 使用组件化设计 */}
            <AdPlaceholder 
              id="seattle-ad-10001"
              imageSrc={adsPlaceholderImg}
              alt="Advertisement"
              width={300}
              height={250}
            />

            {/* Featured Image */}
            <div className={styles.articleImage}>
              <LazyImage
                src={article.imageUrl}
                alt={article.title}
                fill
                className={styles.image}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                placeholder="skeleton"
              />
            </div>

            {/* Article Content */}
            <div className={styles.articleContent}>
              <MarkdownRenderer content={article.content} />
            </div>

            {/* Article Footer */}
            <footer className={styles.articleFooter}>
              <DynamicArticleInteractions 
                articleTitle={article.title}
                articleUrl={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/article/${article.id}`}
                showShare={false}
                showBackToTop={true}
              />
            </footer>
          </article>

          {/* Sidebar */}
          <aside className={styles.articleSidebar}>
            {/* Popular Articles & More Recommend */}
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarContent}>
                {/* Popular This Week */}
                <h3 className={styles.sidebarTitle}>Popular This Week</h3>
                
                {/* Popular Articles */}
                <div className={styles.popularSection}>
                  {dataService.getPopularArticlesFromDifferentCategories(3).map((popularArticle, index) => {
                    const category = dataService.getArticleCategory(popularArticle.id);
                    const categoryShortName = category ? dataService.getCategoryShortName(category.name) : '';
                    
                    return (
                      <RefreshLink 
                        key={popularArticle.id}
                        href={`/article/${popularArticle.id}`}
                        className={styles.popularItem}
                      >
                        <span className={styles.popularNumber}>{index + 1}</span>
                        <div className={styles.popularContent}>
                          <h4 className={styles.popularTitle}>
                            {popularArticle.title}
                          </h4>
                          <div className={styles.popularMeta}>
                            {categoryShortName && (
                              <span className={styles.popularCategory}>
                                {categoryShortName}
                              </span>
                            )}
                            <span className={styles.popularDuration}>
                              {popularArticle.duration}
                            </span>
                          </div>
                        </div>
                      </RefreshLink>
                    );
                  })}
                </div>

                {/* More Recommend */}
                <h3 className={styles.sidebarTitle}>More Recommend</h3>
                
                {/* More Recommend Articles */}
                <div className={styles.recommendSection}>
                  {recommendedArticles && recommendedArticles.length > 0 && 
                    recommendedArticles.map((recommendedArticle) => {
                      const category = dataService.getArticleCategory(recommendedArticle.id);
                      const categoryShortName = category ? dataService.getCategoryShortName(category.name) : '';
                      
                      return (
                        <RefreshLink 
                          key={recommendedArticle.id}
                          href={`/article/${recommendedArticle.id}`}
                          className={styles.recommendItem}
                        >
                          <div className={styles.recommendContent}>
                            <h4 className={styles.recommendTitle}>
                              {recommendedArticle.title}
                            </h4>
                            <p className={styles.recommendDescription}>
                              {recommendedArticle.description}
                            </p>
                            <div className={styles.recommendMeta}>
                              {categoryShortName && (
                                <span className={styles.recommendCategory}>
                                  {categoryShortName}
                                </span>
                              )}
                              <span className={styles.recommendDuration}>
                                {recommendedArticle.duration}
                              </span>
                            </div>
                          </div>
                          <div className={styles.recommendImage}>
                            <LazyImage
                              src={recommendedArticle.imageUrl}
                              alt={recommendedArticle.title}
                              fill
                              sizes="(max-width: 1024px) 80px, 160px"
                              placeholder="skeleton"
                              rootMargin="50px"
                            />
                          </div>
                        </RefreshLink>
                      );
                    })
                  }
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className={styles.relatedSection}>
          <div className="container">
            <h2 className={styles.relatedTitle}>You Might Also Like</h2>
            <div className={styles.relatedGrid}>
              {relatedArticles.map(relatedArticle => (
                <ArticleCard 
                  key={relatedArticle.id} 
                  article={relatedArticle}
                  variant="default"
                  showCategory={true}
                  categoryName="Related"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Generate static params for all articles
export async function generateStaticParams() {
  const allArticles = dataService.getAllArticles();
  
  return allArticles.map((article) => ({
    id: article.id.toString(),
  }));
}

// Generate metadata for each article
export async function generateMetadata({ params }: ArticlePageProps) {
  const articleId = parseInt(params.id);
  const article = dataService.getArticleById(articleId);
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    };
  }

  return {
    title: `${article.title} - Home Fitness`,
    description: article.description,
    keywords: `${article.title.toLowerCase()}, home fitness, workout tips, exercise guides, cheap home gym, home gym setup, small space gym ideas, home workout gear, no gym equipment, affordable home gym, diy gym space, compact workout space, budget workout tools, small apartment workouts, indoor kid workouts, fun family fitness, kids exercise ideas, family fitness time, living room workouts, home family exercises, bodyweight muscle building, no equipment strength, home workouts, no gear fitness, body resistance workouts, home strength plans, core workouts, no equipment abs, quick full-body workout, bodyweight burn, at-home routine, squat variations, home leg training, bodyweight strength, full body training, calisthenics workout, home fitness motivation, stay consistent, 5-minute workout, habit forming tip, morning workouts, sustainable workouts, fitness hacks`,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [article.imageUrl],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.imageUrl],
    }
  };
} 