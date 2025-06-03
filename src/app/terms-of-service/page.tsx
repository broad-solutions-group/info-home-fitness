import MarkdownRenderer from '../components/MarkdownRenderer';
import attachmentData from '../data/Home-Fitness-attachment.json';
import styles from '../components/DocumentPage.module.css';

export default function TermsOfService() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <MarkdownRenderer content={attachmentData.agreement} className={styles.documentContent} />
        </div>
      </div>
    </div>
  );
} 