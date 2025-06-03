'use client';

import { useState, useEffect, useCallback } from 'react';
import { SDKStatus, SDKConfig } from '../types/sdk';

/**
 * SDK管理Hook
 * 提供SDK状态管理和操作方法
 * 遵循关注点分离原则，将SDK逻辑从组件中抽离
 */
export const useSDK = (config: SDKConfig) => {
  const [status, setStatus] = useState<SDKStatus>({
    isLoaded: false,
    hasError: false,
  });

  const [loadStartTime, setLoadStartTime] = useState<number | null>(null);

  // SDK加载成功回调
  const handleSDKLoad = useCallback(() => {
    const loadTime = loadStartTime ? Date.now() - loadStartTime : 0;
    
    setStatus({
      isLoaded: true,
      hasError: false,
      loadTime,
    });

    if (config.debug) {
      console.log(`SDK加载完成，耗时: ${loadTime}ms`);
    }

    // 如果SDK暴露了全局对象，可以在这里进行初始化
    if (typeof window !== 'undefined' && window.broadSolutionsSDK) {
      try {
        window.broadSolutionsSDK.init({
          environment: config.environment,
          debug: config.debug,
        });
      } catch (error) {
        console.error('SDK初始化失败:', error);
      }
    }
  }, [config, loadStartTime]);

  // SDK加载失败回调
  const handleSDKError = useCallback((error: Error) => {
    setStatus({
      isLoaded: false,
      hasError: true,
      errorMessage: error.message,
    });

    if (config.debug) {
      console.error('SDK加载失败:', error);
    }
  }, [config]);

  // 开始加载计时
  const startLoading = useCallback(() => {
    setLoadStartTime(Date.now());
  }, []);

  // SDK方法调用封装
  const trackEvent = useCallback((event: string, data?: any) => {
    if (!status.isLoaded || status.hasError) {
      console.warn('SDK未加载或出现错误，无法追踪事件');
      return;
    }

    try {
      if (typeof window !== 'undefined' && window.broadSolutionsSDK) {
        window.broadSolutionsSDK.track(event, data);
      }
    } catch (error) {
      console.error('事件追踪失败:', error);
    }
  }, [status]);

  return {
    status,
    handleSDKLoad,
    handleSDKError,
    startLoading,
    trackEvent,
  };
}; 