import MarkdownRenderer from '../components/MarkdownRenderer';
import agreementData from '../data/agreement.json';
import styles from '../components/DocumentPage.module.css';

export default function TermsOfService() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <MarkdownRenderer content={agreementData.content} className={styles.documentContent} />
        </div>
      </div>
    </div>
  );
} 