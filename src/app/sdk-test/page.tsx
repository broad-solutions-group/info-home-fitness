import SDKExample from '../components/SDKExample/SDKExample';

export default function SDKTestPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>SDK集成测试页面</h1>
      <p>这个页面用于测试SDK是否正确集成到应用中。</p>
      
      <div style={{ marginTop: '20px' }}>
        <SDKExample />
      </div>
      
      <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h3>测试说明</h3>
        <ul>
          <li>打开浏览器开发者工具（F12）</li>
          <li>查看Console标签页</li>
          <li>应该能看到SDK加载相关的日志信息</li>
          <li>在开发环境下，页面右下角会显示SDK状态指示器</li>
          <li>点击上方的按钮测试事件追踪功能</li>
        </ul>
      </div>
    </div>
  );
} 