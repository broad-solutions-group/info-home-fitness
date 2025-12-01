import Image from 'next/image';
import { CSSProperties } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  style?: CSSProperties;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  sizes,
  objectFit = 'cover',
  style,
  ...props
}: OptimizedImageProps) => {
  // 如果使用fill，确保不设置width和height
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        style={{
          objectFit,
          ...style,
        }}
        // 优化 priority 图片的加载
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        {...props}
      />
    );
  }

  // 如果设置了width和height，确保保持宽高比
  if (width && height) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        style={{
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
          objectFit,
          ...style,
        }}
        {...props}
      />
    );
  }

  // 默认情况下使用fill
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      priority={priority}
      sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      style={{
        objectFit,
        ...style,
      }}
      {...props}
    />
  );
};

export default OptimizedImage; 