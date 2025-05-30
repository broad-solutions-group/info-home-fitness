import MarkdownRenderer from './MarkdownRenderer';
import styles from './DocumentPage.module.css';

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