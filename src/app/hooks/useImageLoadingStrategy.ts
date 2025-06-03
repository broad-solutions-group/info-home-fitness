'use client';

import { useCallback } from 'react';

interface ImageLoadingConfig {
  maxConcurrentLoads: number;
}

class ImageLoadingManager {
  private static instance: ImageLoadingManager;
  private loadingQueue: Set<string> = new Set();
  private loadedImages: Set<string> = new Set();
  private failedImages: Set<string> = new Set();
  private config: ImageLoadingConfig;

  private constructor(config: ImageLoadingConfig) {
    this.config = config;
  }

  static getInstance(config?: ImageLoadingConfig): ImageLoadingManager {
    if (!ImageLoadingManager.instance) {
      ImageLoadingManager.instance = new ImageLoadingManager(
        config || {
          maxConcurrentLoads: 6,
        }
      );
    }
    return ImageLoadingManager.instance;
  }

  canStartLoading(): boolean {
    return this.loadingQueue.size < this.config.maxConcurrentLoads;
  }

  startLoading(src: string): boolean {
    if (this.loadedImages.has(src) || this.failedImages.has(src)) {
      return false; // 已经处理过
    }

    if (!this.canStartLoading()) {
      return false; // 达到并发限制
    }

    this.loadingQueue.add(src);
    return true;
  }

  finishLoading(src: string, success: boolean) {
    this.loadingQueue.delete(src);
    
    if (success) {
      this.loadedImages.add(src);
    } else {
      this.failedImages.add(src);
    }
  }

  isLoaded(src: string): boolean {
    return this.loadedImages.has(src);
  }

  isFailed(src: string): boolean {
    return this.failedImages.has(src);
  }

  isLoading(src: string): boolean {
    return this.loadingQueue.has(src);
  }
}

export const useImageLoadingStrategy = (config?: Partial<ImageLoadingConfig>) => {
  const manager = ImageLoadingManager.getInstance(config as ImageLoadingConfig);

  const canStartLoading = useCallback((src: string) => {
    return manager.canStartLoading() && !manager.isLoaded(src) && !manager.isFailed(src);
  }, [manager]);

  const startLoading = useCallback((src: string) => {
    return manager.startLoading(src);
  }, [manager]);

  const finishLoading = useCallback((src: string, success: boolean) => {
    manager.finishLoading(src, success);
  }, [manager]);

  const getImageStatus = useCallback((src: string) => {
    return {
      isLoaded: manager.isLoaded(src),
      isFailed: manager.isFailed(src),
      isLoading: manager.isLoading(src),
    };
  }, [manager]);

  return {
    canStartLoading,
    startLoading,
    finishLoading,
    getImageStatus,
  };
}; 