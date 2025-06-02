import { notFound } from 'next/navigation';
import OptimizedImage from '../../components/OptimizedImage';
import Link from 'next/link';
import { dataService } from '../../services/dataService';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import ArticleInteractions from '../../components/ArticleInteractions/ArticleInteractions';
import styles from './page.module.css';

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    // Split content by double newlines to create paragraphs
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Handle headers (lines starting with ##)
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className={styles.contentHeading}>
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      
      // Handle subheaders (lines starting with ###)
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className={styles.contentSubheading}>
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      
      // Handle lists (lines starting with -)
      if (paragraph.includes('\n- ')) {
        const listItems = paragraph.split('\n- ').filter(item => item.trim());
        return (
          <ul key={index} className={styles.contentList}>
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className={styles.contentListItem}>
                {item.replace(/^- /, '')}
              </li>
            ))}
          </ul>
        );
      }
      
      // Regular paragraphs
      if (paragraph.trim()) {
        return (
          <p key={index} className={styles.contentParagraph}>
            {paragraph}
          </p>
        );
      }
      
      return null;
    }).filter(Boolean);
  };

  return (
    <div className={styles.articlePage}>
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

            {/* Advertisement Section */}
            <section className={styles.adSection}>
              <div className={styles.adContainer}>
                <div className={styles.adPlaceholder}>
                  📢 Advertisement Space - 广告位预留区域
                </div>
              </div>
            </section>

            {/* Featured Image */}
            <div className={styles.articleImage}>
              <OptimizedImage
                src={article.imageUrl}
                alt={article.title}
                fill
                className={styles.image}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
              />
            </div>

            {/* Article Content */}
            <div className={styles.articleContent}>
              {formatContent(article.content)}
            </div>

            {/* Article Footer */}
            <footer className={styles.articleFooter}>
              <ArticleInteractions 
                articleTitle={article.title}
                articleUrl={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/article/${article.id}`}
                showShare={false}
                showBackToTop={true}
              />
            </footer>
          </article>

          {/* Sidebar */}
          <aside className={styles.articleSidebar}>
            {/* Popular Articles */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Popular This Week</h3>
              <div className={styles.popularList}>
                {dataService.getPopularArticlesFromDifferentCategories(10).map((popularArticle, index) => {
                  const category = dataService.getArticleCategory(popularArticle.id);
                  const categoryShortName = category ? dataService.getCategoryShortName(category.name) : '';
                  
                  return (
                    <Link 
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
                    </Link>
                  );
                })}
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