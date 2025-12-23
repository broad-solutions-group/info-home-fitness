'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// 动态导入搜索建议组件（仅在需要时加载）
export const DynamicSearchSuggestions = dynamic(
  () => import('../SearchSuggestions/SearchSuggestions'),
  {
    loading: () => <div style={{ height: '40px' }}>Loading suggestions...</div>,
    ssr: false,
  }
);

// 动态导入文章交互组件（仅在文章页面加载）
export const DynamicArticleInteractions = dynamic(
  () => import('../ArticleInteractions/ArticleInteractions'),
  {
    loading: () => <div style={{ height: '60px' }}>Loading interactions...</div>,
    ssr: false,
  }
);

// 动态导入返回顶部组件（仅在页面滚动时加载）
export const DynamicBackToTop = dynamic(
  () => import('../BackToTop/BackToTop'),
  {
    loading: () => null,
    ssr: false,
  }
);

// 动态导入Newsletter组件（仅在需要时加载）
export const DynamicNewsletter = dynamic(
  () => import('../Newsletter/Newsletter'),
  {
    loading: () => <div style={{ height: '200px' }}>Loading newsletter...</div>,
    ssr: false,
  }
);

// 通用的动态组件加载器（SSG模式：客户端渲染）
export function createDynamicComponent<T = {}>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options?: {
    loading?: () => JSX.Element | null;
    ssr?: boolean;
  }
) {
  return dynamic(importFn, {
    loading: options?.loading || (() => <div>Loading...</div>),
    ssr: false, // SSG模式：所有动态组件都在客户端渲染
  });
} 