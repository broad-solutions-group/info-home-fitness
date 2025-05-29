'use client';

import { useEffect } from 'react';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  useEffect(() => {
    // 修复热模块替换中的removeChild错误
    if (process.env.NODE_ENV === 'development') {
      const originalRemoveChild = Node.prototype.removeChild;
      (Node.prototype as any).removeChild = function<T extends Node>(child: T): T {
        try {
          if (child && child.parentNode === this) {
            return originalRemoveChild.call(this, child) as T;
          }
          return child;
        } catch (error) {
          console.warn('removeChild error caught and handled:', error);
          return child;
        }
      };

      // 修复CSS热重载问题
      const originalInsertBefore = Node.prototype.insertBefore;
      (Node.prototype as any).insertBefore = function<T extends Node>(newNode: T, referenceNode: Node | null): T {
        try {
          if (newNode && this.contains && !this.contains(newNode)) {
            return originalInsertBefore.call(this, newNode, referenceNode) as T;
          }
          return newNode;
        } catch (error) {
          console.warn('insertBefore error caught and handled:', error);
          return newNode;
        }
      };
    }

    // 防止FOUC
    document.documentElement.classList.add('hydrated');

    // 清理预加载的CSS链接警告
    const preloadLinks = document.querySelectorAll('link[rel="preload"][as="style"]');
    preloadLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href.includes('layout.css') || href.includes('page.css'))) {
        // 将预加载链接转换为实际的样式表链接
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = href;
        styleLink.onload = () => {
          // 移除原始的预加载链接
          try {
            if (link.parentNode) {
              link.parentNode.removeChild(link);
            }
          } catch (error) {
            console.warn('Failed to remove preload link:', error);
          }
        };
        document.head.appendChild(styleLink);
      }
    });

  }, []);

  return <>{children}</>;
} 