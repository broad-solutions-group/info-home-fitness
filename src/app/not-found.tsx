import RefreshLink from './components/RefreshLink/RefreshLink';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.notFoundPage}>
      <div className="container">
        <div className={styles.notFoundContent}>
          <div className={styles.notFoundIcon}>🏠</div>
          <h1 className={styles.notFoundTitle}>404 - Page Not Found</h1>
          <p className={styles.notFoundDescription}>
            Oops! The page you&apos;re looking for doesn&apos;t exist. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className={styles.notFoundActions}>
            <RefreshLink 
              href="/" 
              className={styles.homeButton}
            >
              🏠 Go Home
            </RefreshLink>
            <RefreshLink 
              href="/search" 
              className={styles.searchButton}
            >
              🔍 Search Articles
            </RefreshLink>
          </div>

          <div className={styles.helpfulLinks}>
            <h3 className={styles.helpfulTitle}>Popular Categories:</h3>
            <div className={styles.categoryLinks}>
              <RefreshLink 
                href="/category/affordable-home-gym-setups" 
                className={styles.categoryLink}
              >
                💰 Affordable Home Gym Setups
              </RefreshLink>
              <RefreshLink 
                href="/category/family-kids-friendly-workouts" 
                className={styles.categoryLink}
              >
                👨‍👩‍👧‍👦 Family & Kids Friendly Workouts
              </RefreshLink>
              <RefreshLink 
                href="/category/strength-training-without-equipment" 
                className={styles.categoryLink}
              >
                💪 Strength Training Without Equipment
              </RefreshLink>
              <RefreshLink 
                href="/category/motivation-habit-building-tips" 
                className={styles.categoryLink}
              >
                🧠 Motivation & Habit Building Tips
              </RefreshLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 