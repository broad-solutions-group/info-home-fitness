'use client';

import { useSDK } from '../../hooks/useSDK';
import { SDKConfig } from '../../types/sdk';

/**
 * SDK使用示例组件
 * 展示如何在其他组件中使用SDK功能
 */
const SDKExample: React.FC = () => {
  const config: SDKConfig = {
    enabled: true,
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    debug: process.env.NODE_ENV === 'development',
  };

  const { status, trackEvent } = useSDK(config);

  const handleTrackEvent = () => {
    trackEvent('button_click', {
      component: 'SDKExample',
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
    });
  };

  const handleTrackPageView = () => {
    trackEvent('page_view', {
      page: window.location.pathname,
      title: document.title,
      timestamp: new Date().toISOString(),
    });
  };

  if (!status.isLoaded) {
    return (
      <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px' }}>
        <p>SDK状态: {status.hasError ? '加载失败' : '加载中...'}</p>
        {status.hasError && (
          <p style={{ color: 'red' }}>错误: {status.errorMessage}</p>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px' }}>
      <h3>SDK功能示例</h3>
      <p>SDK状态: ✅ 已加载 {status.loadTime && `(${status.loadTime}ms)`}</p>
      
      <div style={{ marginTop: '16px' }}>
        <button 
          onClick={handleTrackEvent}
          style={{
            padding: '8px 16px',
            marginRight: '8px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          追踪按钮点击
        </button>
        
        <button 
          onClick={handleTrackPageView}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          追踪页面浏览
        </button>
      </div>
      
      <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
        <p>💡 提示: 打开浏览器开发者工具查看事件追踪日志</p>
      </div>
    </div>
  );
};

export default SDKExample; 