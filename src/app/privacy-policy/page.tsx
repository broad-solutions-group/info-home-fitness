import styles from './page.module.css';

export default function PrivacyPolicy() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>隐私政策</h1>
          
          <div className={styles.section}>
            <h2>1. 信息收集</h2>
            <p>
              我们可能收集以下类型的信息：
            </p>
            <ul>
              <li>您主动提供的信息（如订阅邮箱地址）</li>
              <li>自动收集的技术信息（如IP地址、浏览器类型）</li>
              <li>网站使用情况和偏好</li>
              <li>Cookie和类似技术收集的信息</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>2. 信息使用</h2>
            <p>
              我们使用收集的信息用于：
            </p>
            <ul>
              <li>提供和改进我们的服务</li>
              <li>发送您订阅的通讯和更新</li>
              <li>分析网站使用情况</li>
              <li>防止欺诈和滥用</li>
              <li>遵守法律要求</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>3. 信息分享</h2>
            <p>
              我们不会出售、交易或租赁您的个人信息给第三方。我们可能在以下情况下分享信息：
            </p>
            <ul>
              <li>获得您的明确同意</li>
              <li>与服务提供商合作（如邮件服务提供商）</li>
              <li>遵守法律要求或法院命令</li>
              <li>保护我们的权利和安全</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>4. Cookie使用</h2>
            <p>
              我们使用Cookie来改善您的浏览体验。Cookie帮助我们：
            </p>
            <ul>
              <li>记住您的偏好设置</li>
              <li>分析网站流量</li>
              <li>提供个性化内容</li>
              <li>改进网站功能</li>
            </ul>
            <p>
              您可以通过浏览器设置控制Cookie的使用。
            </p>
          </div>

          <div className={styles.section}>
            <h2>5. 数据安全</h2>
            <p>
              我们采取适当的技术和组织措施来保护您的个人信息，包括：
            </p>
            <ul>
              <li>加密传输和存储</li>
              <li>访问控制和身份验证</li>
              <li>定期安全审计</li>
              <li>员工隐私培训</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>6. 您的权利</h2>
            <p>
              您有权：
            </p>
            <ul>
              <li>访问您的个人信息</li>
              <li>更正不准确的信息</li>
              <li>删除您的个人信息</li>
              <li>限制信息处理</li>
              <li>数据可携带性</li>
              <li>随时取消订阅</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>7. 第三方链接</h2>
            <p>
              我们的网站可能包含指向第三方网站的链接。我们不对这些网站的隐私做法负责。
              我们建议您查看这些网站的隐私政策。
            </p>
          </div>

          <div className={styles.section}>
            <h2>8. 政策更新</h2>
            <p>
              我们可能会定期更新此隐私政策。重大变更将通过网站通知或邮件通知您。
              继续使用我们的服务即表示您接受更新后的政策。
            </p>
          </div>

          <div className={styles.section}>
            <h2>9. 联系我们</h2>
            <p>
              如果您对此隐私政策有任何疑问或关切，请联系我们：
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