import dynamic from 'next/dynamic';
import styles from './DocumentPage.module.css';

// 动态导入 MarkdownRenderer，减少首屏 JavaScript 大小
const MarkdownRenderer = dynamic(() => import('./MarkdownRenderer'), {
  ssr: true,
  loading: () => <div style={{ minHeight: '200px' }}>Loading content...</div>,
});

interface DocumentPageProps {
  title: string;
  content: string;
}

export default function DocumentPage({ title, content }: DocumentPageProps) {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>{title}</h1>
          <MarkdownRenderer content={content} className={styles.documentContent} />
        </div>
      </div>
    </div>
  );
} 