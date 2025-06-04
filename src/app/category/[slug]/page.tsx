import { notFound } from 'next/navigation';
import { dataService } from '../../services/dataService';
import { Category } from '../../index';
import ArticlesGrid from '../../components/ArticlesGrid/ArticlesGrid';
import BackToTop from '../../components/BackToTop/BackToTop';
import styles from './page.module.css';
import AdPlaceholder from '@/app/components/AdPlaceholder/AdPlaceholder';
import adsPlaceholderImg from '../../ads_300_250.png';
import ClientEffects from '@/app/components/ClientEffects/ClientEffects';

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
      {/* 客户端副作用组件 */}
      <ClientEffects />
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
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

      {/* 广告位 - 使用组件化设计 */}
      <AdPlaceholder 
        id="seattle-ad-10001"
        imageSrc={adsPlaceholderImg}
        alt="Advertisement"
        width={300}
        height={250}
      />

      {/* Articles Grid */}
      <section className={styles.articlesSection}>
        <div className="container">
          <div className={styles.articlesHeader}>
            <h2 className={styles.articlesTitle}>All Articles</h2>
          </div>
          
          <ArticlesGrid 
            articles={category.articles}
            showCategory={false}
            gridClassName={styles.articlesGrid}
          />

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
              .filter((cat: Category) => cat.name !== category.name)
              .map((relatedCategory: Category) => (
                <a 
                  key={relatedCategory.id}
                  href={`/category/${relatedCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                  className={styles.relatedCard}
                >
                  <h3 className={styles.relatedName}>{relatedCategory.name}</h3>
                  <p className={styles.relatedCount}>
                    {relatedCategory.articles.length} articles
                  </p>
                </a>
              ))}
          </div>
        </div>
      </section>
      
      {/* 返回顶部按钮 */}
      <BackToTop />
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

  // 根据分类生成相关关键词
  const getCategoryKeywords = (categoryName: string) => {
    const baseKeywords = "home fitness, workout tips, exercise guides";
    
    switch (params.slug) {
      case 'affordable-home-gym-setups':
        return `${baseKeywords}, cheap home gym, home gym setup, small space gym ideas, home workout gear, under $50 fitness items, garage gym ideas, affordable home gym, diy gym space, space-saving gym, compact workout space, foldable fitness gear, dollar store fitness, budget workout tools, cheap gym finds, compact fitness equipment, small apartment workouts, ikea workout hacks, affordable gym design, diy fitness room`;
      
      case 'family-kids-friendly-workouts':
        return `${baseKeywords}, indoor kid workouts, fun family fitness, kids exercise ideas, family fitness time, living room workouts, home family exercises, youtube kid workouts, parent-child fitness channels, family exercise content, screen-free activities, family challenges, indoor games for fitness, dance breaks, mood boosting workouts, kids activity ideas, family olympics, backyard workouts, group fitness games, toddler workouts, energy burners, rainy day exercises, safe kids workouts, family-friendly routines, active kids ideas`;
      
      case 'strength-training-without-equipment':
        return `${baseKeywords}, bodyweight muscle building, no equipment strength, home workouts, no gear fitness, body resistance workouts, home strength plans, push-up progressions, upper body training, beginner to advanced fitness, core workouts, no equipment abs, sculpt your core at home, quick full-body workout, bodyweight burn, at-home routine, squat variations, no weight leg workouts, home leg training, bodyweight strength, everyday objects workout, home power routine, ripped without weights, full body training, calisthenics workout`;
      
      case 'motivation-habit-building-tips':
        return `${baseKeywords}, home fitness motivation, stay consistent, solo workout tips, 5-minute workout, fast fitness start, habit forming tip, morning workouts, early fitness benefits, routine sticking strategy, home habit building, sustainable workouts, routine you won't quit, vision board fitness, playlist motivation, sticky note tips, fitness psychology, long-term habit, sustainable routine guide, low motivation tricks, fitness hacks, stay on track, fitness systems, skip willpower, automated habits`;
      
      default:
        return `${baseKeywords}, ${categoryName.toLowerCase()}`;
    }
  };

  return {
    title: `${category.name} - Home Fitness`,
    description: `Discover ${category.articles.length} articles about ${category.name.toLowerCase()}. Expert tips and guides for your home fitness journey.`,
    keywords: getCategoryKeywords(category.name),
    openGraph: {
      title: `${category.name} - Home Fitness`,
      description: `Discover ${category.articles.length} articles about ${category.name.toLowerCase()}. Expert tips and guides for your home fitness journey.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} - Home Fitness`,
      description: `Discover ${category.articles.length} articles about ${category.name.toLowerCase()}. Expert tips and guides for your home fitness journey.`,
    }
  };
} 