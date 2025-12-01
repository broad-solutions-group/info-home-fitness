'use client';

import { useEffect, useCallback } from 'react';

// 扩展 Window 接口以包含 loadAllTask 方法
declare global {
  interface Window {
    loadAllTask?: () => void;
  }
}

export default function ClientEffects() {
  console.log('🧪 [ClientEffects] 组件渲染');

  const tryLoadAllTask = useCallback(() => {
    console.log('🧪 [ClientEffects] 尝试调用 loadAllTask');
    console.log('🧪 [ClientEffects] window 对象存在:', typeof window !== 'undefined');
    
    if (typeof window !== 'undefined') {
      console.log('🧪 [ClientEffects] window.loadAllTask 存在:', typeof window.loadAllTask === 'function');
      
      if (window.loadAllTask) {
        console.log('🧪 [ClientEffects] 调用 window.loadAllTask()');
        try {
          window.loadAllTask();
          console.log('🧪 [ClientEffects] window.loadAllTask() 调用成功');
          return true; // 成功调用
        } catch (error) {
          console.error('🧪 [ClientEffects] window.loadAllTask() 调用失败:', error);
          return false;
        }
      } else {
        console.log('🧪 [ClientEffects] window.loadAllTask 不存在或不是函数');
        return false;
      }
    }
    return false;
  }, []);

  useEffect(() => {
    // 延迟执行，不阻塞关键渲染路径和 LCP
    const executeAfterIdle = () => {
      console.log('🧪 [ClientEffects] useEffect 执行');
      
      // 立即尝试一次
      if (tryLoadAllTask()) {
        return; // 如果成功，直接返回
      }

      // 如果失败，设置重试机制
      console.log('🧪 [ClientEffects] 设置重试机制');
      let retryCount = 0;
      const maxRetries = 10; // 最多重试10次
      const retryInterval = 500; // 每500ms重试一次

      const retryTimer = setInterval(() => {
        retryCount++;
        console.log(`🧪 [ClientEffects] 重试第 ${retryCount} 次`);
        
        if (tryLoadAllTask()) {
          console.log('🧪 [ClientEffects] 重试成功，清除定时器');
          clearInterval(retryTimer);
        } else if (retryCount >= maxRetries) {
          console.log('🧪 [ClientEffects] 达到最大重试次数，停止重试');
          clearInterval(retryTimer);
        }
      }, retryInterval);

      // 清理函数
      return () => {
        console.log('🧪 [ClientEffects] 清理定时器');
        clearInterval(retryTimer);
      };
    };

    // 使用 requestIdleCallback 延迟执行，不阻塞 LCP
    if ('requestIdleCallback' in window) {
      const idleCallbackId = requestIdleCallback(executeAfterIdle, { timeout: 2000 });
      return () => {
        cancelIdleCallback(idleCallbackId);
      };
    } else {
      // 降级方案：延迟执行
      const timeoutId = setTimeout(executeAfterIdle, 100);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [tryLoadAllTask]);

  // 这个组件不渲染任何内容，只是执行副作用
  return null;
} 