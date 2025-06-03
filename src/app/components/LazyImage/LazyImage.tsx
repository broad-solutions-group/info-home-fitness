'use client';

import { useState, useRef, useEffect, CSSProperties, useCallback } from 'react';
import OptimizedImage from '../OptimizedImage';
import { useImageLoadingStrategy } from '../../hooks/useImageLoadingStrategy';

interface LazyImageProps {
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
  placeholder?: 'blur' | 'skeleton' | 'none';
  blurDataURL?: string;
  threshold?: number; // Intersection observer threshold
  rootMargin?: string; // Intersection observer root margin
  onLoad?: () => void;
  onError?: () => void;
  enableLoadingManager?: boolean; // 是否启用加载管理器
}

const LazyImage = ({
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
  placeholder = 'skeleton',
  blurDataURL,
  threshold = 0.1,
  rootMargin = '50px',
  onLoad,
  onError,
  enableLoadingManager = true,
  ...props
}: LazyImageProps) => {
  const [isInView, setIsInView] = useState(priority); // 如果是priority，立即显示
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority); // 是否应该开始加载
  const imgRef = useRef<HTMLDivElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout>();

  const { canStartLoading, startLoading, finishLoading, getImageStatus } = useImageLoadingStrategy();

  // 检查图片状态
  const imageStatus = enableLoadingManager ? getImageStatus(src) : null;

  // Intersection Observer 监听图片是否进入视口
  useEffect(() => {
    if (priority || isInView) return; // 如果已经是priority或已经在视口内，不需要观察

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority, isInView, threshold, rootMargin]);

  // 管理图片加载时机
  useEffect(() => {
    if (!isInView || shouldLoad) return;

    if (enableLoadingManager) {
      // 使用加载管理器
      if (imageStatus?.isLoaded) {
        setIsLoaded(true);
        setShouldLoad(true);
        return;
      }

      if (imageStatus?.isFailed) {
        setHasError(true);
        setShouldLoad(true);
        return;
      }

      if (imageStatus?.isLoading) {
        setShouldLoad(true);
        return;
      }

      // 尝试开始加载
      if (canStartLoading(src)) {
        if (startLoading(src)) {
          setShouldLoad(true);
        } else {
          // 如果无法立即开始加载，设置延时重试
          loadingTimeoutRef.current = setTimeout(() => {
            setShouldLoad(true);
          }, 100);
        }
      } else {
        // 达到并发限制，延时重试
        loadingTimeoutRef.current = setTimeout(() => {
          if (canStartLoading(src)) {
            setShouldLoad(true);
          }
        }, 200);
      }
    } else {
      // 不使用加载管理器，直接加载
      setShouldLoad(true);
    }

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [isInView, shouldLoad, enableLoadingManager, imageStatus, canStartLoading, startLoading, src]);

  // 处理图片加载完成
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    if (enableLoadingManager) {
      finishLoading(src, true);
    }
    onLoad?.();
  }, [enableLoadingManager, finishLoading, src, onLoad]);

  // 处理图片加载错误
  const handleError = useCallback(() => {
    setHasError(true);
    if (enableLoadingManager) {
      finishLoading(src, false);
    }
    onError?.();
  }, [enableLoadingManager, finishLoading, src, onError]);

  // 生成占位符样式
  const getPlaceholderStyle = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transition: 'opacity 0.3s ease-in-out',
    };

    switch (placeholder) {
      case 'blur':
        return {
          ...baseStyle,
          backgroundImage: blurDataURL ? `url(${blurDataURL})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
          backgroundColor: '#f3f4f6',
        };
      case 'skeleton':
        return {
          ...baseStyle,
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'skeleton-loading 1.5s infinite',
          backgroundColor: '#f3f4f6',
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: '#f3f4f6',
        };
    }
  };

  // 容器样式
  const containerStyle: CSSProperties = {
    position: fill ? 'absolute' : 'relative',
    width: fill ? '100%' : width || 'auto',
    height: fill ? '100%' : height || 'auto',
    overflow: 'hidden',
    ...style,
  };

  // 如果使用加载管理器且图片已加载，直接显示
  if (enableLoadingManager && imageStatus?.isLoaded && !isLoaded) {
    setIsLoaded(true);
  }

  if (enableLoadingManager && imageStatus?.isFailed && !hasError) {
    setHasError(true);
  }

  return (
    <div ref={imgRef} style={containerStyle} className={className}>
      {/* 占位符 */}
      {!isLoaded && !hasError && (
        <div
          style={{
            ...getPlaceholderStyle(),
            opacity: shouldLoad ? (isLoaded ? 0 : 1) : 1,
          }}
        />
      )}

      {/* 错误状态 */}
      {hasError && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6',
            color: '#9ca3af',
            fontSize: '14px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📷</div>
            <div>Image not available</div>
          </div>
        </div>
      )}

      {/* 实际图片 */}
      {shouldLoad && !hasError && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          <OptimizedImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            fill={fill}
            priority={priority}
            sizes={sizes}
            objectFit={objectFit}
            {...props}
            {...{ onLoad: handleLoad, onError: handleError }}
          />
        </div>
      )}

      {/* CSS动画定义 */}
      <style jsx>{`
        @keyframes skeleton-loading {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LazyImage; 