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
              
              <p className={styles.articleDescription}>
                {article.description}
              </p>
            </header>

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
            {/* Quick Navigation */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Quick Navigation</h3>
              <nav className={styles.quickNav}>
                <Link href="/" className={styles.navLink}>
                  🏠 Home
                </Link>
                <Link href="/category/affordable-home-gym-setups" className={styles.navLink}>
                  💰 Budget Gym Setups
                </Link>
                <Link href="/category/family-kids-friendly-workouts" className={styles.navLink}>
                  👨‍👩‍👧‍👦 Family Workouts
                </Link>
                <Link href="/category/strength-training-without-equipment" className={styles.navLink}>
                  💪 Bodyweight Training
                </Link>
                <Link href="/category/motivation-habit-building-tips" className={styles.navLink}>
                  🧠 Motivation Tips
                </Link>
              </nav>
            </div>

            {/* Popular Articles */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Popular This Week</h3>
              <div className={styles.popularList}>
                {dataService.getAllArticles().slice(0, 3).map((popularArticle, index) => (
                  <Link 
                    key={popularArticle.id}
                    href={`/article/${popularArticle.id}`}
                    className={styles.popularItem}
                  >
                    <span className={styles.popularNumber}>{index + 1}</span>
                    <div className={styles.popularContent}>
                      <h4 className={styles.popularTitle}>
                        {popularArticle.title.length > 60 
                          ? popularArticle.title.substring(0, 60) + '...'
                          : popularArticle.title
                        }
                      </h4>
                      <span className={styles.popularDuration}>
                        {popularArticle.duration}
                      </span>
                    </div>
                  </Link>
                ))}
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
    keywords: `${article.title.toLowerCase()}, home fitness, workout tips, exercise guides`,
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