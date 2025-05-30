'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.mainContent}>
            <h2 className={styles.title}>Join the Fit-At-Home Movement</h2>
            <p className={styles.description}>
              Transform your home into the perfect fitness space without breaking the bank or sacrificing space.
            </p>
          </div>
          
          <div className={styles.footerBottom}>
            {/* 左侧：地址 */}
            <address className={styles.address}>
              3911 Concord Pike #8030, SMB#27548, Wilmington, DE 19803, USA
            </address>

            {/* 右侧：链接 */}
            <div className={styles.linksSection}>
              <a href="/about-us" className={styles.footerLink}>
                About Us
              </a>
              <a href="/terms-of-service" className={styles.footerLink}>
                Terms of Service
              </a>
              <a href="/privacy-policy" className={styles.footerLink}>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 