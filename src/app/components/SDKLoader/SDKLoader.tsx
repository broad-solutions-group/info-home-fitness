'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { useSDK } from '../../hooks/useSDK';
import { SDKConfig } from '../../types/sdk';

interface SDKLoaderProps {
  config?: Partial<SDKConfig>;
}

/**
 * SDK加载器组件
 * 负责加载和管理第三方SDK脚本
 * 遵循单一职责原则，专门处理SDK相关逻辑
 */
const SDKLoader: React.FC<SDKLoaderProps> = ({ 
  config = {}
}) => {
  // 默认配置
  const defaultConfig: SDKConfig = {
    enabled: true,
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    debug: process.env.NODE_ENV === 'development',
    ...config
  };

  const { 
    status, 
    handleSDKLoad, 
    handleSDKError, 
    startLoading,
    trackEvent 
  } = useSDK(defaultConfig);

  // 内置的加载成功处理
  useEffect(() => {
    if (status.isLoaded) {
      if (defaultConfig.debug) {
        console.log('SDK已成功加载到应用中');
      }
    }
  }, [status.isLoaded, defaultConfig.debug]);

  // 内置的错误处理
  useEffect(() => {
    if (status.hasError) {
      if (defaultConfig.debug) {
        console.error('SDK加载失败:', status.errorMessage);
      }
    }
  }, [status.hasError, status.errorMessage, defaultConfig.debug]);

  // 如果禁用，不渲染脚本
  if (!defaultConfig.enabled) {
    return null;
  }

  // 如果已出错且不是开发环境，不重复尝试加载
  if (status.hasError && defaultConfig.environment === 'production') {
    return null;
  }

  return (
    <>
      <Script
        src="/perfect_sdk_info_mixed.js"
        strategy="afterInteractive" // 在页面交互后加载，平衡性能和功能
        onLoad={() => {
          handleSDKLoad();
          if (defaultConfig.debug) {
            console.log('SDK脚本加载完成');
          }
        }}
        onError={(error) => {
          handleSDKError(new Error(`脚本加载失败: ${error}`));
        }}
        onReady={() => {
          if (defaultConfig.debug) {
            console.log('SDK准备就绪');
          }
        }}
        onLoadStart={() => {
          startLoading();
          if (defaultConfig.debug) {
            console.log('开始加载SDK脚本');
          }
        }}
      />
      
      {/* 开发环境下显示SDK状态 */}
      {defaultConfig.debug && (
        <div style={{ 
          position: 'fixed', 
          bottom: '10px', 
          right: '10px', 
          background: 'rgba(0,0,0,0.8)', 
          color: 'white', 
          padding: '8px', 
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 9999
        }}>
          SDK状态: {status.isLoaded ? '已加载' : status.hasError ? '加载失败' : '加载中'}
          {status.loadTime && ` (${status.loadTime}ms)`}
        </div>
      )}
    </>
  );
};

export default SDKLoader;

// 导出trackEvent方法供其他组件使用
export { useSDK }; 