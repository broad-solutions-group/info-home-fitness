/**
 * SDK相关类型定义
 * 提供类型安全和更好的开发体验
 */

// SDK配置接口
export interface SDKConfig {
  enabled: boolean;
  environment: 'development' | 'production';
  debug?: boolean;
}

// SDK状态接口
export interface SDKStatus {
  isLoaded: boolean;
  hasError: boolean;
  errorMessage?: string;
  loadTime?: number;
}

// SDK事件回调类型
export type SDKEventCallback = () => void;
export type SDKErrorCallback = (error: Error) => void;

// 全局SDK对象类型（如果SDK暴露全局对象）
declare global {
  interface Window {
    // 根据实际SDK暴露的全局对象进行调整
    broadSolutionsSDK?: {
      init: (config?: any) => void;
      track: (event: string, data?: any) => void;
      [key: string]: any;
    };
  }
}

export {}; 