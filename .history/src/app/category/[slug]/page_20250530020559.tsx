import { notFound } from 'next/navigation';
import { dataService } from '../../services/dataService';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import styles from './page.module.css';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = dataService.getCategoryByName(params.slug);

  if (!category) {
    notFound();
  }

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Affordable Home Gym Setups':
        return '💰';
      case 'Family & Kids Friendly Workouts':
        return '👨‍👩‍👧‍👦';
      case 'Strength Training Without Equipment':
        return '💪';
      case 'Motivation & Habit Building Tips':
        return '🧠';
      default:
        return '🏠';
    }
  };

  const getCategoryDescription = (categoryName: string) => {
    switch (categoryName) {
      case 'Affordable Home Gym Setups':
        return 'Build your perfect home gym without breaking the bank. Discover budget-friendly equipment, space-saving solutions, and DIY hacks that deliver professional results.';
      case 'Family & Kids Friendly Workouts':
        return 'Fun, engaging workouts that get the whole family moving. From dance parties to obstacle courses, create healthy habits that everyone will love.';
      case 'Strength Training Without Equipment':
        return 'Build muscle and strength using just your bodyweight. Master progressive exercises that challenge you without requiring any equipment.';
      case 'Motivation & Habit Building Tips':
        return 'Stay consistent and motivated on your fitness journey. Learn proven strategies to build lasting habits and overcome common obstacles.';
      default:
        return 'Discover amazing fitness content tailored to your needs.';
    }
  };

  return (
    <div className={styles.categoryPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.categoryIcon}>
              {getCategoryIcon(category.name)}
            </span>
            <h1 className={styles.categoryTitle}>{category.name}</h1>
            <p className={styles.categoryDescription}>
              {getCategoryDescription(category.name)}
            </p>
            <div className={styles.categoryStats}>
              <span className={styles.articleCount}>
                {category.articles.length} Articles
              </span>
              <span className={styles.separator}>•</span>
              <span className={styles.readTime}>
                {Math.ceil(category.articles.length * 3)} min total read time
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className={styles.articlesSection}>
        <div className="container">
          <div className={styles.articlesHeader}>
            <h2 className={styles.articlesTitle}>All Articles</h2>
            <div className={styles.sortOptions}>
              <span className={styles.sortLabel}>Sort by:</span>
              <select className={styles.sortSelect}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
          
          <div className={styles.articlesGrid}>
            {category.articles.map((article, index) => (
              <ArticleCard 
                key={article.id} 
                article={article}
                variant={index === 0 ? "featured" : "default"}
                showCategory={false}
              />
            ))}
          </div>

          {category.articles.length === 0 && (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📝</span>
              <h3 className={styles.emptyTitle}>No articles yet</h3>
              <p className={styles.emptyDescription}>
                We&apos;re working on adding more content to this category. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className={styles.relatedSection}>
        <div className="container">
          <h2 className={styles.relatedTitle}>Explore Other Categories</h2>
          <div className={styles.relatedGrid}>
            {dataService.getAllData().categories
              .filter(cat => cat.name !== category.name)
              .map(relatedCategory => (
                <a 
                  key={relatedCategory.id}
                  href={`/category/${relatedCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                  className={styles.relatedCard}
                >
                  <span className={styles.relatedIcon}>
                    {getCategoryIcon(relatedCategory.name)}
                  </span>
                  <h3 className={styles.relatedName}>{relatedCategory.name}</h3>
                  <p className={styles.relatedCount}>
                    {relatedCategory.articles.length} articles
                  </p>
                </a>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = [
    'affordable-home-gym-setups',
    'family-kids-friendly-workouts', 
    'strength-training-without-equipment',
    'motivation-habit-building-tips'
  ];

  return categories.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each category page
export async function generateMetadata({ params }: CategoryPageProps) {
  const category = dataService.getCategoryByName(params.slug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.'
    };
  }

  return {
    title: `${category.name} - Home Fitness`,
    description: `Discover ${category.articles.length} articles about ${category.name.toLowerCase()}. Expert tips and guides for your home fitness journey.`,
    keywords: `${category.name.toLowerCase()}, home fitness, workout tips, exercise guides`,
  };
} 