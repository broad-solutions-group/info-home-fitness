import Link from 'next/link';
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
            <Link href="/" className={styles.homeButton}>
              🏠 Go Home
            </Link>
            <Link href="/search" className={styles.searchButton}>
              🔍 Search Articles
            </Link>
          </div>

          <div className={styles.helpfulLinks}>
            <h3 className={styles.helpfulTitle}>Popular Categories:</h3>
            <div className={styles.categoryLinks}>
              <Link href="/category/affordable-home-gym-setups" className={styles.categoryLink}>
                💰 Affordable Home Gym Setups
              </Link>
              <Link href="/category/family-kids-friendly-workouts" className={styles.categoryLink}>
                👨‍👩‍👧‍👦 Family & Kids Friendly Workouts
              </Link>
              <Link href="/category/strength-training-without-equipment" className={styles.categoryLink}>
                💪 Strength Training Without Equipment
              </Link>
              <Link href="/category/motivation-habit-building-tips" className={styles.categoryLink}>
                🧠 Motivation & Habit Building Tips
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 