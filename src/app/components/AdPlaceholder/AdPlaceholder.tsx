import Image from 'next/image';
import styles from './AdPlaceholder.module.css';

interface AdPlaceholderProps {
  id?: string;
  width?: number;
  height?: number;
  imageSrc?: any;
  alt?: string;
  className?: string;
}

/**
 * 广告占位符组件
 * 遵循单一职责原则，专门处理广告展示逻辑
 */
const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  id = 'ad-placeholder',
  width = 300,
  height = 250,
  imageSrc,
  alt = 'Advertisement',
  className = ''
}) => {
  return (
    <div 
      id={id} 
      className={`${styles.adContainer} ${className}`}
    >
      <div className={styles.adTip}>Advertisement ▼</div>
      {imageSrc ? (
        <Image 
          src={imageSrc} 
          alt={alt} 
          width={width} 
          height={height}
          className={styles.adImage}
          priority={false}
        />
      ) : (
        <div 
          className={styles.adPlaceholder}
          style={{ width, height }}
        >
          <span className={styles.placeholderText}>
            📢 Advertisement Space
          </span>
        </div>
      )}
      <div className={styles.adTip}>Advertisement ▲</div>
    </div>
  );
};

export default AdPlaceholder; 