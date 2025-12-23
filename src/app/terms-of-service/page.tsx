import dynamic from 'next/dynamic';
import attachmentData from '../data/Home-Fitness-attachment.json';
import styles from '../components/DocumentPage.module.css';
import { transformMarkdown } from '../../utils';

// 动态导入 MarkdownRenderer，减少首屏 JavaScript 大小
const MarkdownRenderer = dynamic(() => import('../components/MarkdownRenderer'), {
  ssr: true,
  loading: () => <div style={{ minHeight: '200px' }}>Loading content...</div>,
});

export default function TermsOfService() {
  const transformedContent = transformMarkdown(attachmentData.agreement);
  
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <MarkdownRenderer content={transformedContent} className={styles.documentContent} />
        </div>
      </div>
    </div>
  );
} 