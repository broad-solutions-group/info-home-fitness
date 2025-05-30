'use client';

import { marked } from 'marked';
import styles from './MarkdownRenderer.module.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // 配置marked选项
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  // 处理转义的换行符
  const processedContent = content.replace(/\\n/g, '\n');

  // 使用同步方式渲染markdown内容
  let htmlContent: string;
  try {
    htmlContent = marked.parse(processedContent) as string;
  } catch (error) {
    console.error('Markdown rendering error:', error);
    htmlContent = processedContent;
  }

  return (
    <div 
      className={`${styles.markdownContent} ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
} 