import MarkdownRenderer from '../components/MarkdownRenderer';
import privacyPolicyData from '../data/privacy_policy.json';
import styles from '../components/DocumentPage.module.css';

export default function PrivacyPolicy() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <MarkdownRenderer content={privacyPolicyData.content} className={styles.documentContent} />
        </div>
      </div>
    </div>
  );
} 