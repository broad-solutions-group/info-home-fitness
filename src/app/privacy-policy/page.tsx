import MarkdownRenderer from '../components/MarkdownRenderer';
import attachmentData from '../data/Home-Fitness-attachment.json';
import styles from '../components/DocumentPage.module.css';

export default function PrivacyPolicy() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <MarkdownRenderer content={attachmentData.privacy} className={styles.documentContent} />
        </div>
      </div>
    </div>
  );
} 