import styles from './page.module.css';

export default function TermsOfService() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>服务条款</h1>
          
          <div className={styles.section}>
            <h2>1. 服务条款的接受</h2>
            <p>
              欢迎使用Home Fitness网站。通过访问和使用本网站，您同意遵守并受以下服务条款的约束。
              如果您不同意这些条款，请不要使用本网站。
            </p>
          </div>

          <div className={styles.section}>
            <h2>2. 网站使用</h2>
            <p>
              本网站提供家庭健身相关的信息、建议和指导。您可以：
            </p>
            <ul>
              <li>浏览和阅读网站内容</li>
              <li>分享文章和内容</li>
              <li>订阅我们的通讯</li>
              <li>按照指导进行健身活动</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>3. 内容使用限制</h2>
            <p>
              网站上的所有内容，包括文本、图片、视频等，均受版权保护。您不得：
            </p>
            <ul>
              <li>未经授权复制或分发网站内容</li>
              <li>将内容用于商业目的</li>
              <li>修改或创建衍生作品</li>
              <li>移除版权声明</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>4. 健康免责声明</h2>
            <p>
              本网站提供的健身建议仅供参考，不能替代专业医疗建议。在开始任何健身计划之前，
              请咨询您的医生或合格的健身专家。我们不对因使用本网站信息而导致的任何伤害或损失承担责任。
            </p>
          </div>

          <div className={styles.section}>
            <h2>5. 隐私保护</h2>
            <p>
              我们重视您的隐私。有关我们如何收集、使用和保护您的个人信息，
              请参阅我们的<a href="/privacy-policy">隐私政策</a>。
            </p>
          </div>

          <div className={styles.section}>
            <h2>6. 服务条款的修改</h2>
            <p>
              我们保留随时修改这些服务条款的权利。修改后的条款将在网站上发布，
              继续使用网站即表示您接受修改后的条款。
            </p>
          </div>

          <div className={styles.section}>
            <h2>7. 联系信息</h2>
            <p>
              如果您对这些服务条款有任何疑问，请联系我们：
            </p>
            <address className={styles.address}>
              Address: 3911 Concord Pike #8030, SMB#27548, Wilmington, DE 19803, USA
            </address>
          </div>

          <div className={styles.lastUpdated}>
            最后更新：2024年1月
          </div>
        </div>
      </div>
    </div>
  );
} 