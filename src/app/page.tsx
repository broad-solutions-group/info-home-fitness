import { Metadata } from 'next';
import Image from 'next/image';
import HeroBanner from './components/HeroBanner/HeroBanner';
import ArticleCard from './components/ArticleCard/ArticleCard';
import AdPlaceholder from './components/AdPlaceholder/AdPlaceholder';
import { DynamicBackToTop } from './components/DynamicComponents/DynamicComponents';
import RefreshLink from './components/RefreshLink/RefreshLink';
import ClientEffects from './components/ClientEffects/ClientEffects';
import { dataService } from './services/dataService';
import { Category } from './index';
import styles from './page.module.css';
import adsPlaceholderImg from './ads_300_250.png';

export const metadata: Metadata = {
  title: "Home Fitness - Transform Your Home Into Your Perfect Gym",
  description: "Discover budget-friendly home gym setups, family-friendly workouts, equipment-free strength training, and motivation tips. Get fit at home without breaking the bank or sacrificing space.",
  keywords: "cheap home gym, home gym setup, small space gym ideas, home workout gear, under $50 fitness items, no gym equipment, garage gym ideas, affordable home gym, diy gym space, space-saving gym, compact workout space, foldable fitness gear, dollar store fitness, budget workout tools, cheap gym finds, compact fitness equipment, small apartment workouts, foldable gear, smart home fitness, affordable fitness tech, budget smart gear, ikea workout hacks, affordable gym design, diy fitness room, indoor kid workouts, fun family fitness, kids exercise ideas, family fitness time, living room workouts, home family exercises, youtube kid workouts, parent-child fitness channels, family exercise content, screen-free activities, family challenges, indoor games for fitness, dance breaks, mood boosting workouts, kids activity ideas, family olympics, backyard workouts, group fitness games, toddler workouts, energy burners, rainy day exercises, safe kids workouts, family-friendly routines, active kids ideas, bodyweight muscle building, no equipment strength, home workouts, no gear fitness, body resistance workouts, home strength plans, push-up progressions, upper body training, beginner to advanced fitness, core workouts, no equipment abs, sculpt your core at home, quick full-body workout, bodyweight burn, at-home routine, squat variations, no weight leg workouts, home leg training, bodyweight strength, everyday objects workout, home power routine, ripped without weights, full body training, calisthenics workout, home fitness motivation, stay consistent, solo workout tips, 5-minute workout, fast fitness start, habit forming tip, morning workouts, early fitness benefits, routine sticking strategy, home habit building, sustainable workouts, routine you won't quit, vision board fitness, playlist motivation, sticky note tips, fitness psychology, long-term habit, sustainable routine guide, low motivation tricks, fitness hacks, stay on track, fitness systems, skip willpower, automated habits",
  openGraph: {
    title: "Home Fitness - Transform Your Home Into Your Perfect Gym",
    description: "Discover budget-friendly home gym setups, family-friendly workouts, equipment-free strength training, and motivation tips.",
    type: "website",
    images: ["/images/home-fitness-hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Fitness - Transform Your Home Into Your Perfect Gym",
    description: "Discover budget-friendly home gym setups, family-friendly workouts, equipment-free strength training, and motivation tips.",
  }
};

export default function Home() {
  const homeData = dataService.getHomePageData();
  const { heroArticles, trendingArticles, categoryPreviews } = homeData;

  return (
    <div className={styles.homePage}>
      {/* 客户端副作用组件 */}
      <ClientEffects />
      
      {/* Hero Banner 轮播 */}
      <HeroBanner articles={heroArticles} />

      {/* 广告位 - 使用组件化设计 */}
      <AdPlaceholder 
        id="seattle-ad-10001"
        imageSrc={adsPlaceholderImg}
        alt="Advertisement"
        width={300}
        height={250}
      />

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
                variant={index === 0 ? "featured" : "default"}
                showCategory={false}
                isFirstCard={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <AdPlaceholder 
        id="seattle-ad-10002"
        imageSrc={adsPlaceholderImg}
        alt="Advertisement"
        width={300}
        height={250}
      />

      {/* Build Your Home Gym */}
      <section className={styles.categorySection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h2 className={styles.sectionTitle}>🛠️ Build Your Home Gym</h2>
            </div>
            <p className={styles.sectionSubtitle}>
              Smart solutions for every space and budget
            </p>
            <RefreshLink 
              href="/category/affordable-home-gym-setups" 
              className={styles.viewAllButton}
            >
              View All Articles →
            </RefreshLink>
          </div>
          <div className={styles.categoryGrid}>
            {categoryPreviews
              .filter((category: Category) => category.name === 'Affordable Home Gym Setups')
              .map((category: Category) => (
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

      <AdPlaceholder 
        id="seattle-ad-10003"
        imageSrc={adsPlaceholderImg}
        alt="Advertisement"
        width={300}
        height={250}
      />

      {/* Family & Kids Fitness */}
      <section className={styles.familySection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h2 className={styles.sectionTitle}>👨‍👩‍👧‍👦 Family & Kids Fitness</h2>
            </div>
            <p className={styles.sectionSubtitle}>
              Fun activities that get the whole family moving together
            </p>
            <RefreshLink 
              href="/category/family-kids-friendly-workouts" 
              className={styles.viewAllButton}
            >
              View All Articles →
            </RefreshLink>
          </div>
          <div className={styles.familyGrid}>
            {categoryPreviews
              .filter((category: Category) => category.name === 'Family & Kids Friendly Workouts')
              .map((category: Category) => (
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

      <AdPlaceholder 
        id="seattle-ad-10004"
        imageSrc={adsPlaceholderImg}
        alt="Advertisement"
        width={300}
        height={250}
      />

      {/* Strength Training Without Equipment */}
      <section className={styles.strengthSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h2 className={styles.sectionTitle}>💪 Strength Training Without Equipment</h2>
            </div>
            <p className={styles.sectionSubtitle}>
              Build muscle and strength using just your bodyweight
            </p>
            <RefreshLink 
              href="/category/strength-training-without-equipment" 
              className={styles.viewAllButton}
            >
              View All Articles →
            </RefreshLink>
          </div>
          <div className={styles.strengthGrid}>
            {categoryPreviews
              .filter((category: Category) => category.name === 'Strength Training Without Equipment')
              .map((category: Category) => (
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
            </div>
            <p className={styles.sectionSubtitle}>
              Build lasting motivation and create sustainable workout routines
            </p>
            <RefreshLink 
              href="/category/motivation-habit-building-tips" 
              className={styles.viewAllButton}
            >
              View All Articles →
            </RefreshLink>
          </div>
          <div className={styles.motivationGrid}>
            {categoryPreviews
              .filter((category: Category) => category.name === 'Motivation & Habit Building Tips')
              .map((category: Category) => (
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
      <DynamicBackToTop />
    </div>
  );
}
