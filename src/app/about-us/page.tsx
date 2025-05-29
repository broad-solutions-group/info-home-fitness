import styles from './page.module.css';

export default function AboutUs() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>关于我们</h1>
          <div className={styles.section}>
            <h2>我们的使命</h2>
            <p>
              Home Fitness致力于帮助每个人在家中建立完美的健身环境。我们相信健身不应该受到预算、空间或时间的限制。
              通过提供实用的建议、经济实惠的解决方案和专业的指导，我们帮助您实现健康的生活方式。
            </p>
          </div>
          
          <div className={styles.section}>
            <h2>我们的愿景</h2>
            <p>
              我们希望成为全球领先的家庭健身指导平台，让每个家庭都能拥有属于自己的健身空间，
              让健康生活变得简单、有趣且可持续。
            </p>
          </div>

          <div className={styles.section}>
            <h2>我们的价值观</h2>
            <ul>
              <li><strong>可及性：</strong>健身应该对每个人都是可及的，无论预算或空间如何</li>
              <li><strong>实用性：</strong>提供真正有用、可操作的建议和解决方案</li>
              <li><strong>包容性：</strong>欢迎所有年龄段和健身水平的人群</li>
              <li><strong>可持续性：</strong>帮助建立长期的健康习惯</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>联系我们</h2>
            <p>
              如果您有任何问题、建议或合作意向，请随时与我们联系：
            </p>
            <address className={styles.address}>
              Address: 3911 Concord Pike #8030, SMB#27548, Wilmington, DE 19803, USA
            </address>
          </div>
        </div>
      </div>
    </div>
  );
} 