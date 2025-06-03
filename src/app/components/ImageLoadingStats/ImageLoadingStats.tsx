'use client';

import { useImageLoadingStrategy } from '../../hooks/useImageLoadingStrategy';
import styles from './ImageLoadingStats.module.css';

interface ImageLoadingStatsProps {
  show?: boolean;
}

const ImageLoadingStats = ({ show = process.env.NODE_ENV === 'development' }: ImageLoadingStatsProps) => {
  const { stats } = useImageLoadingStrategy();

  if (!show) return null;

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsHeader}>
        <h4>图片加载统计</h4>
      </div>
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>总计</span>
          <span className={styles.statValue}>{stats.totalImages}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>已加载</span>
          <span className={`${styles.statValue} ${styles.success}`}>{stats.loadedImages}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>加载中</span>
          <span className={`${styles.statValue} ${styles.loading}`}>{stats.loadingImages}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>失败</span>
          <span className={`${styles.statValue} ${styles.error}`}>{stats.failedImages}</span>
        </div>
      </div>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ 
            width: stats.totalImages > 0 
              ? `${(stats.loadedImages / stats.totalImages) * 100}%` 
              : '0%' 
          }}
        />
      </div>
    </div>
  );
};

export default ImageLoadingStats; 