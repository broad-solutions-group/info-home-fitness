'use client';

import { useState, useEffect, useCallback } from 'react';

interface ImageLoadingConfig {
  maxConcurrentLoads: number;
  priorityLoadTimeout: number;
  retryAttempts: number;
  retryDelay: number;
}

interface LoadingStats {
  totalImages: number;
  loadedImages: number;
  failedImages: number;
  loadingImages: number;
}

class ImageLoadingManager {
  private static instance: ImageLoadingManager;
  private loadingQueue: Set<string> = new Set();
  private loadedImages: Set<string> = new Set();
  private failedImages: Set<string> = new Set();
  private config: ImageLoadingConfig;
  private listeners: Set<(stats: LoadingStats) => void> = new Set();

  private constructor(config: ImageLoadingConfig) {
    this.config = config;
  }

  static getInstance(config?: ImageLoadingConfig): ImageLoadingManager {
    if (!ImageLoadingManager.instance) {
      ImageLoadingManager.instance = new ImageLoadingManager(
        config || {
          maxConcurrentLoads: 6,
          priorityLoadTimeout: 3000,
          retryAttempts: 2,
          retryDelay: 1000,
        }
      );
    }
    return ImageLoadingManager.instance;
  }

  addListener(callback: (stats: LoadingStats) => void) {
    this.listeners.add(callback);
    // 立即发送当前状态
    callback(this.getStats());
  }

  removeListener(callback: (stats: LoadingStats) => void) {
    this.listeners.delete(callback);
  }

  private notifyListeners() {
    const stats = this.getStats();
    this.listeners.forEach(callback => callback(stats));
  }

  getStats(): LoadingStats {
    return {
      totalImages: this.loadingQueue.size + this.loadedImages.size + this.failedImages.size,
      loadedImages: this.loadedImages.size,
      failedImages: this.failedImages.size,
      loadingImages: this.loadingQueue.size,
    };
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
    this.notifyListeners();
    return true;
  }

  finishLoading(src: string, success: boolean) {
    this.loadingQueue.delete(src);
    
    if (success) {
      this.loadedImages.add(src);
    } else {
      this.failedImages.add(src);
    }
    
    this.notifyListeners();
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

  reset() {
    this.loadingQueue.clear();
    this.loadedImages.clear();
    this.failedImages.clear();
    this.notifyListeners();
  }
}

export const useImageLoadingStrategy = (config?: Partial<ImageLoadingConfig>) => {
  const [stats, setStats] = useState<LoadingStats>({
    totalImages: 0,
    loadedImages: 0,
    failedImages: 0,
    loadingImages: 0,
  });

  const manager = ImageLoadingManager.getInstance(config as ImageLoadingConfig);

  useEffect(() => {
    manager.addListener(setStats);
    return () => manager.removeListener(setStats);
  }, [manager]);

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

  const resetStats = useCallback(() => {
    manager.reset();
  }, [manager]);

  return {
    stats,
    canStartLoading,
    startLoading,
    finishLoading,
    getImageStatus,
    resetStats,
  };
}; 