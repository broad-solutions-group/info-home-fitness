import MarkdownRenderer from '../components/MarkdownRenderer';
import attachmentData from '../data/Home-Fitness-attachment.json';
import styles from '../components/DocumentPage.module.css';
import { transformMarkdown } from '../../utils';

export default function PrivacyPolicy() {
  const transformedContent = transformMarkdown(attachmentData.privacy);
  
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