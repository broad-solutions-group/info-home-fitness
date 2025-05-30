import { dataService } from './services/dataService';
import ArticleCard from './components/ArticleCard/ArticleCard';
import BackToTop from './components/BackToTop/BackToTop';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const homeData = dataService.getHomePageData();
  const { heroArticles, trendingArticles, categoryPreviews } = homeData;

  return (
    <div className={styles.homePage}>
      {/* Hero Banner */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Transform Your Home Into Your <span className="text-primary">Perfect Gym</span>
            </h1>
            <p className={styles.heroDescription}>
              Discover budget-friendly setups, family-friendly workouts, and equipment-free training. 
              Get fit at home without breaking the bank or sacrificing space.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/category/affordable-home-gym-setups" className="btn btn-primary">
                Start Building Your Gym
              </Link>
              <Link href="/category/family-kids-friendly-workouts" className="btn btn-secondary">
                Family Workouts
              </Link>
            </div>
          </div>
          <div className={styles.heroFeatured}>
            {heroArticles[0] && (
              <ArticleCard 
                article={heroArticles[0]} 
                variant="featured"
                showCategory={false}
              />
            )}
          </div>
          
          {/* 广告位 - 移动端在banner内显示 */}
          <section className={`${styles.adSection} ${styles.adSectionMobile}`}>
            <div className={styles.adContainer}>
              <div className={styles.adPlaceholder}>
                📢 Advertisement Space - 广告位预留区域
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* 广告位 - PC端在banner外显示 */}
      <section className={`${styles.adSection} ${styles.adSectionDesktop}`}>
        <div className={styles.adContainer}>
          <div className={styles.adPlaceholder}>
            📢 Advertisement Space - 广告位预留区域
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className={styles.trendingSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>🔥 Trending Now</h2>
            <p className={styles.sectionSubtitle}>
              Most popular articles this week - don&apos;t miss out!
            </p>
          </div>
          <div className={styles.trendingGrid}>
            {trendingArticles.map((article, index) => (
              <ArticleCard 
                key={article.id} 
                article={article}
                variant="default"
                showCategory={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Build Your Home Gym */}
      <section className={styles.categorySection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h2 className={styles.sectionTitle}>🛠️ Build Your Home Gym</h2>
              <Link href="/category/affordable-home-gym-setups" className={styles.viewAllLink}>
                View All →
              </Link>
            </div>
            <p className={styles.sectionSubtitle}>
              Smart solutions for every space and budget
            </p>
          </div>
          <div className={styles.categoryGrid}>
            {categoryPreviews
              .filter(category => category.name === 'Affordable Home Gym Setups')
              .map(category => (
                <div key={category.id} className={styles.categoryBlock}>
                  <div className={styles.categoryArticles}>
                    {category.articles.map(article => (
                      <ArticleCard 
                        key={article.id} 
                        article={article}
                        variant="compact"
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Family & Kids Fitness */}
      <section className={styles.familySection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h2 className={styles.sectionTitle}>👨‍👩‍👧‍👦 Family & Kids Fitness</h2>
              <Link href="/category/family-kids-friendly-workouts" className={styles.viewAllLink}>
                View All →
              </Link>
            </div>
            <p className={styles.sectionSubtitle}>
              Fun activities that get the whole family moving together
            </p>
          </div>
          <div className={styles.familyGrid}>
            {categoryPreviews
              .filter(category => category.name === 'Family & Kids Friendly Workouts')
              .map(category => (
                <div key={category.id} className={styles.categoryBlock}>
                  <div className={styles.categoryArticles}>
                    {category.articles.map(article => (
                      <ArticleCard 
                        key={article.id} 
                        article={article}
                        variant="default"
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Strength Training Without Equipment */}
      <section className={styles.strengthSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h2 className={styles.sectionTitle}>💪 Strength Training Without Equipment</h2>
              <Link href="/category/strength-training-without-equipment" className={styles.viewAllLink}>
                View All →
              </Link>
            </div>
            <p className={styles.sectionSubtitle}>
              Build muscle and strength using just your bodyweight
            </p>
          </div>
          <div className={styles.strengthGrid}>
            {categoryPreviews
              .filter(category => category.name === 'Strength Training Without Equipment')
              .map(category => (
                <div key={category.id} className={styles.categoryBlock}>
                  <div className={styles.categoryArticles}>
                    {category.articles.map(article => (
                      <ArticleCard 
                        key={article.id} 
                        article={article}
                        variant="compact"
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Motivation & Habit Building */}
      <section className={styles.motivationSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h2 className={styles.sectionTitle}>🧠 Fitness Habits That Stick</h2>
              <Link href="/category/motivation-habit-building-tips" className={styles.viewAllLink}>
                View All →
              </Link>
            </div>
            <p className={styles.sectionSubtitle}>
              Build lasting motivation and create sustainable workout routines
            </p>
          </div>
          <div className={styles.motivationGrid}>
            {categoryPreviews
              .filter(category => category.name === 'Motivation & Habit Building Tips')
              .map(category => (
                <div key={category.id} className={styles.categoryBlock}>
                  <div className={styles.categoryArticles}>
                    {category.articles.map(article => (
                      <ArticleCard 
                        key={article.id} 
                        article={article}
                        variant="default"
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 返回顶部按钮 */}
      <BackToTop />
    </div>
  );
}
